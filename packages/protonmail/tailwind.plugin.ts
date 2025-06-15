// node
import path from 'node:path';
import fs from 'node:fs/promises';
// 3rd party
import type { Plugin, ResolvedConfig } from 'vite'
import { Scanner } from '@tailwindcss/oxide'

import {
    compile,
    env,
    Features,
    Instrumentation,
    normalizePath,
    optimize,
    toSourceMap,
} from '@tailwindcss/node'

import { clearRequireCache } from '@tailwindcss/node/require-cache'

// init
const DEBUG = env.DEBUG
const SPECIAL_QUERY_RE = /[?&](?:worker|sharedworker|raw|url)\b/
const COMMON_JS_PROXY_RE = /\?commonjs-proxy/
const INLINE_STYLE_ID_RE = /[?&]index\=\d+\.css$/

function getExtension(id: string) {
    const [filename] = id.split('?', 2)
    return path.extname(filename).slice(1)
}

function isPotentialCssRootFile(id: string) {
    if (id.includes('/.vite/')) return
    const extension = getExtension(id)
    const isCssFile =
      (extension === 'css' || id.includes('&lang.css') || id.match(INLINE_STYLE_ID_RE)) &&
      // Don't intercept special static asset resources
      !SPECIAL_QUERY_RE.test(id) &&
      !COMMON_JS_PROXY_RE.test(id)
    return isCssFile
}

function idToPath(id: string) {
    return path.resolve(id.replace(/\?.*$/, ''))
 }

/**
 * A Map that can generate default values for keys that don't exist.
 * Generated default values are added to the map to avoid recomputation.
 */
class DefaultMap<K, V> extends Map<K, V> {
    constructor(private factory: (key: K, self: DefaultMap<K, V>) => V) {
      super()
    }
  
    get(key: K): V {
      let value = super.get(key)
  
      if (value === undefined) {
        value = this.factory(key, this)
        this.set(key, value)
      }
  
      return value
    }
}


class Root {
    // The lazily-initialized Tailwind compiler components. These are persisted
    // throughout rebuilds but will be re-initialized if the rebuild strategy is
    // set to `full`.
    private compiler?: Awaited<ReturnType<typeof compile>>
  
    // The lazily-initialized Tailwind scanner.
    private scanner?: Scanner
  
    // List of all candidates that were being returned by the root scanner during
    // the lifetime of the root.
    private candidates: Set<string> = new Set<string>()
  
    // List of all build dependencies (e.g. imported  stylesheets or plugins) and
    // their last modification timestamp. If no mtime can be found, we need to
    // assume the file has always changed.
    private buildDependencies = new Map<string, number | null>()
  
    constructor(
      private id: string,
      private base: string,
  
      private enableSourceMaps: boolean,
      private customCssResolver: (id: string, base: string) => Promise<string | false | undefined>,
      private customJsResolver: (id: string, base: string) => Promise<string | false | undefined>,
    ) {}
  
    // Generate the CSS for the root file. This can return false if the file is
    // not considered a Tailwind root. When this happened, the root can be GCed.
    public async generate(
      content: string,
      _addWatchFile: (file: string) => void,
      I: Instrumentation,
    ): Promise<
      | {
          code: string
          map: string | undefined
        }
      | false
    > {
      const inputPath = idToPath(this.id)
  
      function addWatchFile(file: string) {
        // Don't watch the input file since it's already a dependency anc causes
        // issues with some setups (e.g. Qwik).
        if (file === inputPath) {
          return
        }
  
        // Scanning `.svg` file containing a `#` or `?` in the path will
        // crash Vite. We work around this for now by ignoring updates to them.
        //
        // https://github.com/tailwindlabs/tailwindcss/issues/16877
        if (/[#?].*\.svg$/.test(file)) {
          return
        }
        _addWatchFile(file)
      }
  
      const requiresBuildPromise = this.requiresBuild()
      const inputBase = path.dirname(path.resolve(inputPath))
  
      if (!this.compiler || !this.scanner || (await requiresBuildPromise)) {
        clearRequireCache(Array.from(this.buildDependencies.keys()))
        this.buildDependencies.clear()
  
        this.addBuildDependency(idToPath(inputPath))
        if (DEBUG) {
          I.start('Setup compiler');
        }

        const addBuildDependenciesPromises: Promise<void>[] = []
        this.compiler = await compile(content, {
          from: this.enableSourceMaps ? this.id : undefined,
          base: inputBase,
          shouldRewriteUrls: true,
          onDependency: (path) => {
            addWatchFile(path)
            addBuildDependenciesPromises.push(this.addBuildDependency(path))
          },
  
          customCssResolver: this.customCssResolver,
          customJsResolver: this.customJsResolver,
        });
        await Promise.all(addBuildDependenciesPromises)
        if (DEBUG) {
           I.end('Setup compiler')
        }
  
        if (DEBUG) {
          I.start('Setup scanner')
        }
  
        const sources = (() => {
          // Disable auto source detection
          if (this.compiler.root === 'none') {
            return []
          }
  
          // No root specified, auto-detect based on the `**/*` pattern
          if (this.compiler.root === null) {
            return [{ base: this.base, pattern: '**/*', negated: false }]
          }
  
          // Use the specified root
          return [{ ...this.compiler.root, negated: false }]
        })().concat(this.compiler.sources)
  
        this.scanner = new Scanner({ sources });
        if (DEBUG) {
          I.end('Setup scanner');
        }
      } else {
        for (const buildDependency of this.buildDependencies.keys()) {
          addWatchFile(buildDependency)
        }
      }
  
      if (
        !(
          this.compiler.features &
          (Features.AtApply | Features.JsPluginCompat | Features.ThemeFunction | Features.Utilities)
        )
      ) {
        return false
      }
  
      if (this.compiler.features & Features.Utilities) {
        // This should not be here, but right now the Vite plugin is setup where we
        // setup a new scanner and compiler every time we request the CSS file
        // (regardless whether it actually changed or not).
        if (DEBUG) {
            I.start('Scan for candidates');
        }
        for (const candidate of this.scanner.scan()) {
          this.candidates.add(candidate)
        }
        if (DEBUG) {
          I.end('Scan for candidates');
        }
      }
  
      if (this.compiler.features & Features.Utilities) {
        // Watch individual files found via custom `@source` paths
        for (const file of this.scanner.files) {
          addWatchFile(file)
        }
  
        // Watch globs found via custom `@source` paths
        for (const glob of this.scanner.globs) {
          if (glob.pattern[0] === '!') continue
  
          let relative = path.relative(this.base, glob.base)
          if (relative[0] !== '.') {
            relative = './' + relative
          }
          // Ensure relative is a posix style path since we will merge it with the
          // glob.
          relative = normalizePath(relative)
  
          addWatchFile(path.posix.join(relative, glob.pattern))
  
          const root = this.compiler.root
  
          if (root !== 'none' && root !== null) {
            const basePath = normalizePath(path.resolve(root.base, root.pattern))
  
            const isDir = await fs.stat(basePath).then(
              (stats) => stats.isDirectory(),
              () => false,
            )
  
            if (!isDir) {
              throw new Error(
                `The path given to \`source(…)\` must be a directory but got \`source(${basePath})\` instead.`,
              )
            }
          }
        }
      }
  
      if (DEBUG) {
         I.start('Build CSS');
      }
      const code = this.compiler.build([...this.candidates])
      if (DEBUG) {
        I.end('Build CSS');
      }
  
      if (DEBUG) {
        I.start('Build Source Map');
      }
      const map = this.enableSourceMaps ? toSourceMap(this.compiler.buildSourceMap()).raw : undefined
      if (DEBUG) {
         I.end('Build Source Map');
      }
  
      return {
        code,
        map,
      }
    }
  
    private async addBuildDependency(path: string) {
      let mtime: number | null = null
      try {
        mtime = (await fs.stat(path)).mtimeMs
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch(e) { /* */ }
      this.buildDependencies.set(path, mtime)
    }
  
    private async requiresBuild(): Promise<boolean> {
      for (const [path, mtime] of this.buildDependencies) {
        if (mtime === null) return true
        try {
          const stat = await fs.stat(path)
          if (stat.mtimeMs > mtime) {
            return true
          }
        } catch {
          return true
        }
      }
      return false
    }
  }

export default function createPlugins() {

    // const servers: ViteDevServer[] = [];
    let config: ResolvedConfig | null = null;

    let isSSR = false;
    let minify = false;

    const roots: DefaultMap<string, Root> = new DefaultMap((id) => {
        const cssResolver = config!.createResolver({
          ...config!.resolve,
          extensions: ['.css'],
          mainFields: ['style'],
          conditions: ['style', 'development|production'],
          tryIndex: false,
          preferRelative: true,
        })
        function customCssResolver(id: string, base: string) {
          return cssResolver(id, base, true, isSSR)
        }
    
        const jsResolver = config!.createResolver(config!.resolve)
        function customJsResolver(id: string, base: string) {
          return jsResolver(id, base, true, isSSR)
        }
        return new Root(
          id,
          config!.root,
          // Currently, Vite only supports CSS source maps in development and they
          // are off by default. Check to see if we need them or not.
          config?.css.devSourcemap ?? false,
          customCssResolver,
          customJsResolver,
        )
      });

    const step1 = {
        // Step 1: Scan source files for candidates
        name: '@tailwindcss/vite:scan',
        enforce: 'pre',

        /*
        configureServer: {
            order: 'post',
            handler(server) {
                servers.push(server)
                console.log('number of servers', servers.length);
            }
        },
        */

        async configResolved(_config) {
            config = _config
            minify = config.build.cssMinify !== false
            isSSR = config.build.ssr !== false && config.build.ssr !== undefined
        },
    } satisfies Plugin;

    const step2 = {
        // Step 2 (serve mode): Generate CSS
        name: '@tailwindcss/vite:generate:serve',
        apply: 'serve',
        enforce: 'pre',
  
        async transform(src, id) {
            if (!isPotentialCssRootFile(id)) return
    
            using I = new Instrumentation();
            if (DEBUG) {
                I.start('[@tailwindcss/vite] Generate CSS (serve)'); 
            }
  
            const root = roots.get(id)
  
          const result = await root.generate(src, (file) => this.addWatchFile(file), I)
          if (!result) {
            roots.delete(id)
            return src
          }
          if (DEBUG) {
            I.end('[@tailwindcss/vite] Generate CSS (serve)');
          }
          return result
        },
  } satisfies Plugin;

  const step3 = {
    // Step 2 (full build): Generate CSS
    name: '@tailwindcss/vite:generate:build',
    apply: 'build',
    enforce: 'pre',

    async transform(src, id) {
      if (!isPotentialCssRootFile(id)) return

      using I = new Instrumentation();
      if (DEBUG) {
        I.start('[@tailwindcss/vite] Generate CSS (build)');
      }

      const root = roots.get(id)

      let result = await root.generate(src, (file) => this.addWatchFile(file), I)
      if (!result) {
        roots.delete(id)
        return src
      }
      if (DEBUG) {
        I.end('[@tailwindcss/vite] Generate CSS (build)');
      }

      if (DEBUG) {
        I.start('[@tailwindcss/vite] Optimize CSS');
      }
      result = optimize(result.code, {
        minify,
        map: result.map,
      });
      if (DEBUG) {
        I.end('[@tailwindcss/vite] Optimize CSS');
      }
      return result;
    }
  } satisfies Plugin;

  return [step1, step2, step3] satisfies Plugin[];
}
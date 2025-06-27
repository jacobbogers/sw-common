import { readFile, writeFile } from 'fs/promises';
import { glob } from 'glob';
import { resolve } from 'node:path';

// 1. Load the theme file and extract defined vars
const themePath = resolve('src/theme.css');
const themeCss = await readFile(themePath, 'utf-8'); // replace with your actual file
const definedVars = [...themeCss.matchAll(/--([\w-]+)\s*:/g)].map(m => m[1]);

// 2. Glob source files
const files = await glob('src/**/*.{svelte,css,html,js,ts}');

// 3. Read and combine contents
const contents = await Promise.all(files.map(file => readFile(file, 'utf-8')));
const allContent = contents.join('\n');

// 4. Detect used vars
const usedVars = new Set();
for (const v of definedVars) {
  const regex = new RegExp(`var\\(--${v}\\b`, 'g');
  if (regex.test(allContent)) usedVars.add(v);
}



// 5. Identify unused
const unusedVars = definedVars.filter(v => !usedVars.has(v));
console.log(`Unused variables (${unusedVars.length}):\n`, unusedVars.map(v => `--${v}`).join('\n'));

// 6. Remove unused from CSS
const cleanedCss = themeCss
  .split('\n')
  .filter(line => !unusedVars.some(v => line.includes(`--${v}:`)))
  .join('\n');

// 7. Save cleaned CSS file
await writeFile(themePath, cleanedCss, 'utf-8');
console.log(`\n✅ Cleaned ${unusedVars.length} unused variables from ${themePath}`);
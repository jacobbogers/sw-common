'user strict';

const fs = require('fs');
const { lexPath, 'resolve': fpResolve, $tokens } = require('@mangos/filepath');

const isAbsolute = (fsNodes) => fsNodes.path[0].token in $tokens.rootValues;

const defer = Promise.prototype.then.bind(Promise.resolve());

// create directory, could fail for whatever reason
function createFile (fileName, done) {
	const options = {
		'flags': 'ax', // will fail of the file exist, (this is to prevent race condition)
		'emitClose': true,
	};
	/*
	 * Example of failures:
	 *    //1   throws no exception as far as i can see, tried writing to restricted direcotry etc
	 *    //2   examples [Error: EACCES: permission denied, open '/root/somefile']
	 *    //3   [Error: ENOENT: no such file or directory, open '/home/jacobx/somefile']
	 */
	const writeable = fs.createWriteStream(fileName, options);
	const issues = [];
	// closeFn , openFn both functions need each other
	let closeFn;
	let openFn;
	function errFn (err) {
		issues.push({
			't': 'e',
			'd': err,
		});
	}
	// eslint-disable-next-line prefer-const
	openFn = function () {
		this.removeEventListener('error', errFn);
		this.removeEventListener('close', closeFn);
	};
	closeFn = function () {
		this.removeEventListener('error', errFn);
		this.removeEventListener('open', openFn);
		done(issues);
	};

	writeable.once('error', errFn);
	writeable.once('close', closeFn);
	writeable.once('open', openFn);
	writeable.once('ready', done(undefined, writeable));
}


/*
 * precondition "path" is absolute!
 * add this to filepath module, in mangos
 */
function private_mkdirp (dirs, done, cursor = 0) {
	if (!isAbsolute(dirs)) {
		done(new Error(`error, path is not absolute ${dirs}`));
		return;
	}
	const realPath = dirs.path.slice(0, cursor + 1).map(({ value }) => value).join('');
	// create the dir
	console.log(realPath, cursor);
	fs.mkdir(realPath, (err) => {
		if (err) {
			if (err.code !== 'EEXIST') {
				const errMsg = `error mkdir ${realPath} ${String(err)}`;
				done(errMsg);
				return;
			}
		}
		while (dirs.path[cursor + 1] && dirs.path[cursor + 1].token === $tokens.other.SEP) {
			cursor++;
		}
		if (cursor === dirs.path.length - 1) {
			done();
			return;
		}
		private_mkdirp(dirs, done, cursor + 1);
	});
}

function mkdirp (pathString) {
	pathString = (typeof pathString === 'string') ? lexPath(pathString) : pathString;
	if (pathString.firstError) {
		const te = new TypeError(`parsing the path gave errors, check "fe" property on this Error object`);
		return Promise.resolve([te.fe = pathString.firstError]);
	}
	return new Promise((resolve) => {
		private_mkdirp(pathString, (err) => {
			if (err) {
				resolve([err]);
				return;
			}
			resolve([]);
		});
	});
}


const pattern = '{{prefix}}-{{tzone}}-{{date}}-{{time}}-{{domain}}-{{seq}}.csv';

/*
 * done: 1. am I a directory, else create dir (recursive)
 *      date should be  yyyy_mm_dd_hh
 *      time should be  hh24:mi:ss
 *      tzone is +## or -##,   # = numerical digit
 * 1a, check if you have access to the dir, maybe it exist (in mkdirp) but later rights have been revoked or something
 * 2. scan this directory for files with pattern data-[date]-[domain]-00000.csv
 * 3. pick the last one, and add one to it, for new file,
 * 4. fails file creation (race condition, retry next + 1)
 */

function isWritableReadable (dir) {
	return new Promise((resolve) => {
		fs.access(dir, fs.constants.W_OK + fs.constants.R_OK, (err) => {
			if (err) {
				resolve([err]);
				return;
			}
			resolve([]);
		});
	});
}

 
async function reserveNewFile (dir) { //basedir should have already existed
	const [err] = await isWritableReadable(dir);
	if (err) {
	  const [err2] = await mkdirp(dir);
	  if (err2) { // couldnt do much
		
	  }
	}
	else { // check if it is an actual directory
	  const stat = await lstat(dir);
	  if (!stat.isDirectory()) {
		 // couldnt nothing to do
	  }
	}
	/*
	 *
	 * now we can reserve a fileName in this dir
	 */
}

/*
 *call this multiple times,  race conditions are solved by the underlying filesystem
 *since file creation is atomic
 */
/*
 *function pickNewFile(base, options = { nrLogBuffers: 2, logBufferSize: 8192, domain }) {
 *    //fullpath, taken into account workdir
 *    const fullPath = path.resolve(fileName);
 *
 *    let statsObj;
 *    try {
 *        statsObj = await fs.lstat(fullPath);
 *    } catch (err) {
 *        if (err.code === 'ENOENT') {
 *            creatconsole.log(JSON.stringify(err.code));
 *        }
 *    }
 *
 *    const basedir = path.dirname(fullPath);
 *    const ext = path.extname(fullPath);
 *    // read all files in the directory
 *    const entries = fs.readdirSync(basedir, { encoding: 'utf8', withFileTypes: true });
 *};
 *
 *
 *init('./x')
 */

const testPath = process.env.testpath;
console.log(testPath);
const parsed = fpResolve(testPath);
console.log(parsed.path);
if (parsed.firstError) {
	console.log(parsed.firstError);
}

mkdirp(parsed, (err) => {
	if (err) {
		console.log(err);
	}
	// find
});

'use strict';

const chaiAsPromised = require('chai-as-promised');
const chai = require('chai');
const mock = require('mock-fs');

const fs = require('fs');

const mkdirp = require('utils/db/mkdirp');
const getInodes = require('utils/db/getInodes');
const serializeRequest = require('utils/serialize/request');
const request = require('utils/deserialize/request');
const createThrottle = require('utils/throttleAsync');

const omit = require('utils/omit');

chai.should();
chai.use(chaiAsPromised);
const { expect } = chai;

const defer = fn => Promise.prototype.then.call(Promise.resolve(), fn);



describe('utils', () => {
    describe('db', () => {
        describe('mkdirp', () => {
            before(() => {
                mock({
                    '/path/to/fake/dir': {
                        'some-file.txt': 'file content here',
                        'empty-dir': {/** empty directory */ },
                    },
                    'path/to/some.png': Buffer.from([8, 6, 7, 5, 3, 0, 9]),
                    'some/other/path': {/** another empty directory */ },
                });
            });
            it('path to existing regular file should be an error', async () => {
                const [, err] = await mkdirp('/path/to/fake/dir/some-file.txt', 'posix');// make it undependent of filesystem type
                expect(err).to.equal('/path/to/fake/dir/some-file.txt is not a directory');
            });
            it('path to existing dir should be ok', async () => {
                const [, err] = await mkdirp('/path/to/fake/dir', 'posix');// make it undependent of filesystem type
                expect(err).to.be.undefined;
            });
            it('create nonexistant paths', async () => {
                const [, err] = await mkdirp('some/other/path/dir1/dir2', 'posix');// make it undependent of filesystem type
                expect(err).to.be.undefined;
                const stat = fs.lstatSync('some/other/path/dir1/dir2');
                expect(stat.isDirectory()).to.be.true;
            });
            after(() => {
                mock.restore();
            });
        });
        describe('getInodes', () => {

            function cfile(content = '') {
                return mock.file({
                    content,
                    atime: 0,
                    ctime: 0,
                    mtime: 0,
                    birthtime: 0,
                    mode: 0o000
                });
            }

            function cdir(items = {}) {
                return mock.directory({
                    atime: 0,
                    ctime: 0,
                    mtime: 0,
                    birthtime: 0,
                    mode: 0o100,
                    items
                });
            }

            const { device } = require('./fixtures');

            before(() => {
                mock({
                    '/.cache': cdir({
                        'favicon.request': cfile(''),
                        'favicon.png.fetching': cfile(new Buffer(23)),
                        'assets': cdir(),
                        'Open Sans': cdir({
                            'all.css.request': cfile()
                        }),
                        'somefile.request': cfile(),
                    }),
                    'path/to/some.png': cfile(Buffer.from([8, 6, 7, 5, 3, 0, 9])),
                    'some/other/path': cdir(),
                });
            });
            it('get all entries', async () => {
                const results = await getInodes('/.cache');// make it undependent of filesystem type
                const actualDevice = results.parent;
                expect(actualDevice).to.deep.equal(device);
            });
            after(() => {
                mock.restore();
            });
        });
    });
    describe('serialize', () => {
        it('request with no \\n or \\r in request headers', () => {
            const result = serializeRequest({
                url: 'https://fonts.googleapis.com/css?family=Roboto&display=swap',
                method: 'get',
                headers: {
                    Accept: '*/*'
                }
            });
            expect(result).to.equal('[request-url]\nurl=https://fonts.googleapis.com/css?family=Roboto&display=swap\n[request-method]\nmethod=get\n[request-headers]\nAccept=*/*');
        })
        it('request with \\n or \\r \\t in request headers', () => {
            const result = serializeRequest({
                url: 'https://fonts.googleapis.com/css?family=Roboto&display=swap',
                method: 'get',
                headers: {
                    Accept: '*/*',
                    ['X-sec-02']: '\t\nsomevalue\nsomeothervalue\r'
                }
            });
            expect(result).to.equal('[request-url]\nurl=https://fonts.googleapis.com/css?family=Roboto&display=swap\n[request-method]\nmethod=get\n[request-headers]\nAccept=*/*\nX-sec-02=\\t\\nsomevalue\\nsomeothervalue\\r');
        })
    });
    describe('deserialize', () => {
        it('request <- correct string with control chars', () => {
            const data =
                "[request-url]\n\r\t" +
                "url=https://fonts.googleapis.com/css?family=Roboto&display=swap\n" +
                "[request-method]\n" +
                "method=get\n\r" +
                "[request-headers]\r\n" +
                "Accept=*/*\n\r" +
                "X-sec-02=\\t\\nsomevalue\\nsomeothervalue\\r";
            const [o, errors] = request(data);
            expect(errors).to.be.undefined;
            expect(o).to.deep.equal({
                'request-url':
                    { url: 'https://fonts.googleapis.com/css?family=Roboto&display=swap' },
                'request-method': { method: 'get' },
                'request-headers':
                {
                    Accept: '*/*',
                    'X-sec-02': '\\t\\nsomevalue\\nsomeothervalue\\r'
                }
            })
        });
        it('request <- data with no section', () => {
            const data =
                "url=https://fonts.googleapis.com/css?family=Roboto&display=swap\n" +
                "[request-method]\n" +
                "method=get\n\r";
            const [o, errors] = request(data);
            expect(o).to.deep.equal({ 'request-method': { method: 'get' } });
            expect(errors).to.equal('error on line 0, its not part of a section');
        });
        it('request <- no data (empty lines and comments)', () => {
            const data =
                "#some comment" +
                "  #some more comments\n" +
                "\n\r";
            const [o, errors] = request(data);
            expect(o).to.deep.equal({});
            expect(errors).to.be.undefined;
        });
        it('request <- no data (empty lines and comments)', () => {
            const data =
                "#some comment" +
                "  #some more comments\n" +
                "\n\r";
            const [o, errors] = request(data);
            expect(o).to.deep.equal({});
            expect(errors).to.be.undefined;
        });
        it('request <- section without ending "]", some key value pairs are faulty', () => {
            const data =
                "#some comment\r\n" +
                "[  \tsomesection\n" +
                "no-key-value-pair";
            const [o, errors] = request(data);
            expect(o).to.deep.equal({ somesection: {} });
            expect(errors).to.equal('error on line 2 no "=" seperator');
        });
    });
    describe('throttleAsync', async () => {
        it('process task 2 in parrallel', async () => {
            const data = Array.from({ length: 10 }).map((v, i) => i); // some random data
            const process = createThrottle(2, data[Symbol.iterator]());
            const promises = [];
            let j = 0;
            for (let i = 1; i <= 15; i++) {
                promises.push(process(async (a) => {
                    defer(() => j++);
                    return j;
                }));
            }
            const result = await Promise.all(promises);
            expect(result).to.deep.equal([
                [0, undefined], // grouping id 0
                [0, undefined], //
                [2, undefined], // grouping id 2
                [2, undefined],
                [4, undefined], // grouping id 4
                [4, undefined],
                [6, undefined],
                [6, undefined],
                [8, undefined],
                [8, undefined],
                [],
                [],
                [],
                [],
                []]);
        });
        it('process all in parrallel', async () => {
            const data = Array.from({ length: 10 }).map((v, i) => i); // some random data
            const process = createThrottle(Infinity, data[Symbol.iterator]());
            const promises = [];
            let j = 0;
            for (let i = 1; i <= 15; i++) {
                promises.push(process(async (a) => {
                    defer(() => j++);
                    return j;
                }));
            }
            const result = await Promise.all(promises);
            expect(result).to.deep.equal([[0, undefined],
            [0, undefined],
            [0, undefined],
            [0, undefined],
            [0, undefined],
            [0, undefined],
            [0, undefined],
            [0, undefined],
            [0, undefined],
            [0, undefined],
            [],
            [],
            [],
            [],
            []]);
        });
    });
});

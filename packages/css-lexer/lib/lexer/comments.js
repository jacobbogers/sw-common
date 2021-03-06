// 4.3.2. Consume comments
// https://drafts.csswg.org/css-syntax-3/#consume-comment
'use strict'
const { COMMENT } = require('./tokens')
module.exports = function (_1, _2, iterator) {
    // first is / , second = "*"
    // { d: value, col, row, o: cursor };
    const step = iterator.peek();
    // consume next
    iterator.next();
    // absorp untill you find  */
    const start = { loc: { col: _1.col, row: _1.row }, o: _1.o };
    let end;
    if (step.done) {
        end = { loc: { col: _2.col, row: _2.row }, o: _2.o };
        return { id: COMMENT, s: start, e: end };
    }
    let s = 0;
    _1 = undefined;
    _2 = undefined;
    while (!step.done) {
        if (s == 0) {
            _1 = step.value;
            _2 = undefined
        }
        else {
            _2 = step.value;
            if (_1.d === '*' && _2.d === '/') {
                end = { loc: { col: _2.col, row: _2.row }, o: _2.o };
                break;
            }
        }
        s = (s + 1) % 2
        iterator.next();
    }
    if (!end && _2) {
        end = { loc: { col: _2.col, row: _2.row }, o: _2.o };
    }
    if (!end && _1) {
        end = { loc: { col: _1.col, row: _1.row }, o: _1.o };
    }

    return { id: COMMENT, s: start, e: end };
};

'use strict'
const { WS } = require('./tokens')
const { isWS } = require('./checks-and-definitions')
module.exports = function absorbWS(iterator, max = Infinity) {
    const step = iterator.peek();
    let prev = step.value;
    iterator.next();
    const start = { loc: { col: prev.col, row: prev.row }, o: prev.o }
    let end;
    let i = 0;
    while (!step.done && i < max-1) {
        const _1 = step.value;
        if (!isWS(_1.d)){
            end = { loc: { col: prev.col, row: prev.row }, o: prev.o };
            break;
        }
        i++;
        prev = _1;
        iterator.next();
    }
    if (!end) { // we hit the end of the stream
        end = { loc: { col: prev.col, row: prev.row }, o: prev.o };
    }
    return { id: WS, s: start, e:end };
};

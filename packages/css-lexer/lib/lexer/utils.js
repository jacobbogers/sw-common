
'use strict';
const {
    isWS
 } = require('./checks-and-definitions');

// skip over white space
function findWhiteSpaceEnd(src, start = 0, end = src.length - 1) {
    let i = start;
    do {
        if (!isWS(src[i])) {
            i--;
            break;
        };
        i++;
    } while (i <= end)
    if (i < start) {
        return start;
    }
    if (i > end) {
        return end;
    }
    return i;
}

module.exports = {
    findWhiteSpaceEnd
};

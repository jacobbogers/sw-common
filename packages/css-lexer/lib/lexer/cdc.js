// https://drafts.csswg.org/css-syntax-3/#typedef-cdc-token
'use strict'
const { CDC } = require('./tokens');

module.exports = function composeCDCToken(_1, _2, _3) {
    if (_1 && _1.d === '-') {
        if (_2 && _2.d === '-') {
            if (_3 && _3.d === '>') {
                return {
                    id: CDC, 
                    d: '-->', 
                    s: { o:_1, loc:{ col:_1.col, row: _1.row}},
                    e: { o:_3, loc:{ col:_3.col, row: _3.row}}
                }
            }
        }
    }
    return
}
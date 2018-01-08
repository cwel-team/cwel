// This is the node module 'is-whitespace' - https://www.npmjs.com/package/is-whitespace
// Reference this file when 'is-whitespace' is required to reduce our reliance on
// small npm-hosted utility libraries

/*!
 * is-whitespace <https://github.com/jonschlinkert/is-whitespace>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

let cache = '';

function regex() {
    // Ensure that runtime compilation only happens once
    return cache || (cache = new RegExp('^[\\s\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF"]+$')); // eslint-disable-line no-control-regex, no-return-assign
}

module.exports = function isWhitespace(str) {
    return (typeof str === 'string') && regex().test(str);
};

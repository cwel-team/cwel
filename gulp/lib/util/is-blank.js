// This is the node module 'is-blank' - https://www.npmjs.com/package/is-blank
// Reference this file when 'is-blank' is required to reduce our reliance on
// small npm-hosted utility libraries

const isEmpty = require('./is-empty');
const isWhitespace = require('./is-whitespace');

module.exports = function isBlank(object) {
    if (typeof object === 'boolean') {
        return false;
    }

    if (typeof object === 'string' && object.length) {
        return isWhitespace(object);
    }
    return isEmpty(object);
};

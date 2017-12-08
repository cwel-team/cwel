// This is the node module 'is-present' - https://www.npmjs.com/package/is-present
// Reference this file when 'is-present' is required to reduce our reliance on
// small npm-hosted utility libraries

const isBlank = require('./is-blank');

module.exports = function isPresent(object) {
    return !isBlank(object);
};

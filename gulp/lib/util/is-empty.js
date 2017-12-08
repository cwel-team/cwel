// This is the node module 'is-empty' - https://www.npmjs.com/package/is-empty
// Reference this file when 'is-empty' is required to reduce our reliance on
// small npm-hosted utility libraries

/**
 * Has.
 */

const has = Object.prototype.hasOwnProperty;


/**
 * Test whether a value is "empty".
 *
 * @param {Mixed} val
 * @return {Boolean}
 */

function isEmpty(val) {
    if (val == null) return true;
    if (typeof val === 'number') return val === 0;
    if (val.length !== undefined) return val.length === 0;
    for (const key in val) { // eslint-disable-line no-restricted-syntax
        if (has.call(val, key)) return false;
    }
    return true;
}

/**
 * Expose `isEmpty`.
 */

module.exports = isEmpty;

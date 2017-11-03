module.exports = function invokeOnCount(cb, n) {
    let count = 0;

    return (...args) => {
        count += 1;

        if (count >= n) {
            cb(...args);
        }
    };
};

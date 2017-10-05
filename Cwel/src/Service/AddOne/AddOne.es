angular.module('cwel').factory('addOne', () => {
    return {
        increment: (num) => {
            return num + 1;
        },
    };
});

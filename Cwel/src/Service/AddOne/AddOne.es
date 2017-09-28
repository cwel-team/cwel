angular.module('cwoApp').factory('addOne', () => {
    return {
        increment: (num) => {
            return num + 1;
        },
    };
});

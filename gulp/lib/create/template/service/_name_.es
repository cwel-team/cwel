angular.module('cwel').service('{{ name | camelize }}', () => {
    return {
        method: () => "I'm a string",
    };
});

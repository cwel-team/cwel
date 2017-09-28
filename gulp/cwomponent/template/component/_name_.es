/**
 * @name {{ name }}
 * @type component
 * @angulartype directive
 * @module cwoApp
 * @dependencies CwomponentFactory
*/
angular.module('cwoApp').directive('{{ name | camelize }}', (CwomponentFactory) => {
    return CwomponentFactory({
        restrict: 'A',
        scope: {
            // scope, scope, durr
        },
        link: (scope) => {
            // code, code, durr

            /**
             * Do stuff that can be accessed by angular's scope
             * @scope
             * @name stuff
             * @return {void}
             */
            scope.stuff = () => {};
        },
    });
});

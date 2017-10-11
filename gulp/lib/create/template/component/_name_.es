/**
 * @name {{ name | pascalize }}
 * @type component
 * @angulartype directive
 * @module cwel
 * @dependencies CwomponentFactory
*/
angular.module('cwel').directive('{{ name | camelize }}', (CwomponentFactory) => {
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

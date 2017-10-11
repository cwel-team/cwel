/**
 * @name {{ name }}
 * @type pattern
 * @angulartype directive
 * @module cwel
 * @dependencies CwomponentFactory
*/
angular.module('cwel')
.directive('{{ name | camelize }}', (CwomponentFactory) => {
    return CwomponentFactory({
        restrict: 'A',
        scope: {
            // scope data is declared here
            // e.g. 'currentIndex': '@'
        },
        link(scope) {
            scope.method = () => {
                // code, code, durr

                /**
                * Do stuff that can be accessed by angular's scope
                * @scope
                * @name stuff
                * @return {void}
                */
                scope.stuff = () => {};
            };
        },
    });
});

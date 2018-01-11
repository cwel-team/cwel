/**
 * @name Badge
 * @type component
 * @angulartype directive
 * @module cwoApp
 * @dependencies addOne, CwomponentFactory
*/
angular.module('cwel').directive('badge', (addOne, CwomponentFactory) => {
    return CwomponentFactory({
        restrict: 'A',
        scope: {
            start: '@',
        },
        link: (scope) => {
            /**
             * Keep count of button clicks
             * @scope
             * @name counter
             * @type int
             */
            scope.counter = parseInt(scope.start, 10);

            /**
             * Increment the scope.counter by one.
             * @scope
             * @name increment
             * @return {void}
             */
            scope.increment = () => {
                scope.counter = addOne.increment(scope.counter);
            };
        },
    });
});

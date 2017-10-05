/**
 * @name Badge
 * @type component
 * @angulartype directive
 * @module cwoApp
 * @dependencies addOne, CwomponentFactory
*/
/* global Howl */
angular.module('cwel').directive('badge', (addOne, CwomponentFactory) => {
    return CwomponentFactory({
        restrict: 'A',
        scope: {
            start: '@',
        },
        link: (scope) => {
            const howl = new Howl({
                src: ['/Assets/media/riflesound.mp3'],
            });

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
                howl.play();
                scope.counter = addOne.increment(scope.counter);
            };
        },
    });
});

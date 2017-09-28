'use strict';

/**
 * @name Badge
 * @type component
 * @angulartype directive
 * @module cwoApp
 * @dependencies addOne, CwomponentFactory
*/
/* global Howl */
angular.module('cwoApp').directive('badge', ['addOne', 'CwomponentFactory', function (addOne, CwomponentFactory) {
    return CwomponentFactory({
        restrict: 'A',
        scope: {
            start: '@'
        },
        link: function link(scope) {
            var howl = new Howl({
                src: ['/Assets/media/riflesound.mp3']
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
            scope.increment = function () {
                howl.play();
                scope.counter = addOne.increment(scope.counter);
            };
        }
    });
}]);
//# sourceMappingURL=Badge.js.map

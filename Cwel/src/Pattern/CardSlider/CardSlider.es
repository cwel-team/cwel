/**
* @name CardSlider
* @type pattern
* @angulartype directive
* @module cwoApp
* @dependencies CwoMI, CwomponentFactory
*/
/* global Hammer */
angular.module('cwel')
.directive('cwelCardSlider', (CwoMI, CwomponentFactory, Breakpoint) => {
    function deviceTranslateIndex(perSlide, index) {
        return (((index - (index % perSlide))
                + perSlide) / perSlide) - 1;
    }

    return CwomponentFactory({
        restrict: 'A',
        /**
         * @data
         * @attribute {int} startIndex Starting index for the card slider
         * @attribute {int} count Number of cards in the card slider
         */
        scope: {
            startIndex: '@',
            count: '@',
        },
        link(scope, el) {
            scope.previousSwipe = Date.now();
            scope.deltaTime = () => Date.now() - scope.previousSwipe;
            scope.count = parseInt(scope.count, 10);
            scope.cardsPerSlide = Breakpoint.currentDevice.name === 'm'
            || Breakpoint.currentDevice.name === 'l'
            || Breakpoint.currentDevice.name === 'xl'
                ? 3
                : 1;

            const hammertime = new Hammer(el[0]);

            hammertime.on('swipeleft', () => {
                scope.$apply(() => {
                    scope.next();
                });
            });

            hammertime.on('swiperight', () => {
                scope.$apply(() => {
                    scope.previous();
                });
            });

            scope.$watch('currentIndex', (newValue) => {
                if (newValue > scope.maxIndex()) {
                    scope.currentIndex = scope.maxIndex();
                }
                if (newValue < 0) {
                    scope.currentIndex = 0;
                }
            });

            Breakpoint.on(['xs', 's'], () => {
                scope.cardsPerSlide = 1;
                scope.responsiveAdjustIndex();
            })
            .on(['m', 'l', 'xl'], () => {
                scope.cardsPerSlide = 3;
                scope.responsiveAdjustIndex();
            });

            scope.responsiveAdjustIndex = () => {
                if (scope.currentIndex > scope.maxIndex()) {
                    scope.currentIndex = scope.maxIndex();
                }
                if (scope.currentIndex < 0) {
                    scope.currentIndex = 0;
                }
            };

            scope.maxIndex = () => deviceTranslateIndex(scope.cardsPerSlide, scope.count - 1);

            /**
            * Index of active slide
            * @scope
            * @name currentIndex
            * @type int
            */
            scope.currentIndex = parseInt(scope.startIndex, 10);

            /**
            * Move to the previous slide.
            * @scope
            * @name previous
            * @param {string} str Cool string with a name.
            * @return {void}
            */
            scope.previous = () => {
                scope.previousSwipe = Date.now();
                scope.currentIndex = Math.max(0, scope.currentIndex - 1);
                CwoMI.logEvent({ event: `CardSlider-Previous-${scope.currentIndex}` });
            };

            /**
            * Move to the next slide.
            * @scope
            * @name next
            * @return {void}
            */
            scope.next = () => {
                scope.previousSwipe = Date.now();
                scope.currentIndex = Math.min(scope.count - 1, scope.currentIndex + 1);
                CwoMI.logEvent({ event: `CardSlider-Next-${scope.currentIndex}` });
            };
        },
    });
});

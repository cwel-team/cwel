const Choreographer = require('choreographer-js');

angular.module('cwel')
.factory('scrollAnimationFactory', () => {
    const animations = {
        'no-animation': [
        ],
        'top-right': [
            { type: 'scale', style: 'top', from: 0, to: -2, unit: 'rem' },
            { type: 'scale', style: 'left', from: 0, to: 2, unit: 'rem' },
        ],
        'top-left': [
            { type: 'scale', style: 'top', from: 0, to: -2, unit: 'rem' },
            { type: 'scale', style: 'left', from: 0, to: -2, unit: 'rem' },
        ],
    };
    return {
        getAnimation: (animationName, elm, range) => {
            const animation = animations[animationName];
            if (typeof (animation) !== 'undefined') {
                const fullConfig = [];
                const additionalConfig = { range, selector: elm };
                angular.forEach(animation, (animationSegment) => {
                    fullConfig.push(angular.extend({}, animationSegment, additionalConfig));
                });
                return fullConfig;
            }
            return false;
        },
    };
});

angular.module('cwel')
.directive('scrollAnimate', (scrollAnimationFactory, $window) => {
    return {
        scope: {
            scrollAnimate: '@',
        },
        link(scope, el) {
            let resizeTimer;
            const doc = document.body;

            function calcAnimation() {
                let range;
                const elm = el[0].getBoundingClientRect().top;
                const windowHeight = $window.innerHeight;
                const scrollTop = $window.pageYOffset || doc.scrollTop;
                const clientTop = doc.clientTop || 0;

                const top = elm + scrollTop - clientTop; // eslint-disable-line no-mixed-operators
                const negativeTop = scrollTop - elm;

                if (top < windowHeight) {
                    range = [negativeTop / elm, top];
                } else {
                    range = [top - windowHeight, top];
                }

                const animateName = scope.scrollAnimate;
                return scrollAnimationFactory.getAnimation(animateName, el[0], range) || [];
            }

            const choreographer = new Choreographer({
                animations: calcAnimation(),
            });

            function animate() {
                const scrollPosition = Math.abs(doc.getBoundingClientRect().top - doc.offsetTop);
                choreographer.runAnimationsAt(scrollPosition);
            }

            function update() {
                choreographer.updateAnimations(calcAnimation());
            }
            angular.element($window).on('scroll', animate);
            angular.element($window).on('resize', () => {
                clearTimeout(resizeTimer);
                resizeTimer = setTimeout(() => {
                    update();
                }, 250);
            });
        },
    };
});


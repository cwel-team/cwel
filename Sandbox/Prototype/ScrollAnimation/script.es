import '../../../Cwel/Script/main';

const Choreographer = require('choreographer-js');

window.app = angular.module('sandbox', ['cwel']);

window.app.factory('animationFactory', () => {
    const animations = {
        /* eslint-disable */
        image: [
            { type: 'scale', style: 'top', from: 0, to: -2, unit: 'rem' },
            { type: 'scale', style: 'left', from: 0, to: 2, unit: 'rem' },
        ],
        imageleft: [
            { type: 'scale', style: 'left', from: 0, to: 8, unit: 'rem' },
        ],
        imagedown: [
            { type: 'scale', style: 'top', from: 0, to: 4, unit: 'rem' },
        ],
        /* eslint-enable */
    };
    return {
        getAnimation: (animationName, elm, range) => {
            const animation = animations[animationName];
            if (typeof (animation) !== 'undefined') {
                const additionalConfig = { range, selector: elm };
                const completedConfig = [];
                angular.forEach(animation, (animationSegment) => {
                    completedConfig.push(angular.extend({}, animationSegment, additionalConfig));
                });
                return completedConfig;
            }
            return false;
        },
    };
});

window.app.directive('animate', (animationFactory, $window) => {
    return {
        scope: {
            animate: '@',
        },
        link(scope, el) {
            let range;
            let result;
            let resizeTimer;
            const doc = document.body;

            function calcAnimation() {
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

                const animateName = scope.animate;
                result = animationFactory.getAnimation(animateName, el[0], range);
            }

            calcAnimation();

            const choreographer = new Choreographer({
                animations: result,
            });

            function animate() {
                const scrollPosition = (doc.getBoundingClientRect().top - doc.offsetTop) * -1;
                choreographer.runAnimationsAt(scrollPosition);
            }

            function update() {
                calcAnimation();
                choreographer.updateAnimations(result);
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

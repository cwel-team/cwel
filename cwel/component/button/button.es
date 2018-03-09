angular.module('cwel').directive('button', () => {
    return {
        restrict: 'C',
        scope: {},
        link(scope, el) {
            el.bind('mousemove', (e) => {
                const x = e.offsetX;
                const y = e.offsetY;
                e.target.style.setProperty('--x', `${ x }px`);
                e.target.style.setProperty('--y', `${ y }px`);
            });
        },
    };
});


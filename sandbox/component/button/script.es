import '../../../cwel/script/main';

window.app = angular.module('sandbox', ['cwel']);

window.app.directive('hoverEffect', () => {
    return {
        restrict: 'A',
        scope: {},
        link(scope, el) {
            el.bind('mousemove', (e) => {
                const x = e.pageX - e.target.offsetLeft;
                const y = e.pageY - e.target.offsetTop;
                e.target.style.setProperty('--x', `${ x }px`);
                e.target.style.setProperty('--y', `${ y }px`);
            })
        },
    };
});


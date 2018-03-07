angular.module('cwel').directive('button', () => {
    return {
        restrict: 'C',
        scope: {},
        link(scope, el) {
            console.log(el);
            el.bind('mousemove', (e) => {
                const x = e.pageX - e.target.offsetLeft;
                const y = e.pageY - e.target.offsetTop;
                e.target.style.setProperty('--x', `${ x }px`);
                e.target.style.setProperty('--y', `${ y }px`);
            });
        },
    };
});


angular.module('sandbox').directive('overlay-open', () => {
    return {
        restrict: 'C',
        scope: {
            overlayId: '@',
        },
        link(scope, el) {
            console.log("I'm here");
            el.on('click', () => {
                console.log("'sup?");
            });
        },
    };
});

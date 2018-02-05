import '../../../Cwel/Script/main';

const app = angular.module('sandbox', ['cwel']);

app.controller('AppController', () => {});

app.directive('docsExample', (CwomponentFactory) => {
    return CwomponentFactory({
        restrict: 'C',
        scope: {},
        link(scope) {
            scope.show = 'markup';
            scope.data = {
                html: '',
                css: '',
                css_pre_processor: 'scss',
                css_starter: 'neither',
                css_external: 'https://codepen.io/dstuessy/pen/d01874457659b3ab442c82aed7348443',
                js: '',
                js_pre_processor: 'babel',
                js_external: 'https://codepen.io/dstuessy/pen/d01874457659b3ab442c82aed7348443',
            };
        },
    });
});

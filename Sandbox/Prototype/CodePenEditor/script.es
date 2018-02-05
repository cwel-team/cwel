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
                markup: "here's markup",
                style: "here's styling",
                script: "here's script",
            };
        },
    });
});

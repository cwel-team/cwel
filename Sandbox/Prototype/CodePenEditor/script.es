import '../../../Cwel/Script/main';

const app = angular.module('sandbox', []);

app.directive('docsExample', () => {
    return {
        restricted: 'A',
        scope: {
            show: '@',
        },
        link(scope) {
            scope.show = 'html';
            scope.data = {
                markup: '',
                style: '',
                script: '',
            };
        },
    };
});

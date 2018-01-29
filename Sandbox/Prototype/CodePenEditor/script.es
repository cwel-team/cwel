angular.module('sandbox')
.directive('DocsExample', () => {
    return {
        restricted: 'A',
        scope: {
            show: '@',
        },
        link(scope) {
            scope.show = 'html';
            scope.data = {
                html: '',
                css: '',
                js: '',
            };
        },
    };
});

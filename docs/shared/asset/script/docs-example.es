import prism from 'prismjs';

angular.module('docs')
.directive('bindHtmlCompile', ($compile) => {
    return {
        restrict: 'A',
        link(scope, element, attrs) {
            scope.$watch(attrs.bindHtmlCompile, (newVal, oldVal) => {
                if (newVal === oldVal) {
                    return;
                }

                // Incase value is a TrustedValueHolderType, sometimes it
                // needs to be explicitly called into a string in order to
                // get the HTML string.
                if (newVal) {
                    element.html(newVal.toString());
                }

                // If scope is provided use it, otherwise use parent scope
                $compile(element.contents())(scope);
            });
        },
    };
});

angular.module('docs')
.directive('docsExample', $http => ({
    restrict: 'C',
    scope: {
        component: '@',
    },
    templateUrl: '/shared/asset/view/docs-example.html',
    link(scope) {
        const basePath = '/component';

        scope.expanded = false;
        scope.show = 'html';
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
        scope.highlight = (code, lang) => {
            return prism.highlight(code, prism.languages[lang]);
        };

        $http.get(`${basePath}/${scope.component}/${scope.component}.html`).then((res) => {
            scope.data.html = res.data;
        }, () => { scope.data.html = 'no markup available for this component'; });

        $http.get(`${basePath}/${scope.component}/${scope.component}.scss`).then((res) => {
            scope.data.css = res.data;
        }, () => { scope.data.css = 'no styling available for this component'; });

        $http.get(`${basePath}/${scope.component}/${scope.component}.es`).then((res) => {
            scope.data.js = res.data;
        }, () => { scope.data.js = 'no script available for this component'; });

        scope.$watch('show', (newVal) => {
            scope.expandable = scope.data[newVal].split('\n').length > 12;
        });
    },
}));

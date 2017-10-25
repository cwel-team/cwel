angular.module('cwoApp').directive('jsfiddle', ($http, CwomponentFactory) => {
    function grabContent(scope, frame, cb = () => {}) {
        const playgroundEl = frame.contentWindow.document.body.querySelector('.docs-playground-stage > *');

        if (playgroundEl) {
            console.log(playgroundEl.innerHTML);
            $http.post('/Playground/Fiddle', {
                model: scope.model,
                html: playgroundEl.innerHTML,
            }).then((response) => {
                scope.script = response.data.script;
                scope.style = response.data.style;
                scope.markup = response.data.markup;
                cb();
            });
        }
    }

    return CwomponentFactory({
        scope: {
            model: '@',
            frame: '@',
        },
        link(scope, form) {
            const frame = document.querySelector(scope.frame);
            scope.resources = [
                'https://rawgit.com/hammerjs/hammer.js/v2.0.7/hammer.js',
                'https://ajax.googleapis.com/ajax/libs/angularjs/1.6.6/angular.min.js',
            ].join(',');

            angular.element(frame).on('load', () => {
                setTimeout(() => grabContent(scope, frame), 1000);
            });

            scope.$watch('model', () => {
                grabContent(scope, frame);
            });

            scope.submit = ($event) => {
                $event.preventDefault();
                grabContent(scope, frame, () => {
                    form[0].submit();
                });
            };
        },
    });
});

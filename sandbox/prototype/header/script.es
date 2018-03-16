import '../../../cwel/script/main';

window.app = angular.module('sandbox', ['cwel']);

app.directive('nav', ($window, CwomponentFactory) => {
    return CwomponentFactory({
        restrict: 'A',
        scope: {},
        link: (scope, element) => {
            let nav;
            let itemsWidth = 0;
            const items = element.find('li');

            angular.element($window).bind('resize', () => {
                let count = 0;
                nav = element[0].clientWidth;
                itemsWidth = 0;

                angular.forEach(items, (a) => {
                    itemsWidth += a.clientWidth;

                    if (itemsWidth < nav) {
                        count += 1;
                    }
                })

                scope.$apply(() => {
                    scope.count = count
                });
             });
        },
    });
})
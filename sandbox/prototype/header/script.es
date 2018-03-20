import '../../../cwel/script/main';

window.app = angular.module('sandbox', ['cwel']);

app.directive('nav', ($window, CwomponentFactory) => {
    return CwomponentFactory({
        restrict: 'A',
        scope: {},
        link: (scope, element) => {
            let innerWidth;
            let outerWidth;
            let count = 0;

            const el = element[0];
            const list = el.querySelector('.header__nav-list');
            const dropdown = el.querySelector('.dropdown__list');
            const btn = el.querySelector('.dropdown__button');

            function calc() {
                let nav = el.clientWidth;
                let listWidth = list.clientWidth;
                let listChild = list.lastChild;
                let dropChild = dropdown.firstChild;

                const lastChild = el.querySelector('.header__nav-item:last-child');

                // The extra 20px is for buffer to avoid flicking
                innerWidth = listWidth + lastChild.clientWidth + 20;
                outerWidth = nav - btn.clientWidth;

                // should we have two navs ? 
                if (listWidth > outerWidth) {
                    if (listChild) {
                        dropdown.prepend(listChild);
                        count += 1;
                        // calc(); // re-run so that more than one child can be moved to dropdown on a single resize
                    }
                }
                if (innerWidth < outerWidth) {
                    if (dropChild) {
                        list.append(dropChild);
                        count -= 1;
                        // calc();
                    }
                } 
            }

            angular.element($window).on('resize', () => {
                calc();
                scope.$apply(() => {
                    scope.count = count
                });
            });
        },
    });
})
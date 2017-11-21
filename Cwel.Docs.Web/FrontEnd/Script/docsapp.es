angular.module('cwoApp', ['cwel'])
.controller('appCtrl', ($scope) => {
    $scope.searchTerm = '';
    $scope.date = new Date();
    $scope.navSidebar = false;
    $scope.openNavList = '';

    $scope.showNavItem = (name) => {
        const itemName = name.toLowerCase();
        const searchTerm = $scope.searchTerm.toLowerCase();
        return itemName.indexOf(searchTerm) !== -1;
    };
})
.directive('heightAuto', ($window, CwomponentFactory) => {
    function fitHeight(el) {
        // getComputedStyle is necessary to get border widths because rem units are used for them
        const borderTopWidth = parseFloat($window.getComputedStyle(el[0]).getPropertyValue('border-top-width'), 10);
        const borderBottomWidth = parseFloat($window.getComputedStyle(el[0]).getPropertyValue('border-bottom-width'), 10);
        el[0].style.height = `${el[0].contentWindow.document.body.scrollHeight + borderTopWidth + borderBottomWidth}px`;
    }

    return CwomponentFactory({
        link(scope, el) {
            el.on('load', fitHeight.bind(null, el));
            $window.addEventListener('resize', fitHeight.bind(null, el));
        },
    });
});

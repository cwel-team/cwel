angular.module('cwoApp', ['cwel']).controller('appCtrl', ($scope) => {
    $scope.searchTerm = '';
    $scope.date = new Date();
    $scope.navSidebar = false;
    $scope.openNavList = '';

    $scope.showNavItem = (name) => {
        const itemName = name.toLowerCase();
        const searchTerm = $scope.searchTerm.toLowerCase();
        return itemName.indexOf(searchTerm) !== -1;
    };
});

angular.module('cwoApp', ['cwel']).controller('appCtrl', ($scope) => {
    $scope.searchTerm = '';
    $scope.date = new Date();

    $scope.showNavItem = (name) => {
        const itemName = name.toLowerCase();
        const searchTerm = $scope.searchTerm.toLowerCase();
        return itemName.indexOf(searchTerm) !== -1;
    };
});

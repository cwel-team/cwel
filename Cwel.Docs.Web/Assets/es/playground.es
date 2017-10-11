angular.module('cwoApp')
.controller('playgroundCtrl', ($scope, bus, $http, Breakpoint, playgroundStore) => {
    $scope.device = 'mobile';
    $scope.model = {
        children: [],
    };
    $scope.brick = {};
    $scope.currentlyEditing = {};
    $scope.sizes = Breakpoint.deviceSizes;
    $scope.avaliableSizes = Breakpoint.getDeviceSizesSmallerThanCurrent();
    $scope.outputSize = $scope.sizes[0];

    $http.get('/playground/names').then((res) => {
        $scope.names = res.data;
    });

    Breakpoint.on('all', () => {
        $scope.avaliableSizes = Breakpoint.getDeviceSizesSmallerThanCurrent();
        const mustSelect = !$scope.avaliableSizes.find(size =>
            size.name === $scope.outputSize.name);
        if (mustSelect) {
            $scope.outputSize = $scope.avaliableSizes[$scope.avaliableSizes.length - 1];
            $scope.resizeOutput();
        }
    });

    $scope.fetchModel = (item) =>
        $http({
            url: '/playground/model/',
            params: {
                type: item.type,
                name: item.name,
            },
            method: 'GET',
        }).then((res) => {
            item.data = res.data;
        }).catch((err) => {
            console.error(err);
        });
    };

    $scope.addComponent = () => {
        if ($scope.brick.name) {
            const newBrick = angular.copy($scope.brick);
            delete newBrick.$$hashKey;
            $scope.model.children.push(newBrick);
            $scope.brick = {};
        }
    };

    $scope.editBrick = (child) => {
        $scope.brick = angular.copy(child);
        delete $scope.brick.$$hashKey;
        $scope.currentlyEditing = child;
        $scope.isEditing = true;
    };

    $scope.cancelEdit = () => {
        $scope.brick = {};
        $scope.currentlyEditing = {};
        $scope.isEditing = false;
    };

    $scope.saveEdit = () => {
        if ($scope.brick.name) {
            angular.extend($scope.currentlyEditing, $scope.brick);
            $scope.currentlyEditing = {};
            $scope.brick = {};
            $scope.isEditing = false;
        }
    };

    $scope.removeBrick = (index) => {
        $scope.model.children.splice(index, 1);
    };

    $scope.moveBrick = (index, direction) => {
        const newPosition = index + direction;
        if (newPosition >= 0 && newPosition < $scope.model.children.length) {
            const temp = $scope.model.children[newPosition];
            $scope.model.children[newPosition] = $scope.model.children[index];
            $scope.model.children[index] = temp;
        }
    };

    $scope.resizeOutput = () => {
        $scope.iframeStyle = {
            width: `${$scope.outputSize.standardWidth}px`,
            height: `${$scope.outputSize.standardHeight}px`,
        };
    };

    // Sync model to iframe
    $scope.$watch('model', () => {
        const model = angular.copy($scope.model);
        delete model.$$hashKey;
        bus.message('modelSync', model);
        playgroundStore.store(angular.toJson(model));
    }, true);
    // Set the stage :D
    $scope.resizeOutput();

    $scope.getSaveModel = () => angular.toJson($scope.model);

    $scope.getModel = () => {
        const m = angular.copy($scope.model);
        m.children = m.children.map((c) => {
            const cp = angular.copy(c);
            cp.data = JSON.stringify(cp.data);
            return cp;
        });
        return JSON.stringify(m);
    };
    $scope.model = playgroundStore.load();
})
.controller('stageCtrl', ($scope, bus) => {
    $scope.model = {
        children: [],
    };

    bus.on('modelSync', (model) => {
        $scope.model = model;
    });
})
.directive('rendering', ($http, $compile) => {
    return {
        restrict: 'A',
        scope: {
            model: '=rendering',
        },
        link: (scope, element) => {
            function render() {
                if (!scope.model.name) return;
                element.empty();
                $http({
                    url: '/Playground/render',
                    method: 'GET',
                    params: {
                        type: scope.model.type,
                        name: scope.model.name,
                        model: scope.model.data,
                        layout: false,
                    },
                    cache: true,
                }).then((res) => {
                    if (res.data.trim()) {
                        const dom = $compile(res.data)(scope.$new());
                        element.append(dom);
                    }
                }).catch((err) => {
                    element.html('<div>Error yo</div>');
                    console.error(err);
                });
            }

            scope.$watch('model', render, true);
        },
    };
})
.directive('jsonText', () => {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: (scope, element, attr, ngModel) => {
            function into(input) {
                try {
                    return JSON.parse(input);
                } catch (err) {
                    console.warn('Parsing CWEL Json: ', err);
                }
                return {};
            }
            function out(data) {
                return JSON.stringify(data, null, ' ');
            }
            ngModel.$parsers.push(into);
            ngModel.$formatters.push(out);
        },
    };
});

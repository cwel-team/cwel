/* global JSONC */

angular.module('cwoApp')
.controller('playgroundCtrl', ($scope, bus, $http, $location) => {
    $scope.device = 'mobile';
    $scope.model = {
        children: [],
    };

    $scope.date = new Date();

    $http.get('/playground/names').then((res) => {
        $scope.names = res.data;
    });

    $scope.fetchModel = (item) => {
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

    $scope.resizeStage = () => {
        if ($scope.device !== 'desktop') {
            $scope.stageStyles = {};
        } else {
            $scope.stageStyles = {
                height: `${window.innerHeight - 5}px`,
            };
        }
    };

    $scope.addComponent = () => {
        $scope.model.children.push({
            type: 'component',
            name: '',
            data: {},
            editing: true,
        });
    };

    $scope.setDevice = (name) => {
        $scope.device = name;
        $scope.$applyAsync(() => {
            $scope.resizeStage();
        });
    };

    const initState = $location.hash();
    if (initState) {
        try {
            $scope.model = JSONC.unpack(initState);
        } catch (ex) {
            console.error('Failed to load initial state');
        }
    }

    // Sync model to iframe
    $scope.$watch('model', () => {
        // gzip + b64 might not be worth it here, could check model size before compressing
        $location.hash(JSONC.pack($scope.model));

        // The fast solution for lazy people TODO filter out $$hash keys
        // in a more efficient manner
        bus.message('modelSync', JSON.parse(angular.toJson($scope.model)));
    }, true);
    // Set the stage :D
    $scope.resizeStage();

    $scope.getModel = function () {
        const m = angular.copy($scope.model);
        m.children = m.children.map((c) => {
            const cp = angular.copy(c);
            cp.data = JSON.stringify(cp.data);
            return cp;
        });
        return JSON.stringify(m);
    };
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
                return JSON.parse(input);
            }
            function out(data) {
                return JSON.stringify(data, null, ' ');
            }
            ngModel.$parsers.push(into);
            ngModel.$formatters.push(out);
        },
    };
});

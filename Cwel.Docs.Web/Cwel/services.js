'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

angular.module('cwoApp').factory('addOne', function () {
    return {
        increment: function increment(num) {
            return num + 1;
        }
    };
});

angular.module('cwoApp').service('Breakpoint', ['$window', '$rootScope', function ($window, $rootScope) {
    return new (function () {
        function Breakpoint() {
            var _this = this;

            _classCallCheck(this, Breakpoint);

            this.events = [];
            this.deviceSizes = [{
                name: 'xs',
                breakpoint: 0,
                standardWidth: 320,
                standardHeight: 568
            }, {
                name: 's',
                breakpoint: 400,
                standardWidth: 400,
                standardHeight: 736
            }, {
                name: 'm',
                breakpoint: 600,
                standardWidth: 600,
                standardHeight: 1024
            }, {
                name: 'l',
                breakpoint: 1004,
                standardWidth: 1004,
                standardHeight: 1366
            }, {
                name: 'xl',
                breakpoint: 1280,
                standardWidth: 1280,
                standardHeight: 1600
            }];
            this.currentDevice = this.deviceSizes.filter(function (ds) {
                return _this.generateMediaQuery(ds.name).matches;
            }).shift();

            angular.element($window).bind('resize', function () {
                _this.deviceSizes.forEach(function (deviceSize, i) {
                    var mediaQuery = _this.generateMediaQuery(deviceSize.name);
                    var prevSize = _this.deviceSizes[i - 1] || undefined;
                    var nextSize = _this.deviceSizes[i + 1] || undefined;

                    if (_this.currentDevice.name !== deviceSize.name && mediaQuery.matches === true) {
                        _this.currentDevice = deviceSize;
                        _this.emit(deviceSize.name, {
                            previous: prevSize,
                            current: deviceSize,
                            next: nextSize
                        });
                    }
                });
            });
        }

        _createClass(Breakpoint, [{
            key: 'on',
            value: function on(eventNames, callback) {
                var _this2 = this;

                if (typeof eventNames === 'string') {
                    eventNames = [eventNames];
                }

                eventNames.forEach(function (name) {
                    _this2.events.push({
                        name: name,
                        callback: callback
                    });
                });

                return this;
            }
        }, {
            key: 'emit',
            value: function emit(name) {
                for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                    args[_key - 1] = arguments[_key];
                }

                var events = this.events.filter(function (e) {
                    return e.name === name || e.name === 'all';
                });
                $rootScope.$applyAsync(function () {
                    events.forEach(function (event) {
                        return event.callback.apply(event, args);
                    });
                });
            }
        }, {
            key: 'getDeviceSizesSmallerThanCurrent',
            value: function getDeviceSizesSmallerThanCurrent() {
                return this.deviceSizes.filter(function (size) {
                    var mq = '(max-width: ' + size.breakpoint + 'px)';
                    return !$window.matchMedia(mq).matches;
                });
            }
        }, {
            key: 'generateMediaQuery',
            value: function generateMediaQuery(sizeName) {
                var dsIndex = this.deviceSizes.map(function (ds) {
                    return ds.name;
                }).indexOf(sizeName);
                var deviceSize = this.deviceSizes[dsIndex];
                var nextSize = this.deviceSizes[dsIndex + 1];
                var query = ['(min-width: ' + deviceSize.breakpoint + 'px)'];

                if (nextSize) {
                    query.push('(max-width: ' + (nextSize.breakpoint - 1) + 'px)');
                }

                return $window.matchMedia('' + query.join(' and '));
            }
        }]);

        return Breakpoint;
    }())();
}]);

angular.module('cwoApp').service('CwoMI', ['$window', function ($window) {
    $window.dataLayer = $window.dataLayer || [];

    return {
        logEvent: function logEvent(event) {
            if (event) {
                $window.dataLayer.push(event);
            }
        }
    };
}]);

angular.module('cwoApp').factory('CwomponentFactory', ['$compile', function ($compile) {
    var cwomponentPrio = 50;

    // Cwomponentify a directive definition object
    return function (ddo) {
        var prevLink = void 0;

        if (ddo.priority || ddo.compile) {
            console.warn('CwomponentFactory called for a directive that defines a compile function or a priority');
            return ddo;
        }

        // Remove link function
        if (ddo.link) {
            prevLink = ddo.link;
            delete ddo.link;
        }

        ddo.compile = function (templateElement) {
            var compiled = $compile(templateElement, null, cwomponentPrio);
            return function (scope) {
                for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
                    args[_key2 - 1] = arguments[_key2];
                }

                compiled(scope);

                if (prevLink) {
                    prevLink.apply(undefined, [scope].concat(args));
                }
            };
        };

        ddo.priority = cwomponentPrio;
        return ddo;
    };
}]);
//# sourceMappingURL=services.js.map

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
                for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                    args[_key - 1] = arguments[_key];
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

angular.module('cwoApp').service('Breakpoint', ['$window', function ($window) {
    return new (function () {
        function Breakpoint() {
            var _this = this;

            _classCallCheck(this, Breakpoint);

            this.events = [];
            this.deviceSizes = [{
                name: 'xs',
                breakpoint: 0
            }, {
                name: 's',
                breakpoint: 400
            }, {
                name: 'm',
                breakpoint: 600
            }, {
                name: 'l',
                breakpoint: 1004
            }, {
                name: 'xl',
                breakpoint: 1280
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
                    var names = _this2.deviceSizes.map(function (bp) {
                        return bp.name;
                    });

                    if (names.indexOf(name) < 0) {
                        throw Error('Breakpoint: unknown event name, dude');
                    }

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
                for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
                    args[_key2 - 1] = arguments[_key2];
                }

                var events = this.events.filter(function (e) {
                    return e.name === name;
                });

                events.forEach(function (event) {
                    return event.callback.apply(event, args);
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
//# sourceMappingURL=services.js.map

angular.module('cwel').service('Breakpoint', ($window, $rootScope) => {
    return new (class Breakpoint {
        constructor() {
            this.events = [];
            this.deviceSizes = [
                {
                    name: 'xs',
                    breakpoint: 0,
                    standardWidth: 320,
                    standardHeight: 568,
                },
                {
                    name: 's',
                    breakpoint: 400,
                    standardWidth: 400,
                    standardHeight: 736,
                },
                {
                    name: 'm',
                    breakpoint: 600,
                    standardWidth: 600,
                    standardHeight: 1024,
                },
                {
                    name: 'l',
                    breakpoint: 1004,
                    standardWidth: 1004,
                    standardHeight: 1366,
                },
                {
                    name: 'xl',
                    breakpoint: 1280,
                    standardWidth: 1280,
                    standardHeight: 1600,
                },
            ];
            this.currentDevice = this.deviceSizes.filter(ds =>
                this.generateMediaQuery(ds.name).matches).shift();

            angular.element($window).bind('resize', () => {
                this.deviceSizes.forEach((deviceSize, i) => {
                    const mediaQuery = this.generateMediaQuery(deviceSize.name);
                    const prevSize = this.deviceSizes[i - 1] || undefined;
                    const nextSize = this.deviceSizes[i + 1] || undefined;

                    if (this.currentDevice.name !== deviceSize.name
                    && mediaQuery.matches === true) {
                        this.currentDevice = deviceSize;
                        this.emit(deviceSize.name, {
                            previous: prevSize,
                            current: deviceSize,
                            next: nextSize,
                        });
                    }
                });
            });
        }

        on(eventNames, callback) {
            if (typeof eventNames === 'string') {
                eventNames = [eventNames];
            }

            eventNames.forEach((name) => {
                this.events.push({
                    name,
                    callback,
                });
            });

            return this;
        }

        emit(name, ...args) {
            const events = this.events.filter(e => e.name === name || e.name === 'all');
            $rootScope.$applyAsync(() => {
                events.forEach(event => event.callback(...args));
            });
        }

        getDeviceSizesSmallerThanCurrent() {
            return this.deviceSizes.filter((size) => {
                const mq = `(max-width: ${size.breakpoint}px)`;
                return !$window.matchMedia(mq).matches;
            });
        }

        generateMediaQuery(sizeName) {
            const dsIndex = this.deviceSizes.map(ds => ds.name).indexOf(sizeName);
            const deviceSize = this.deviceSizes[dsIndex];
            const nextSize = this.deviceSizes[dsIndex + 1];
            const query = [`(min-width: ${deviceSize.breakpoint}px)`];

            if (nextSize) {
                query.push(`(max-width: ${nextSize.breakpoint - 1}px)`);
            }

            return $window.matchMedia(`${query.join(' and ')}`);
        }
    })();
});

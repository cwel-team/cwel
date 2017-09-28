angular.module('cwoApp').service('Breakpoint', ($window) => {
    return new (class Breakpoint {
        constructor() {
            this.events = [];
            this.deviceSizes = [
                {
                    name: 'xs',
                    breakpoint: 0,
                },
                {
                    name: 's',
                    breakpoint: 400,
                },
                {
                    name: 'm',
                    breakpoint: 600,
                },
                {
                    name: 'l',
                    breakpoint: 1004,
                },
                {
                    name: 'xl',
                    breakpoint: 1280,
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
                const names = this.deviceSizes.map(bp => bp.name);

                if (names.indexOf(name) < 0) {
                    throw Error('Breakpoint: unknown event name, dude');
                }

                this.events.push({
                    name,
                    callback,
                });
            });

            return this;
        }

        emit(name, ...args) {
            const events = this.events.filter(e => e.name === name);

            events.forEach(event => event.callback(...args));
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

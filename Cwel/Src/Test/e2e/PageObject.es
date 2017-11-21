export default class CwomponentPageObject {
    constructor(type, name) {
        this.playgroundUrl = `${browser.params.host}/playground/render?layout=true`;
        this.type = type;
        this.name = name;
        this.windowSizes = [
            { deviceSize: 'xs', width: 320, breakpoint: 0 },
            { deviceSize: 's', width: 400, breakpoint: 400 },
            { deviceSize: 'm', width: 768, breakpoint: 600 },
            { deviceSize: 'l', width: 1100, breakpoint: 1004 },
            { deviceSize: 'xl', width: 1366, breakpoint: 1280 },
        ];
    }

    getPlaygroundUrl(model) {
        return `${this.playgroundUrl}&model=${JSON.stringify(model)}&type=${this.type}&name=${this.name}`;
    }

    navigate(model) {
        browser.get(this.getPlaygroundUrl(model));
    }

    breakpointMatch(deviceSize, cb = () => {}) {
        browser.driver.manage().window().getSize()
        .then(({ width }) => {
            const target = this.windowSizes
            .filter(ws => ws.deviceSize === deviceSize)
            .shift() || {};
            const actual = this.windowSizes
            .filter(ws => width >= ws.breakpoint)
            .pop() || {};
            const match = target.deviceSize === actual.deviceSize;

            if (match) {
                cb();
            }
        });
    }
}

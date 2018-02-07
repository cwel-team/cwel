const browserSync = require('browser-sync');

const notifyStyles = [
    'display: none',
    'z-index: 9999',
    'position: fixed',
    'left: 0',
    'bottom: 0',
    'width: 100%',
    'margin: 0',
    'padding: 10px',
    'font-family: sans-serif',
    'font-size: 12px',
    'text-align: center',
    'color: #fff',
    'background-color: #2a2a2a',
];

class MultiSync {
    constructor() {
        this.docsSync = browserSync.create();
        this.sandSync = browserSync.create();
    }
    init() {
        this.docsSync.init({
            server: 'tmp/docs',
            port: 3000,
            ui: {
                port: 3001,
            },
            notify: {
                styles: notifyStyles,
            },
        });
        this.sandSync.init({
            server: 'tmp/sandbox',
            port: 3030,
            ui: {
                port: 3031,
            },
            notify: {
                styles: notifyStyles,
            },
        });
    }

    reload() {
        this.docsSync.reload();
        this.sandSync.reload();
    }
}

module.exports = new MultiSync();

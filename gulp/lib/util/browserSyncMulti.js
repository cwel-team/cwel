const browserSync = require('browser-sync');

class MultiSync {
    constructor() {
        this.docsSync = browserSync.create();
        this.cmsSync = browserSync.create();
    }
    init() {
        this.docsSync.init({
            proxy: 'docs.episerver.local',
            port: 3000,
            ui: {
                port: 3001,
            },
        });
        // TODO(Declan Cook) Brand???
        this.cmsSync.init({
            proxy: 'abbotts.episerver.local',
            port: 3030,
            ui: {
                port: 3031,
            },
        });
    }

    reload() {
        this.docsSync.reload();
        this.cmsSync.reload();
    }
}

module.exports = new MultiSync();

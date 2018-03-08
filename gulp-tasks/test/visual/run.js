const browserSync               = require('browser-sync');
const { execSync }              = require('child_process');
const { URL }                   = require('url');
const opn                       = require('opn');                           // A better node-open. Opens stuff like websites, files, execs, etc.
const path                      = require('path');                          // Native node path module
const childProcess              = require('child_process');                 // Node native child process module
const browserstack              = require('browserstack-local');            // Nodejs bindings for BrowserStack Local.
const yargs                     = require('yargs');                         // Args

const { version: buildVersion } = require('../../../package.json');

const { argv } = yargs
.option('grid', {
    type: 'string',
    default: '',
})
.option('host', {
    type: 'string',
    default: 'http://localhost:3030/',
})
.option('dump', {
    type: 'string',
});
const buildBranch = process.env.bamboo_planRepository_branchName || execSync('git symbolic-ref --short -q HEAD').toString();
const buildCommit = process.env.bamboo_repository_revision_number || execSync('git rev-parse --short HEAD').toString();
const buildNumber = process.env.bamboo_buildNumber || 0;
const buildName = `cwel-visual--${buildNumber}--[${buildVersion}]#${buildBranch}@${buildCommit}`;


function runGalen({ suiteFile, htmlDest, dumpDest, openReport, args = [] }, done) {
    const dumpArgs = dumpDest
        ? ['--junitreport', `${dumpDest}/junit-visual.xml`]
        : [];
    const jsonArgs = dumpDest
        ? ['--jsonreport', dumpDest]
        : [];
    const galenCommand = ['npm run galen',
        '--',
        'test', `test/visual/${suiteFile}`,
        '--htmlreport', htmlDest,
        ...jsonArgs,
        ...dumpArgs,
        ...args,
        `-Dbuild_name=${buildName}`,
    ];
    const galenProc = childProcess.exec(galenCommand.join(' '), {
        cwd: process.cwd(),
        env: process.env,
    });

    galenProc.stdout.pipe(process.stdout);
    galenProc.stderr.pipe(process.stderr);

    galenProc.on('close', () => {
        if (openReport) {
            opn(`${path.resolve(htmlDest)}/report.html`);
        }

        done();
    });
}

function initBrowsersync(port = 3000, success = () => {}) {
    browserSync.create().init({
        server: 'tmp/sandbox',
        port,
        open: false,
        notify: {
            styles: { display: 'none' },
        },
    }, (...args) => success(...args));
}


module.exports = (done) => {
    const { openReport, dump, grid, host } = argv;
    const { port } = new URL(host);
    const htmlDest = 'tmp/test/visual/report/html';
    const isBrowserstack = grid.includes('browserstack');
    let dumpDest = dump || 'tmp/test/visual/report';

    // make sure the default does not get applied if undefined
    // as type of undefined means the argument hasn't been set.
    if (typeof dump === 'undefined') {
        dumpDest = '';
    }

    initBrowsersync(port, (e, bs) => {
        if (e) {
            throw e;
        }

        if (isBrowserstack) {
            const { password: key } = new URL(grid);
            const suiteFile = 'browserstack.test';
            const localTunnel = new browserstack.Local();
            const tunnelArgs = { key };
            const galenArgs = [
                `-Dgrid_url=${grid}`,
                `-Dhost_url=${host.replace(/\/$/, '')}`,
            ];

            console.log('Connecting to BrowserStack local tunnel...');

            localTunnel.start(tunnelArgs, (err) => {
                if (err) {
                    throw err;
                }

                console.log('Connected to BrowserStack local tunnel...');

                runGalen({ suiteFile, htmlDest, dumpDest, openReport, args: galenArgs }, () => {
                    localTunnel.stop(() => {
                        console.log('Disconnected from BrowserStack local tunnel...');
                        bs.publicInstance.exit();
                        done();
                    });
                });
            });
        } else if (grid) {
            const suiteFile = 'grid.test';
            const galenArgs = [
                `-Dgrid_url=${grid}`,
                `-Dhost_url=${host.replace(/\/$/, '')}`,
            ];

            runGalen({ suiteFile, htmlDest, dumpDest, openReport, args: galenArgs }, () => {
                bs.publicInstance.exit();
                done();
            });
        } else {
            const suiteFile = 'local.test';
            const galenArgs = [
                `-Dhost_url=${host.replace(/\/$/, '')}`,
            ];

            runGalen({ suiteFile, htmlDest, dumpDest, openReport, args: galenArgs }, () => {
                bs.publicInstance.exit();
                done();
            });
        }
    });
};

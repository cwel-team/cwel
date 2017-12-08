const gulp                      = require('gulp');                          // Task automator
const { execSync }              = require('child_process');
const { URL }                   = require('url');
const opn                       = require('opn');                           // A better node-open. Opens stuff like websites, files, execs, etc.
const path                      = require('path');                          // Native node path module
const childProcess              = require('child_process');                 // Node native child process module
const browserstack              = require('browserstack-local');            // Nodejs bindings for BrowserStack Local.
const yargs                     = require('yargs');                         // Args

const { version: buildVersion } = require('../../../../package.json');

const { argv } = yargs
.option('grid', {
    type: 'string',
    default: '',
})
.option('host', {
    type: 'string',
    default: 'http://docs.cwel.local',
})
.option('dump', {
    type: 'string',
});
const buildBranch = process.env.bamboo_planRepository_branchName || execSync('git symbolic-ref --short -q HEAD').toString();
const buildCommit = process.env.bamboo_repository_revision_number || execSync('git rev-parse --short HEAD').toString();
const buildName = `cwel-visual--[${buildVersion}]#${buildBranch}@${buildCommit}`;


function runGalen({ suiteFile, htmlDest, dumpDest, openReport, args = [] }, done) {
    const dumpArgs = dumpDest
        ? ['--testngreport', `${dumpDest}/testng-visual.xml`]
        : [];
    const jsonArgs = dumpDest
        ? ['--jsonreport', dumpDest]
        : [];
    const galenCommand = ['npm run galen',
        '--',
        'test', `Cwel/Src/Test/visual/${suiteFile}`,
        '--htmlreport', htmlDest,
        ...jsonArgs,
        ...dumpArgs,
        ...args,
        `-DbuildName=${buildName}`,
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


// @internal
gulp.task('cwel-test-run-visual', (done) => {
    const { openReport, dump, grid, host } = argv;
    const htmlDest = 'Cwel/.tmp/test/Test/visual/report/html';
    const isBrowserstack = grid.includes('browserstack');
    let dumpDest = dump || 'Cwel/.tmp/test/Test/visual/report';

    // make sure the default does not get applied if undefined
    // as type of undefined means the argument hasn't been set.
    if (typeof dump === 'undefined') {
        dumpDest = '';
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

        runGalen({ suiteFile, htmlDest, dumpDest, openReport, args: galenArgs }, done);
    } else {
        const suiteFile = 'local.test';
        runGalen({ suiteFile, htmlDest, dumpDest, openReport }, done);
    }
});

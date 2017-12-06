const gulp              = require('gulp');                          // Task automator
const { URL }           = require('url');
const opn               = require('opn');                           // A better node-open. Opens stuff like websites, files, execs, etc.
const path              = require('path');                          // Native node path module
const childProcess      = require('child_process');                 // Node native child process module
const browserstack      = require('browserstack-local');            // Nodejs bindings for BrowserStack Local.
const yargs             = require('yargs');                         // Args

const { argv } = yargs
.option('grid', {
    type: 'string',
    default: 'http://docs.cwel.local',
})
.option('host', {
    type: 'string',
})
.option('dump', {
    type: 'string',
});


function runGalen({ suiteFile, htmlDest, dumpDest, openReport, args = [] }, done) {
    const testDate = new Date();
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
        `-DbuildName=cwel-visual--(${testDate.getFullYear()}-${testDate.getMonth()}-${testDate.getDate()}-${Math.floor(Date.now() + (Math.random() * 100))})`,
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
    const dumpDest = dump || 'Cwel/.tmp/test/Test/visual/report';
    const htmlDest = 'Cwel/.tmp/test/Test/visual/report/html';
    const isBrowserstack = grid.includes('browserstack');

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

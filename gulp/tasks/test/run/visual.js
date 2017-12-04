const gulp              = require('gulp');                          // Task automator
const opn               = require('opn');                           // A better node-open. Opens stuff like websites, files, execs, etc.
const path              = require('path');                          // Native node path module
const childProcess      = require('child_process');                 // Node native child process module
const browserstack      = require('browserstack-local');            // Nodejs bindings for BrowserStack Local.
const yargs             = require('yargs');                         // Args

const { argv } = yargs
.option('dump', {
    type: 'string',
});


function runGalen({ suiteFile, htmlDest, dumpDest, openReport, args = [] }, done) {
    const dumpArgs = dumpDest
        ? ['--testngreport', `${dumpDest}/testng.xml`]
        : [];
    const galenCommand = ['npm run galen',
        '--',
        'test', `Cwel/Src/Test/visual/${suiteFile}`,
        '--htmlreport', htmlDest,
        ...dumpArgs,
        ...args,
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
    const { openReport, dump } = argv;
    const dumpDest = dump || 'Cwel/.tmp/test/Test/visual/report';
    const htmlDest = 'Cwel/.tmp/test/Test/visual/report/html';

    if (argv.suite === 'browserstack'
    && argv.browserstack
    && argv.browserstack.username
    && argv.browserstack.key) {
        const suiteFile = `${argv.suite}.test`;
        const localTunnel = new browserstack.Local();
        const galenArgs = [
            `-Dbrowserstack.username=${argv.browserstack.username}`,
            `-Dbrowserstack.key=${argv.browserstack.key}`,
        ];
        const tunnelArgs = {
            key: argv.browserstack.key,
        };

        localTunnel.start(tunnelArgs, () => {
            runGalen({ suiteFile, htmlDest, dumpDest, openReport, args: galenArgs }, done);
        });
    } else {
        const suiteFile = 'local.test';
        runGalen({ suiteFile, htmlDest, dumpDest, openReport }, done);
    }
});

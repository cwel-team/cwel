const gulp              = require('gulp');                          // Task automator
const { URL }           = require('url');
const protractor        = require('gulp-protractor').protractor;    // End-to-end test framework for AngularJS
const yargs             = require('yargs');                         // Args

const { argv } = yargs
.option('dump', {
    type: 'string',
})
.option('grid', {
    type: 'string',
})
.option('host', {
    describe: 'target host on which e2e tests are executed: protocol://host.name',
    default: 'http://docs.cwel.local',
    type: 'string',
});

function runProtractor(args, done) {
    gulp.src(['Cwel/.tmp/test/**/*.{e2e,pageobject}.js'])
    .pipe(protractor({
        configFile: 'protractor.conf.js',
        args,
        keepAlive: true,
    })).on('error', () => {
        done();
    }).on('end', () => {
        done();
    });
}


// @internal
gulp.task('cwel-test-run-e2e', (done) => {
    const host = (new URL(argv.host)).href;
    const dumpDest = argv.dump || 'Cwel/.tmp/test/Test/e2e/report';
    const dumpArgs = dumpDest
        ? ['--params.dump', dumpDest]
        : [];
    const gridArgs = argv.grid
        ? ['--params.grid', argv.grid]
        : [];
    const args = [
        '--params.host', host,
        ...gridArgs,
        ...dumpArgs,
    ];

    runProtractor(args, done);
});

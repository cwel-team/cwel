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
    const {
        host,
        dump,
        grid = '',
        suite = 'dirty',
    } = argv;
    const hostUrl = (new URL(host)).href;
    let dumpDest = dump || 'Cwel/.tmp/test/Test/visual/report';

    // make sure the default does not get applied if undefined
    // as type of undefined means the argument hasn't been set.
    if (typeof dump === 'undefined') {
        dumpDest = '';
    }

    const args = [
        '--params.host', hostUrl,
        '--params.dump', dumpDest,
        '--params.suite', suite,
        '--params.grid', grid,
    ];

    runProtractor(args, done);
});

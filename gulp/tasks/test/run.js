const gulp              = require('gulp');                          // Task automator
const gulpSequence      = require('gulp-sequence');                 // Specify order of tasks
const KarmaServer       = require('karma').Server;                  // Execute JavaScript code in multiple real browsers
const protractor        = require('gulp-protractor').protractor;    // End-to-end test framework for AngularJS
const yargs             = require('yargs');                         // Args

const { argv } = yargs;
process.env.CHROME_BIN = require('puppeteer').executablePath();

// @internal
gulp.task('cwel-test-run', done => gulpSequence('cwel-test-run-e2e', 'cwel-test-run-unit')(done));


// @internal
gulp.task('cwel-test-run-e2e', (done) => {
    yargs.option('host', {
        describe: 'target host on which e2e tests are executed: protocol://host.name',
        default: 'http://docs.cwel.local',
    });
    const hostname = yargs.argv.host.replace(/\/$/, '');

    gulp.src(['Cwel/dist/test/**/*.{e2e,pageobject}.js'])
    .pipe(protractor({
        configFile: 'protractor.conf.js',
        args: [
            '--params.host', hostname,
        ],
        keepAlive: true,
    })).on('error', () => {
        done();
    }).on('end', () => {
        done();
    });
});

// @internal
gulp.task('cwel-test-run-unit', (done) => {
    const reporters = ['spec'];

    if (argv.junitDump) {
        reporters.push('junit');
    }

    const server = new KarmaServer({
        singleRun: !argv['dont-stop'],
        browsers: ['ChromeHeadless'],
        plugins: ['karma-spec-reporter', 'karma-jasmine', 'karma-chrome-launcher', 'karma-junit-reporter'],
        reporters,
        frameworks: ['jasmine'],
        files: [
            'Cwel/dist/Cwel/cwel-full.js',
            'Cwel/dist/test/Cwel/Testing/vendor/angular-mocks.js',
            'Cwel/dist/test/Cwel/**/*.spec.js',
        ],
    });

    server.on('run_complete', (browsers, results) => {
        done(results.error ? 'Tests Failed' : null);
    });

    server.start();
});

const gulp = require('gulp');
const yargs = require('yargs');
const KarmaServer = require('karma').Server;
const protractor = require('gulp-protractor').protractor;

const { argv } = yargs;

// @internal
gulp.task('cwomponents-e2e', (done) => {
    yargs.option('host', {
        describe: 'target host on which e2e tests are executed: protocol://host.name',
        default: 'http://docs.cwel.local',
    });
    const hostname = yargs.argv.host.replace(/\/$/, '');

    gulp.src(['Cwomponents/**/*.e2e.js'])
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
    const server = new KarmaServer({
        singleRun: !argv['dont-stop'],
        browsers: ['Chrome'],
        plugins: ['karma-spec-reporter', 'karma-jasmine', 'karma-chrome-launcher'],
        reporters: ['spec'],
        frameworks: ['jasmine'],
        files: [
            'Cwel/dist/Cwel/cwel.js',
            'Cwel/test/vendor/angular-mocks.js',
            'Cwel/dist/test/Cwel/**/*.spec.js',
        ],
    });

    server.on('run_complete', (browsers, results) => {
        done(results.error ? 'Tests Failed' : null);
    });

    server.start();
});

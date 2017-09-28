const gulp = require('gulp');
const yargs = require('yargs');
const KarmaServer = require('karma').Server;
const protractor = require('gulp-protractor').protractor;

const { argv } = yargs;

// @internal
gulp.task('cwomponents-e2e', (done) => {
    yargs.option('host', {
        describe: 'target host on which e2e tests are executed: protocol://host.name',
        default: 'http://docs.episerver.local',
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
gulp.task('cwomponents-unit', (done) => {
    const server = new KarmaServer({
        singleRun: !argv['dont-stop'],
        browsers: ['Chrome'],
        plugins: ['karma-spec-reporter', 'karma-jasmine', 'karma-chrome-launcher', 'karma-viewport'],
        reporters: ['spec'],
        frameworks: ['jasmine', 'viewport'],
        viewport: {
            breakpoints: [
                {
                    name: 'xs',
                    size: {
                        width: 300,
                        height: 800,
                    },
                },
                {
                    name: 's',
                    size: {
                        width: 400,
                        height: 800,
                    },
                },
                {
                    name: 'm',
                    size: {
                        width: 600,
                        height: 800,
                    },
                },
                {
                    name: 'l',
                    size: {
                        width: 1004,
                        height: 800,
                    },
                },
                {
                    name: 'xl',
                    size: {
                        width: 1280,
                        height: 800,
                    },
                },
            ],
        },
        files: [
            'https://ajax.googleapis.com/ajax/libs/angularjs/1.6.4/angular.min.js',
            'https://ajax.googleapis.com/ajax/libs/angularjs/1.6.4/angular-mocks.js', // @TODO point to node_modules angular file
            'Cwomponents/karma-app.js',
            'Cwomponents/dist/Pattern/**/!(*.pageobject).js',
            'Cwomponents/dist/Component/**/!(*.pageobject).js',
            'Cwomponents/dist/services.js',
            'Cwomponents/**/*.spec.js',
        ],
    });

    server.on('run_complete', (browsers, results) => {
        done(results.error ? 'Tests Failed' : null);
    });

    server.start();
});

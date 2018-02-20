const KarmaServer       = require('karma').Server;                  // Execute JavaScript code in multiple real browsers
const yargs             = require('yargs');                         // Args

const { argv } = yargs
.option('dump', {
    type: 'string',
});

process.env.CHROME_BIN = require('puppeteer').executablePath();


module.exports = (done) => {
    const dumpDest = argv.dump || 'tmp/test/unit/report';
    const dumpReporters = dumpDest
        ? ['junit']
        : [];
    const reporters = ['spec', ...dumpReporters];
    let results = {};
    const server = new KarmaServer({
        singleRun: !argv['dont-stop'],
        browsers: ['ChromeHeadless'],
        plugins: ['karma-spec-reporter', 'karma-jasmine', 'karma-chrome-launcher', 'karma-junit-reporter'],
        reporters,
        frameworks: ['jasmine'],
        junitReporter: {
            outputDir: dumpDest,
            outputFile: 'junit.xml',
            useBrowserName: false,
        },
        files: [
            'tmp/test/unit/main.js',
            'cwel/**/*.spec.es', // no need for transpilation on headless chrome
        ],
    }, (exitcode) => {
        done(results.error ? 'Tests failed' : null);
        process.exit(exitcode);
    });

    server.on('run_complete', (browsers, res) => {
        results = res;
    });

    server.start();
};

/* global jasmine */
const yargs = require('yargs');
const SpecReporter = require('jasmine-spec-reporter').SpecReporter;
const JunitXmlReporter = require('jasmine-reporters').JUnitXmlReporter;
const browserstack = require('browserstack-local');

const { argv } = yargs;
const grid = argv.params.grid || '';
const isBrowserstack = grid.includes('browserstack');
const localTunnel = isBrowserstack ? new browserstack.Local() : null;


const protractorOptions = {
    capabilities: {
        browserName: 'chrome',
        build: 'cwel-e2e',
    },
    onPrepare() {
        jasmine.getEnv().addReporter(new SpecReporter({
            spec: {
                displayStacktrace: true,
            },
        }));

        if (argv.params.dump) {
            jasmine.getEnv().addReporter(new JunitXmlReporter({
                savePath: argv.params.dump,
                filePrefix: 'junit',
            }));
        }
    },
    jasmineNodeOpts: {
        print() { },
    },
    // Start browserstack's local tunnel
    beforeLaunch() {
        return new Promise((resolve, reject) => {
            if (localTunnel) {
                const { password: key } = grid;

                localTunnel.start({ key }, (error) => {
                    if (error) {
                        reject(error);
                    } else {
                        console.log('Connected browserstack\'s tunnel. Now testing...');
                        resolve();
                    }
                });
            } else {
                resolve();
            }
        });
    },
    // Stop browserstack's local tunnel
    afterLaunch() {
        return new Promise((resolve) => {
            if (localTunnel) {
                console.log('Closing browserstack\'s tunnel.');
                localTunnel.stop(resolve);
            } else {
                resolve();
            }
        });
    },
};

if (grid) {
    protractorOptions.seleniumAddress = grid;
} else {
    protractorOptions.seleniumServerJar = './node_modules/protractor/node_modules/webdriver-manager/selenium/selenium-server-standalone-3.5.3.jar';
}

if (isBrowserstack) {
    protractorOptions.capabilities['browserstack.local'] = true;
    protractorOptions.capabilities['browserstack.debug'] = true;
}

module.exports.config = protractorOptions;

/* global jasmine */
const yargs = require('yargs');
const { URL } = require('url');
const SpecReporter = require('jasmine-spec-reporter').SpecReporter;
const JunitXmlReporter = require('jasmine-reporters').JUnitXmlReporter;
const browserstack = require('browserstack-local');

const { grid = '', suite, dump } = yargs.argv.params;
const isBrowserstack = grid.includes('browserstack');
const localTunnel = isBrowserstack ? new browserstack.Local() : null;
const buildDate = new Date();
const buildName = `cwel-e2e--(${buildDate.getFullYear()}-${buildDate.getMonth()}-${buildDate.getDate()}-${buildDate.getMinutes()})`;

const multiCapabilities = [];


if (suite === 'dirty') {
    multiCapabilities.push({
        browserName: 'chrome',
        build: buildName,
    });
}


if (suite === 'local') {
    multiCapabilities.push({
        browserName: 'chrome',
        build: buildName,
    });
    multiCapabilities.push({
        browserName: 'chrome',
        build: buildName,
    });
    multiCapabilities.push({
        browserName: 'internet explorer',
        build: buildName,
    });
}


if (suite === 'develop') {
    multiCapabilities.push({
        browserName: 'chrome',
        build: buildName,
    });
    multiCapabilities.push({
        browserName: 'firefox',
        build: buildName,
    });
    multiCapabilities.push({
        browserName: 'internet explorer',
        build: buildName,
    });
    multiCapabilities.push({
        browserName: 'safari',
        build: buildName,
    });
}


if (suite === 'release') {
    multiCapabilities.push({
        browserName: 'chrome',
        build: buildName,
    });
    multiCapabilities.push({
        browserName: 'firefox',
        build: buildName,
    });
    multiCapabilities.push({
        browserName: 'internet explorer',
        build: buildName,
    });
}


const protractorOptions = {
    multiCapabilities,
    onPrepare() {
        jasmine.getEnv().addReporter(new SpecReporter({
            spec: {
                displayStacktrace: true,
            },
        }));

        if (dump) {
            jasmine.getEnv().addReporter(new JunitXmlReporter({
                savePath: dump,
                filePrefix: 'junit-e2e',
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
                const { password: key } = new URL(grid);

                localTunnel.start({ key }, (error) => {
                    if (error) {
                        console.error('BrowserStack local tunnel failed: ', error);
                        reject(error);
                    } else {
                        console.log('Connected BrowserStack\'s tunnel. Now testing...');
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

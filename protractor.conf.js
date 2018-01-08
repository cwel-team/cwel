/* global jasmine */
const yargs = require('yargs');
const { execSync } = require('child_process');
const { URL } = require('url');
const SpecReporter = require('jasmine-spec-reporter').SpecReporter;
const JunitXmlReporter = require('jasmine-reporters').JUnitXmlReporter;
const browserstack = require('browserstack-local');
const { version: buildVersion } = require('./package.json');

const { grid = '', suite, dump } = yargs.argv.params;
const isBrowserstack = grid.includes('browserstack');
const localTunnel = isBrowserstack ? new browserstack.Local() : null;
const buildBranch = process.env.bamboo_planRepository_branchName || execSync('git symbolic-ref --short -q HEAD').toString();
const buildCommit = process.env.bamboo_repository_revision_number || execSync('git rev-parse --short HEAD').toString();
const buildNumber = process.env.bamboo_buildNumber || 0;
const buildName = `cwel-e2e--${buildNumber}--[${buildVersion}]#${buildBranch}@${buildCommit}`;

const capabilities = [
    { browserName: 'chrome',                           suites: ['sense', 'local', 'develop', 'release'] },
    { browserName: 'chrome', version: '60',            suites: ['release'] },
    { browserName: 'firefox',                          suites: ['local', 'develop', 'release'] },
    { browserName: 'internet explorer', version: '11', suites: ['local', 'develop', 'release'] },
    { browserName: 'edge',                             suites: ['local', 'develop', 'release'] },
    { browserName: 'safari',                           suites: ['release'] },
];


const protractorOptions = {
    multiCapabilities: capabilities.filter(c => c.suites.includes(suite)).map((c) => {
        c.build = buildName;
        return c;
    }),
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
                const { password } = new URL(grid);

                console.log('Starting BrowserStack local tunnel');
                console.log(password);

                localTunnel.start({ key: password, verbose: 3, force: 'true' }, (error) => {
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
    protractorOptions.multiCapabilities.map((c) => {
        c['browserstack.local'] = true;
        return c;
    });
    protractorOptions.multiCapabilities.map((c) => {
        c['browserstack.debug'] = true;
        return c;
    });
}

module.exports.config = protractorOptions;

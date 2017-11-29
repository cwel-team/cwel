/* global jasmine */
const SpecReporter = require('jasmine-spec-reporter').SpecReporter;
const TestngReporter = require('./gulp/lib/test/jasmine-testng-reporter');

module.exports.config = {
    seleniumServerJar: './node_modules/protractor/node_modules/webdriver-manager/selenium/selenium-server-standalone-3.5.3.jar',
    capabilities: {
        browserName: 'chrome',
    },
    onPrepare() {
        jasmine.getEnv().addReporter(new SpecReporter({
            spec: {
                displayStacktrace: true,
            },
        }));

        return browser.getCapabilities().then((capabilities) => {
            jasmine.getEnv().addReporter(new TestngReporter({
                browserName: capabilities.get('browserName'),
                dumpPath: 'Cwel/.tmp/test/Test/e2e/report/testng.xml',
            }));
        });
    },
    jasmineNodeOpts: {
        print() { },
    },
};

/* global jasmine */
const yargs = require('yargs');
const SpecReporter = require('jasmine-spec-reporter').SpecReporter;
const JunitXmlReporter = require('jasmine-reporters').JUnitXmlReporter;

const { argv } = yargs;

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

        if (argv.params.dump) {
            jasmine.getEnv().addReporter(new JunitXmlReporter({
                savePath: 'Cwel/.tmp/test/Test/e2e/report',
            }));
        }
    },
    jasmineNodeOpts: {
        print() { },
    },
};

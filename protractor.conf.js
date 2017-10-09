/* global jasmine */
const SpecReporter = require('jasmine-spec-reporter').SpecReporter; // eslint-disable-line import/no-extraneous-dependencies

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
    },
    jasmineNodeOpts: {
        print() { },
    },
};

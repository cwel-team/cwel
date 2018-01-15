/* global jasmine */
const yargs = require('yargs');
const SpecReporter = require('jasmine-spec-reporter').SpecReporter;
const JunitXmlReporter = require('jasmine-reporters').JUnitXmlReporter;
const browserSync = require('browser-sync');
const url = require('url');

const { argv } = yargs;
const { protocol, hostname, port } = url.parse(argv.params.host);

module.exports.config = {
    seleniumServerJar: './node_modules/protractor/node_modules/webdriver-manager/selenium/selenium-server-standalone-3.5.3.jar',
    params: { protocol, hostname, port },
    capabilities: {
        browserName: 'chrome',
    },
    beforeLaunch() {
        if (hostname === 'localhost') {
            return new Promise((success, reject) => {
                try {
                    browserSync.create().init({
                        server: 'tmp/sandbox',
                        port,
                        open: false,
                        notify: {
                            styles: { display: 'none' },
                        },
                    }, () => success());
                } catch (e) {
                    reject(e);
                }
            });
        }

        return new Promise(s => s()); // this is to get eslint to shutup about no return
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
};

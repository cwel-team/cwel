const fs = require('fs');
const mkdirp = require('mkdirp');
const path = require('path');
const nunjucks = require('nunjucks');

/**
 * See https://jasmine.github.io/2.1/custom_reporter.html for jasmine
 * custom reporter API.
 */
module.exports = class TestngReporter {
    constructor(options) {
        const { browserName, dumpPath } = options;

        this.dumpPath = dumpPath;
        this.dump = {
            browserName,
            started: 0,
            passed: 0,
            failed: 0,
            skipped: 0,
            total: 0,
            suites: [],
        };
    }
    get currentSuite() {
        const last = this.dump.suites.length - 1;
        return this.dump.suites[last];
    }
    get currentSpec() {
        const last = this.currentSuite.specs.length - 1;
        return this.currentSuite.specs[last];
    }
    static hashit(str) {
        const codeSum = str.split('').map(c => c.charCodeAt(0)).reduce((sum, n) => sum + n, 0);

        return str.replace(/\s+/g, '')
        .split('')
        .map((c) => {
            const code = c.charCodeAt(0);
            const offset = code - 97;
            return (code - offset) + ((code + codeSum) % 26);
        })
        .map(n => String.fromCharCode(n))
        .slice(0, 32)
        .join('');
    }
    jasmineStarted() {
        this.dump.started = new Date();
    }
    suiteStarted(suiteInfo) {
        this.dump.suites.push({
            ...suiteInfo,
            specs: [],
        });
    }
    specStarted(specInfo) {
        specInfo.started = new Date();
        this.currentSuite.specs.push(specInfo);
    }
    specDone(specInfo) {
        Object.keys(specInfo).forEach((key) => {
            const val = specInfo[key];
            this.currentSpec[key] = val;
        });

        this.currentSpec.finished = new Date();
        this.currentSpec.duration = new Date(
            this.currentSpec.finished.valueOf() - this.currentSpec.started.valueOf());
        this.currentSpec.signature = TestngReporter.hashit(this.currentSpec.fullName);

        this.dump.total += 1;
        this.dump.passed += this.currentSpec.failedExpectations.length < 1 ? 1 : 0;
        this.dump.failed += this.currentSpec.failedExpectations.length > 0 ? 1 : 0;
        this.dump.skipped += this.currentSpec.pendingReason !== '' ? 1 : 0;
    }
    jasmineDone() {
        const xmlDump = nunjucks.render('gulp/lib/test/template/testng-report.tpl.html', this.dump);
        const dumpDirPath = path.parse(this.dumpPath).dir;

        mkdirp(dumpDirPath, () => {
            fs.writeFile(this.dumpPath, xmlDump, { encoding: 'utf-8' }, (err) => {
                if (err) {
                    throw err;
                }
                console.log(`jasmine-testng-reporter: report dumped to ${path.resolve(this.dumpPath)}`);
            });
        });
    }
};

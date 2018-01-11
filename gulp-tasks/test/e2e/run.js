const gulp              = require('gulp');                          // Task automator
const protractor        = require('gulp-protractor').protractor;    // End-to-end test framework for AngularJS
const yargs             = require('yargs');                         // Args

const { argv } = yargs
.option('dump', {
    type: 'string',
})
.option('host', {
    describe: 'target host on which e2e tests are executed: protocol://host.name:port/',
    default: 'http://localhost:3000/',
    type: 'string',
});
// const hostname = argv.host.replace(/\/$/, '');
const dumpDest = argv.dump || 'tmp/test/e2e/report';
const dumpArgs = dumpDest
? ['--params.dump', dumpDest]
: [];
const args = [
    '--params.host', argv.host,
    ...dumpArgs,
];


module.exports = done => gulp.src(['tmp/test/e2e/**/*.{e2e,pageobject}.js'])
.pipe(protractor({
    configFile: 'protractor.conf.js',
    args,
    keepAlive: true,
})).on('error', () => {
    done();
}).on('end', () => {
    done();
});

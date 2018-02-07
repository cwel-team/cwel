const eslint            = require('gulp-eslint');                   // JS linting
const gulp              = require('gulp');                          // Task automator
const gulpif            = require('gulp-if');                       // Conditionally run a task
const path              = require('path');                          // Core NodeJS lib
const plumber           = require('gulp-plumber');                  // Prevent errors from killing processes
const process           = require('process');                       // Core NodeJS lib
const yargs             = require('yargs');                         // Args

const { argv } = yargs;

/* eslint-disable */
const options = require(path.join(process.cwd(), 'gulp-lib', 'options'));
/* eslint-enable */

module.exports = () => gulp.src([
    '**/*.es',
    '**/*.js',
    '!node_modules/**',
    '!tmp/**/*',
    '!Sandbox/**/*',
    '!dist/**/*',
    '!Cwel/Vendor/**/*',
    '!Docs/Shared/Asset/Script/Vendor/**',
    '!Test/E2e/Vendor/**/*',
])
.pipe(gulpif(argv.chill, plumber(options.plumber)))
.pipe(eslint({
    fix: argv.fix,
}))
.pipe(eslint.format())
.pipe(gulpif(!argv.chill, eslint.failAfterError()))
.pipe(gulpif(argv.fix, gulp.dest('.')));

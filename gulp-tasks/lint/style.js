const gulp              = require('gulp');                          // Task automator
const gulpif            = require('gulp-if');                       // Conditionally run a task
const path              = require('path');                          // Core NodeJS lib
const plumber           = require('gulp-plumber');                  // Prevent errors from killing processes
const process           = require('process');                       // Core NodeJS lib
const stylelint         = require('gulp-stylelint');                // CSS linting
const yargs             = require('yargs');                         // Args

const { argv } = yargs;

/* eslint-disable */
const options = require(path.join(process.cwd(), 'gulp-lib', 'options'));
/* eslint-enable */

module.exports = () => gulp.src([
    '**/*.scss',
    '!dist/**',
    '!tmp/**',
    '!node_modules/**',
])
.pipe(gulpif(argv.chill, plumber(options.plumber)))
.pipe(stylelint({
    failAfterError: true,
    debug: true,
    reporters: [{
        formatter: 'string',
        console: true,
    }],
}));

const babel             = require('gulp-babel');                    // ES6 -> ES5
const gulp              = require('gulp');                          // Task automator
const gulpif            = require('gulp-if');                       // Conditionally run a task
const path              = require('path');                          // Core NodeJS lib
const plumber           = require('gulp-plumber');                  // Prevent errors from killing processes
const process           = require('process');                       // Core NodeJS lib
const sourcemaps        = require('gulp-sourcemaps');               // Generate sourcemaps
const yargs             = require('yargs');                         // Args

const argv = yargs.argv; // Parse process.argv with yargs

/* eslint-disable */
const options = require(path.join(process.cwd(), 'gulp', 'lib', 'util', 'options'));
/* eslint-enable */

const babelConfig = {
    presets: ['env', 'minify'],
    plugins: ['angularjs-annotate'],
};

module.exports = () => gulp.src([
    'Docs/Internal/Page/**/*.es',
    'Cwel/Component/**/*.es',
    'Cwel/Pattern/**/*.es',
])
.pipe(gulpif(argv.chill, plumber(options.plumber)))
.pipe(sourcemaps.init())
.pipe(babel(babelConfig))
.pipe(sourcemaps.write('.'))
.pipe(gulp.dest('tmp/docs/internal/page'));

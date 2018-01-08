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

gulp.task('sandbox-script', () => {
    return gulp.src([
        'sandbox/page/**/*.es',
        'cwel/component/**/*.es',
        'cwel/pattern/**/*.es'
    ])
    .pipe(gulpif(argv.chill, plumber(options.plumber)))
    .pipe(sourcemaps.init())
    .pipe(babel(babelConfig))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('tmp/sandbox/page'))
});
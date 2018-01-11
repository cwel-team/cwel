const autoprefixer      = require('gulp-autoprefixer');             // Automatically add vendor prefixes using caniuse.com data
const gulp              = require('gulp');                          // Task automator
const gulpif            = require('gulp-if');                       // Conditionally run a task
const path              = require('path');                          // Core NodeJS lib
const plumber           = require('gulp-plumber');                  // Prevent errors from killing processes
const process           = require('process');                       // Core NodeJS lib
const sass              = require('gulp-sass');                     // Compile SCSS into CSS
const sourcemaps        = require('gulp-sourcemaps');               // Generate sourcemaps
const yargs             = require('yargs');                         // Args

const argv = yargs.argv; // Parse process.argv with yargs

/* eslint-disable */
const options = require(path.join(process.cwd(), 'gulp', 'lib', 'util', 'options'));
/* eslint-enable */

module.exports = () => gulp.src([
    'Docs/Internal/Page/**/*.scss',
    'Docs/Internal/Shared/Asset/Style/**/*.scss',
])
.pipe(gulpif(argv.chill, plumber(options.plumber)))
.pipe(sourcemaps.init())
.pipe(sass())
.pipe(autoprefixer({
    browsers: ['last 30 versions'],
}))
.pipe(sourcemaps.write('.'))
.pipe(gulp.dest('tmp/docs/internal'));

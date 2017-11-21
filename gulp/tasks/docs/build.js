const autoprefixer      = require('gulp-autoprefixer');             // Automatically add vendor prefixes using caniuse.com data
const babel             = require('gulp-babel');                    // ES6 -> ES5
const del               = require('del');                           // Delete files and folders
const gulp              = require('gulp');                          // Task automator
const gulpif            = require('gulp-if');                       // Conditionally run a task
const gulpSequence      = require('gulp-sequence');                 // Specify order of tasks
const path              = require('path');                          // Core NodeJS lib
const plumber           = require('gulp-plumber');                  // Prevent errors from killing processes
const process           = require('process');                       // Core NodeJS lib
const sass              = require('gulp-sass');                     // Compile SCSS into CSS
const sourcemaps        = require('gulp-sourcemaps');               // Generate sourcemaps
const yargs             = require('yargs');                         // Args

const argv = yargs.argv; // parse process.argv with yargs

/* eslint-disable */
const options = require(path.join(process.cwd(), 'gulp', 'lib', 'util', 'options'));
/* eslint-enable */

const babelConfig = {
    presets: ['env', 'minify'],
    plugins: ['angularjs-annotate'],
};

const sassConfig = {
    precision: 8,
    includePaths: [
        'Cwel.Docs.Web/',
    ],
};


// @internal
gulp.task('cwel-docs-build', done => gulpSequence(
    'cwel-docs-build-script',
    'cwel-docs-build-style')(done));
// @internal
gulp.task('clean:cwel-docs-build', done => gulpSequence(
    'clean:cwel-docs-build-script',
    'clean:cwel-docs-build-style')(done));


// @internal
gulp.task('cwel-docs-build-script', () => gulp.src('Cwel.Docs.Web/FrontEnd/Scripts/**/*.es')
.pipe(gulpif(argv.chill, plumber(options.plumber)))
.pipe(sourcemaps.init())
.pipe(babel(babelConfig))
.pipe(sourcemaps.write('.'))
.pipe(gulp.dest('Cwel.Docs.Web/Assets/JS')));
// @internal
gulp.task('clean:cwel-docs-build-script', () => del(['Cwel.Docs.Web/Assets/JS/**/*.{js,js.map}']));


// @internal
gulp.task('cwel-docs-build-style', () => gulp.src('Cwel.Docs.Web/FrontEnd/Styles/**/*.scss')
.pipe(gulpif(argv.chill, plumber(options.plumber)))
.pipe(sourcemaps.init())
.pipe(sass(sassConfig))
.pipe(autoprefixer({
    browsers: ['last 30 versions'],
}))
.pipe(sourcemaps.write('.'))
.pipe(gulp.dest('Cwel.Docs.Web/Assets/CSS')));


// @internal
gulp.task('clean:cwel-docs-build-style', () => del(['Cwel.Docs.Web/Assets/CSS/**/*.{css,css.map}']));

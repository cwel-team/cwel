const babel             = require('gulp-babel');                    // ES6 -> ES5
const concat            = require('gulp-concat');                   // Concat files
const del               = require('del');                           // Delete files and folders
const gulp              = require('gulp');                          // Task automator
const gulpif            = require('gulp-if');                       // Conditionally run a task
const gulpSequence      = require('gulp-sequence');                 // Specify order of tasks
const order             = require('gulp-order');                    // Reorder a stream of files
const path              = require('path');                          // Core NodeJS lib
const plumber           = require('gulp-plumber');                  // Prevent errors from killing processes
const process           = require('process');                       // Core NodeJS lib
const sourcemaps        = require('gulp-sourcemaps');               // Generate sourcemaps
const uglify            = require('gulp-uglify');                   // Minification
const yargs             = require('yargs');                         // Args


const argv = yargs.argv; // parse process.argv with yargs
/* eslint-disable */
const options = require(path.join(process.cwd(), 'gulp', 'lib', 'util', 'options'));
/* eslint-enable */

const babelConfig = {
    presets: ['env', 'minify'],
    plugins: ['angularjs-annotate'],
};


// @internal
gulp.task('cwel-dist-script', done => gulpSequence(
    'cwel-dist-script-compile',
    'cwel-dist-script-bundle',
    'cwel-dist-script-includevendors')(done));
// @internal
gulp.task('clean:cwel-dist-script', done => gulpSequence(
    'clean:cwel-dist-script-compile',
    'clean:cwel-dist-script-bundle',
    'clean:cwel-dist-script-includevendors')(done));


// @internal
gulp.task('cwel-dist-script-compile', done => gulpSequence([
    'cwel-dist-script-main',
    'cwel-dist-script-component',
    'cwel-dist-script-pattern',
    'cwel-dist-script-service',
    'cwel-dist-script-vendor',
    'cwel-dist-script-vendor-concat',
])(done));
// @internal
gulp.task('clean:cwel-dist-script-compile', done => gulpSequence([
    'clean:cwel-dist-script-main',
    'clean:cwel-dist-script-component',
    'clean:cwel-dist-script-pattern',
    'clean:cwel-dist-script-service',
    'clean:cwel-dist-script-vendor',
    'clean:cwel-dist-script-vendor-concat',
])(done));


// @internal
gulp.task('cwel-dist-script-main', () => gulp.src('Cwel/src/Core/es/main.es')
.pipe(gulpif(argv.chill, plumber(options.plumber)))
.pipe(sourcemaps.init())
.pipe(babel(babelConfig))
.pipe(sourcemaps.write('.'))
.pipe(gulp.dest('Cwel/dist/Cwel/Core/js')));
// @internal
gulp.task('clean:cwel-dist-script-main', () => del(['Cwel/dist/Cwel/Core/js/main.{js,js.map}']));


// @internal
gulp.task('cwel-dist-script-component', () => gulp.src([
    'Cwel/src/Component/**/*.es',
    '!Cwel/src/Component/**/*.{spec,pageobject,e2e}.es',
])
.pipe(gulpif(argv.chill, plumber(options.plumber)))
.pipe(sourcemaps.init())
.pipe(babel(babelConfig))
.pipe(sourcemaps.write('.'))
.pipe(gulp.dest('Cwel/dist/Cwel/Component')));
// @internal
gulp.task('clean:cwel-dist-script-component', () => del(['Cwel/dist/Cwel/Component/**/*.{js,js.map}']));


// @internal
gulp.task('cwel-dist-script-pattern', () => gulp.src([
    'Cwel/src/Pattern/**/*.es',
    '!Cwel/src/Pattern/**/*.{spec,pageobject,e2e}.es',
])
.pipe(gulpif(argv.chill, plumber(options.plumber)))
.pipe(sourcemaps.init())
.pipe(babel(babelConfig))
.pipe(sourcemaps.write('.'))
.pipe(gulp.dest('Cwel/dist/Cwel/Pattern')));
// @internal
gulp.task('clean:cwel-dist-script-pattern', () => del(['Cwel/dist/Cwel/Pattern/**/*.{js,js.map}']));


// @internal
gulp.task('cwel-dist-script-service', () => gulp.src([
    'Cwel/src/Service/**/*.es',
    '!Cwel/src/Service/**/*.{spec,pageobject,e2e}.es',
])
.pipe(gulpif(argv.chill, plumber(options.plumber)))
.pipe(sourcemaps.init())
.pipe(concat('services.js'))
.pipe(babel(babelConfig))
.pipe(sourcemaps.write('.'))
.pipe(gulp.dest('Cwel/dist/Cwel')));
// @internal
gulp.task('clean:cwel-dist-script-service', () => del(['Cwel/dist/Cwel/services.{js,js.map}']));


// @internal
gulp.task('cwel-dist-script-vendor', () => gulp.src([
    'Cwel/src/Vendor/**/*.js',
])
.pipe(gulpif(argv.chill, plumber(options.plumber)))
.pipe(sourcemaps.init())
.pipe(uglify())
.pipe(sourcemaps.write('.'))
.pipe(gulp.dest('Cwel/dist/Cwel/Vendor')));
// @internal
gulp.task('clean:cwel-dist-script-vendor', () => del(['Cwel/dist/Cwel/Vendor/**/*.{js,js.map}']));


// @internal
gulp.task('cwel-dist-script-vendor-concat', () => gulp.src([
    'Cwel/src/Vendor/**/*.js',
])
.pipe(gulpif(argv.chill, plumber(options.plumber)))
.pipe(sourcemaps.init())
.pipe(concat('cwel-vendor.js'))
.pipe(uglify())
.pipe(sourcemaps.write('.'))
.pipe(gulp.dest('Cwel/dist/Cwel/')));
// @internal
gulp.task('clean:cwel-dist-script-vendor-concat', () => del(['Cwel/dist/Cwel/cwel-vendor.{js,js.map}']));

// @internal
gulp.task('cwel-dist-script-bundle', () => gulp.src([
    'Cwel/dist/Cwel/**/*.js',
    '!Cwel/dist/Cwel/Vendor/**/*.js',
    '!Cwel/dist/Cwel/cwel.js',
])
.pipe(order([
    'Core/js/main.js',
]))
.pipe(sourcemaps.init())
.pipe(concat('cwel.js'))
.pipe(sourcemaps.write('.'))
.pipe(gulp.dest('Cwel/dist/Cwel')));
// @internal
gulp.task('clean:cwel-dist-script-bundle', () => del(['Cwel/dist/Cwel/cwel.{js,js.map}']));


// @internal
gulp.task('cwel-dist-script-includevendors', () => gulp.src([
    'Cwel/dist/Cwel/Vendor/**/*.js',
    'Cwel/dist/Cwel/cwel.js',
])
.pipe(sourcemaps.init())
.pipe(concat('cwel-full.js'))
.pipe(sourcemaps.write('.'))
.pipe(gulp.dest('Cwel/dist/Cwel')));
// @internal
gulp.task('clean:cwel-dist-script-includevendors', () => del(['Cwel/dist/Cwel/cwel-full.{js,js.map}']));

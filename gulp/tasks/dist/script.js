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
gulp.task('cwel-dist-script-main', () => gulp.src('Cwel/Src/Script/main.es')
.pipe(gulpif(argv.chill, plumber(options.plumber)))
.pipe(sourcemaps.init())
.pipe(babel(babelConfig))
.pipe(sourcemaps.write('.'))
.pipe(gulp.dest('Cwel/Dist/Script')));
// @internal
gulp.task('clean:cwel-dist-script-main', () => del(['Cwel/Dist/Script/main.{js,js.map}']));


// @internal
gulp.task('cwel-dist-script-component', () => gulp.src([
    'Cwel/Src/Component/**/*.es',
    '!Cwel/Src/Component/**/*.{spec,pageobject,e2e}.es',
])
.pipe(gulpif(argv.chill, plumber(options.plumber)))
.pipe(sourcemaps.init())
.pipe(babel(babelConfig))
.pipe(sourcemaps.write('.'))
.pipe(gulp.dest('Cwel/Dist/Component')));
// @internal
gulp.task('clean:cwel-dist-script-component', () => del(['Cwel/Dist/Component/**/*.{js,js.map}']));


// @internal
gulp.task('cwel-dist-script-pattern', () => gulp.src([
    'Cwel/Src/Pattern/**/*.es',
    '!Cwel/Src/Pattern/**/*.{spec,pageobject,e2e}.es',
])
.pipe(gulpif(argv.chill, plumber(options.plumber)))
.pipe(sourcemaps.init())
.pipe(babel(babelConfig))
.pipe(sourcemaps.write('.'))
.pipe(gulp.dest('Cwel/Dist/Pattern')));
// @internal
gulp.task('clean:cwel-dist-script-pattern', () => del(['Cwel/Dist/Pattern/**/*.{js,js.map}']));


// @internal
gulp.task('cwel-dist-script-service', () => gulp.src([
    'Cwel/Src/Service/**/*.es',
    '!Cwel/Src/Service/**/*.{spec,pageobject,e2e}.es',
])
.pipe(gulpif(argv.chill, plumber(options.plumber)))
.pipe(sourcemaps.init())
.pipe(concat('services.js'))
.pipe(babel(babelConfig))
.pipe(sourcemaps.write('.'))
.pipe(gulp.dest('Cwel/Dist')));
// @internal
gulp.task('clean:cwel-dist-script-service', () => del(['Cwel/Dist/services.{js,js.map}']));


// @internal
gulp.task('cwel-dist-script-vendor', () => gulp.src([
    'Cwel/Src/Vendor/**/*.js',
])
.pipe(gulpif(argv.chill, plumber(options.plumber)))
.pipe(sourcemaps.init())
.pipe(uglify())
.pipe(sourcemaps.write('.'))
.pipe(gulp.dest('Cwel/Dist/Vendor')));
// @internal
gulp.task('clean:cwel-dist-script-vendor', () => del(['Cwel/Dist/Vendor/**/*.{js,js.map}']));


// @internal
gulp.task('cwel-dist-script-vendor-concat', () => gulp.src([
    'Cwel/Src/Vendor/**/*.js',
])
.pipe(gulpif(argv.chill, plumber(options.plumber)))
.pipe(sourcemaps.init())
.pipe(concat('cwel-vendor.js'))
.pipe(uglify())
.pipe(sourcemaps.write('.'))
.pipe(gulp.dest('Cwel/Dist/')));
// @internal
gulp.task('clean:cwel-dist-script-vendor-concat', () => del(['Cwel/Dist/cwel-vendor.{js,js.map}']));

// @internal
gulp.task('cwel-dist-script-bundle', () => gulp.src([
    'Cwel/Dist/**/*.js',
    '!Cwel/Dist/cwel-vendor.js',
    '!Cwel/Dist/Vendor/**/*.js',
    '!Cwel/Dist/cwel.js',
])
.pipe(order([
    'Script/main.js',
]))
.pipe(sourcemaps.init())
.pipe(concat('cwel.js'))
.pipe(sourcemaps.write('.'))
.pipe(gulp.dest('Cwel/Dist')));
// @internal
gulp.task('clean:cwel-dist-script-bundle', () => del(['Cwel/Dist/cwel.{js,js.map}']));


// @internal
gulp.task('cwel-dist-script-includevendors', () => gulp.src([
    'Cwel/Dist/Vendor/**/*.js',
    'Cwel/Dist/cwel.js',
])
.pipe(sourcemaps.init())
.pipe(concat('cwel-full.js'))
.pipe(sourcemaps.write('.'))
.pipe(gulp.dest('Cwel/Dist')));
// @internal
gulp.task('clean:cwel-dist-script-includevendors', () => del(['Cwel/Dist/cwel-full.{js,js.map}']));

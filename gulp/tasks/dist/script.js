const del = require('del');
const gulp = require('gulp');
const gulpSequence = require('gulp-sequence');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const order = require('gulp-order');
const uglify = require('gulp-uglify');

const babelConfig = {
    presets: ['env', 'minify'],
    plugins: ['angularjs-annotate'],
};


// @internal
gulp.task('cwel-dist-script', done => gulpSequence([
    'cwel-dist-script-main',
    'cwel-dist-script-component',
    'cwel-dist-script-pattern',
    'cwel-dist-script-service',
    'cwel-dist-script-vendor',
], 'cwel-dist-script-compile')(done));
// @internal
gulp.task('clean:cwel-dist-script', done => gulpSequence([
    'clean:cwel-dist-script-main',
    'clean:cwel-dist-script-component',
    'clean:cwel-dist-script-pattern',
    'clean:cwel-dist-script-service',
    'clean:cwel-dist-script-vendor',
    'clean:cwel-dist-script-compile',
])(done));


// @internal
gulp.task('cwel-dist-script-main', () => gulp.src('Cwel/src/Core/es/main.es')
.pipe(sourcemaps.init())
.pipe(babel(babelConfig))
.pipe(sourcemaps.write('.'))
.pipe(gulp.dest('Cwel/dist/Cwel/Core/js')));
// @internal
gulp.task('clean:cwel-dist-script-main', () => del(['Cwel/dist/Cwel/Core/js/main.js']));


// @internal
gulp.task('cwel-dist-script-component', () => gulp.src([
    'Cwel/src/Component/**/*.es',
    '!Cwel/src/Component/**/*.{spec,pageobject,e2e}.es',
])
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
.pipe(sourcemaps.init())
.pipe(uglify())
.pipe(sourcemaps.write('.'))
.pipe(gulp.dest('Cwel/dist/Cwel/Vendor')));
// @internal
gulp.task('clean:cwel-dist-script-vendor', () => del(['Cwel/dist/Cwel/Vendor/**/*.js']));


// @internal
gulp.task('cwel-dist-script-compile', () => gulp.src([
    'Cwel/dist/Cwel/**/*.js',
    '!Cwel/dist/Cwel/cwel.js',
])
.pipe(order([
    'Vendor/angularjs/angular.js',
    'Vendor/**/*.js',
    'Core/js/main.js',
]))
.pipe(concat('cwel.js'))
.pipe(gulp.dest('Cwel/dist/Cwel')));
// @internal
gulp.task('clean:cwel-dist-script-compile', () => del(['Cwel/dist/Cwel/cwel.js']));

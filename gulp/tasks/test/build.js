const del = require('del');
const gulp = require('gulp');
const gulpSequence = require('gulp-sequence');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');

const babelConfig = {
    presets: ['env'],
    plugins: ['angularjs-annotate'],
};


// @internal
gulp.task('cwel-test-build', done => gulpSequence([
    'cwel-test-build-component',
    'cwel-test-build-pattern',
    'cwel-test-build-service',
])(done));
// @internal
gulp.task('clean:cwel-test-build', done => gulpSequence([
    'clean:cwel-test-build-component',
    'clean:cwel-test-build-pattern',
    'clean:cwel-test-build-service',
])(done));


// @internal
gulp.task('cwel-test-build-component', () => gulp.src([
    'Cwel/src/Component/**/*.pageobject.es',
])
.pipe(sourcemaps.init())
.pipe(babel(babelConfig))
.pipe(sourcemaps.write('.'))
.pipe(gulp.dest('Cwel/dist/test/Cwel/Component')));
// @internal
gulp.task('clean:cwel-test-build-component', () => del(['Cwel/dist/test/Cwel/Component/**/*.{js,js.map}']));


// @internal
gulp.task('cwel-test-build-pattern', () => gulp.src([
    'Cwel/src/Pattern/**/*.pageobject.es',
])
.pipe(sourcemaps.init())
.pipe(babel(babelConfig))
.pipe(sourcemaps.write('.'))
.pipe(gulp.dest('Cwel/dist/test/Cwel/Pattern')));
// @internal
gulp.task('clean:cwel-test-build-pattern', () => del(['Cwel/dist/test/Cwel/Pattern/**/*.{js,js.map}']));


// @internal
gulp.task('cwel-test-build-service', () => gulp.src([
    'Cwel/src/Service/**/*.spec.es',
])
.pipe(sourcemaps.init())
.pipe(babel(babelConfig))
.pipe(sourcemaps.write('.'))
.pipe(gulp.dest('Cwel/dist/test/Cwel/Service')));
// @internal
gulp.task('clean:cwel-test-build-service', () => del(['Cwel/dist/test/Cwel/Service/**/*.{js,js.map}']));
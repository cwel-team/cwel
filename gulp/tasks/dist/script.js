const del = require('del');
const gulp = require('gulp');
const gulpSequence = require('gulp-sequence');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const concat = require('gulp-concat');

const babelConfig = {
    presets: ['env'],
    plugins: ['angularjs-annotate'],
};


// @internal
gulp.task('cwel-dist-script', done => gulpSequence([
    'cwel-dist-component-script',
    'cwel-dist-pattern-script',
    'cwel-dist-service-script',
])(done));
// @internal
gulp.task('cwel-clean-es', done => gulpSequence([
    'cwel-clean-component-es',
    'cwel-clean-pattern-es',
    'cwel-clean-service-es',
])(done));


// @internal
gulp.task('cwel-dist-component-es', () => gulp.src('Cwel/src/Component/**/*.es')
.pipe(sourcemaps.init())
.pipe(babel(babelConfig))
.pipe(sourcemaps.write('.'))
.pipe(gulp.dest('Cwel/dist/Cwel/Component')));
// @internal
gulp.task('cwel-clean-component-es', () => del(['Cwel/dist/Cwel/Component/**/*.{js,js.map}']));


// @internal
gulp.task('cwel-dist-pattern-es', () => gulp.src('Cwel/src/Pattern/**/*.es')
.pipe(sourcemaps.init())
.pipe(babel(babelConfig))
.pipe(sourcemaps.write('.'))
.pipe(gulp.dest('Cwel/dist/Cwel/Pattern')));
// @internal
gulp.task('cwel-clean-pattern-es', () => del(['Cwel/dist/Cwel/Pattern/**/*.{js,js.map}']));


// @internal
gulp.task('cwel-dist-service-es', () => gulp.src('Cwel/src/Service/**/*.es')
.pipe(sourcemaps.init())
.pipe(concat('services.js'))
.pipe(babel(babelConfig))
.pipe(sourcemaps.write('.'))
.pipe(gulp.dest('Cwel/dist/Cwel')));
// @internal
gulp.task('cwel-clean-service-es', () => del(['Cwel/dist/Cwel/services.{js,js.map}']));

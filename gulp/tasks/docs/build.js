const del = require('del');
const gulp = require('gulp');
const gulpSequence = require('gulp-sequence');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const babel = require('gulp-babel');

const babelConfig = {
    presets: ['env'],
    plugins: ['angularjs-annotate'],
};

const sassConfig = {
    precision: 8,
    includePaths: [
        'Cwel/dist/',
    ],
};


// @internal
gulp.task('cwel-docs-build', done => gulpSequence(
    'cwel-docs-build-script',
    'cwel-docs-build-style')(done));


// @internal
gulp.task('cwel-docs-build-script', () => gulp.src('Cwel.Docs.Web/Assets/es/**/*.es')
.pipe(sourcemaps.init())
.pipe(babel(babelConfig))
.pipe(sourcemaps.write('.'))
.pipe(gulp.dest('Cwel.Docs.Web/Assets/js')));
// @internal
gulp.task('clean:cwel-docs-build-script', () => del(['Cwel.Docs.Web/Assets/js/**/*.{js,js.map}']));


// @internal
gulp.task('cwel-docs-build-style', () => gulp.src('Cwel.Docs.Web/Assets/scss/**/*.scss')
.pipe(sourcemaps.init())
.pipe(sass(sassConfig))
.pipe(sourcemaps.write('.'))
.pipe(gulp.dest('Cwel.Docs.Web/Assets/css')));
// @internal
gulp.task('clean:cwel-docs-build-style', () => del(['Cwel.Docs.Web/Assets/css/**/*.{css,css.map}']));

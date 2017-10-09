const del = require('del');
const gulp = require('gulp');
const gulpSequence = require('gulp-sequence');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const babel = require('gulp-babel');
const gulpif = require('gulp-if');
const yargs = require('yargs');
const autoprefixer = require('gulp-autoprefixer');
const plumber = require('gulp-plumber');
const path = require('path');
const process = require('process');

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
gulp.task('clean:cwel-docs-build', done => gulpSequence(
    'clean:cwel-docs-build-script',
    'clean:cwel-docs-build-style')(done));


// @internal
gulp.task('cwel-docs-build-script', () => gulp.src('Cwel.Docs.Web/Assets/es/**/*.es')
.pipe(gulpif(argv.chill, plumber(options.plumber)))
.pipe(sourcemaps.init())
.pipe(babel(babelConfig))
.pipe(sourcemaps.write('.'))
.pipe(gulp.dest('Cwel.Docs.Web/Assets/js')));
// @internal
gulp.task('clean:cwel-docs-build-script', () => del(['Cwel.Docs.Web/Assets/js/**/*.{js,js.map}']));


// @internal
gulp.task('cwel-docs-build-style', () => gulp.src('Cwel.Docs.Web/Assets/scss/**/*.scss')
.pipe(gulpif(argv.chill, plumber(options.plumber)))
.pipe(sourcemaps.init())
.pipe(sass(sassConfig))
.pipe(autoprefixer({
    browsers: ['last 30 versions'],
}))
.pipe(sourcemaps.write('.'))
.pipe(gulp.dest('Cwel.Docs.Web/Assets/css')));
// @internal
gulp.task('clean:cwel-docs-build-style', () => del(['Cwel.Docs.Web/Assets/css/**/*.{css,css.map}']));

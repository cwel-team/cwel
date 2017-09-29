const del = require('del');
const gulp = require('gulp');
const gulpSequence = require('gulp-sequence');
const babel = require('gulp-babel');

const babelConfig = {
    presets: ['env'],
    plugins: ['angularjs-annotate'],
};


// @internal
gulp.task('cwel-docs-build', done => gulpSequence(
    'cwel-docs-build-script')(done));


// @internal
gulp.task('cwel-docs-build-script', () => gulp.src('Cwel.Docs.Web/Assets/es/**/*.es')
.pipe(babel(babelConfig))
.pipe(gulp.dest('Cwel.Docs.Web/Assets/js')));
// @internal
gulp.task('clean:cwel-docs-build-script', () => del(['Cwel.Docs.Web/Assets/js/**/*.js']));

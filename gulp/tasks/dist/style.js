const del = require('del');
const gulp = require('gulp');
const gulpSequence = require('gulp-sequence');


// @internal
gulp.task('cwel-dist-style', done => gulpSequence([
    'cwel-dist-component-style',
    'cwel-dist-pattern-style',
    'cwel-dist-core-style',
])(done));
gulp.task('cwel-clean-style', done => gulpSequence([
    'cwel-clean-component-style',
    'cwel-clean-pattern-style',
    'cwel-clean-core-style',
])(done));


// @internal
gulp.task('cwel-dist-component-style', () => gulp.src('Cwel/src/Component/**/*.scss')
.pipe(gulp.dest('Cwel/dist/Cwel/Component/')));
gulp.task('cwel-clean-component-style', () => del(['Cwel/dist/Cwel/Component/**/*.scss']));


// @internal
gulp.task('cwel-dist-pattern-style', () => gulp.src('Cwel/src/Pattern/**/*.scss')
.pipe(gulp.dest('Cwel/dist/Cwel/Pattern/')));
gulp.task('cwel-clean-pattern-style', () => del(['Cwel/dist/Cwel/Pattern/**/*.scss']));


// @internal
gulp.task('cwel-dist-core-style', () => gulp.src('Cwel/src/Core/**/*.scss')
.pipe(gulp.dest('Cwel/dist/Cwel/Core/')));
gulp.task('cwel-clean-core-style', () => del(['Cwel/dist/Cwel/Core/**/*.scss']));

const gulp = require('gulp');
const del = require('del');
const svgmin = require('gulp-svgmin');

// @internal
gulp.task('cwel-dist-img', () => gulp.src('Cwel/src/**/*.svg')
.pipe(svgmin())
.pipe(gulp.dest('Cwel/dist/Cwel')));
// @internal
gulp.task('clean:cwel-dist-img', () => del(['Cwel/dist/Cwel/**/*.svg']));

const gulp = require('gulp');
const del = require('del');


// @internal
gulp.task('cwel-dist-img', () => gulp.src('Cwel/src/**/*.svg')
.pipe(gulp.dest('Cwel/dist/Cwel')));
// @internal
gulp.task('clean:cwel-dist-img', () => del(['Cwel/dist/Cwel/**/*.svg']));

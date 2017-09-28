const gulp = require('gulp');
const del = require('del');


// @internal
gulp.task('cwel-dist-razor', () => gulp.src('Cwel/src/**/*.cshtml')
.pipe(gulp.dest('Cwel/dist/Cwel')));
// @internal
gulp.task('clean:cwel-dist-razor', () => del(['Cwel/dist/Cwel/**/*.cshtml']));

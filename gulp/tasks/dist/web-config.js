const del = require('del');
const gulp = require('gulp');


// @internal
gulp.task('cwel-dist-config', () => gulp.src('Cwel/src/web.config')
.pipe(gulp.dest('Cwel/dist/Cwel')));
// @internal
gulp.task('clean:cwel-dist-config', () => del(['Cwel/dist/Cwel/web.config']));

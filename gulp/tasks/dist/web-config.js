const del               = require('del');                           // Delete files and folders
const gulp              = require('gulp');                          // Task automator


// @internal
gulp.task('cwel-dist-config', () => gulp.src('Cwel/src/web.config')
.pipe(gulp.dest('Cwel/dist/Cwel')));
// @internal
gulp.task('clean:cwel-dist-config', () => del(['Cwel/dist/Cwel/web.config']));

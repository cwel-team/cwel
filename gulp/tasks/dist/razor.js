const del               = require('del');                           // Delete files and folders
const gulp              = require('gulp');                          // Task automator


// @internal
gulp.task('cwel-dist-razor', () => gulp.src('Cwel/src/**/*.cshtml')
.pipe(gulp.dest('Cwel/dist/Cwel')));
// @internal
gulp.task('clean:cwel-dist-razor', () => del(['Cwel/dist/Cwel/**/*.cshtml']));

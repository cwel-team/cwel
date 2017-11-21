const del               = require('del');                           // Delete files and folders
const gulp              = require('gulp');                          // Task automator


// @internal
gulp.task('cwel-dist-razor', () => gulp.src('Cwel/Src/**/*.cshtml')
.pipe(gulp.dest('Cwel/Dist')));
// @internal
gulp.task('clean:cwel-dist-razor', () => del(['Cwel/Dist/**/*.cshtml']));

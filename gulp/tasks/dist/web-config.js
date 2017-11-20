const del               = require('del');                           // Delete files and folders
const gulp              = require('gulp');                          // Task automator


// @internal
gulp.task('cwel-dist-config', () => gulp.src('Cwel/Src/web.config')
.pipe(gulp.dest('Cwel/Dist')));
// @internal
gulp.task('clean:cwel-dist-config', () => del(['Cwel/Dist/web.config']));

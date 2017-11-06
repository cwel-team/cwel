const del               = require('del');                           // Delete files and folders
const gulp              = require('gulp');                          // Task automator
const svgmin            = require('gulp-svgmin');                   // SVG cleaner


// @internal
gulp.task('cwel-dist-img', () => gulp.src('Cwel/src/**/*.svg')
.pipe(svgmin())
.pipe(gulp.dest('Cwel/dist/Cwel')));
// @internal
gulp.task('clean:cwel-dist-img', () => del(['Cwel/dist/Cwel/**/*.svg']));

const gulp = require('gulp');
const del = require('del');


// @internal
gulp.task('cwel-dist-img', () => gulp.src('Cwel/src/Core/img/**/*.svg')
.pipe(gulp.dest('Cwel/dist/Cwel/Core/img')));
// @internal
gulp.task('clean:cwel-dist-img', () => del(['Cwel/dist/Cwel/Core/img/**/*.svg']));

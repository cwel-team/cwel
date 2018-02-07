const gulp = require('gulp');

module.exports = () => gulp.src('Cwel/Component/**/*.{html,scss,es}')
.pipe(gulp.dest('tmp/docs/Component'));

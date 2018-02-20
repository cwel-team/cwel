const gulp = require('gulp');

module.exports = () => gulp.src('cwel/component/**/*.{html,scss,es}')
.pipe(gulp.dest('tmp/docs/Component'));

const gulp              = require('gulp');                          // Task automator

module.exports = () => gulp.src([
    'sandbox/page/**/*.html',
    'cwel/component/**/*.html',
    'cwel/pattern/**/*.html',
])
.pipe(gulp.dest('tmp/sandbox/page'));

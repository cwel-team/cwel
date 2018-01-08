const gulp              = require('gulp');                          // Task automator

module.exports = () => gulp.src([
    'Docs/Internal/Page/**/*.html',
    'Cwel/Component/**/*.html',
    'Cwel/Pattern/**/*.html',
])
.pipe(gulp.dest('tmp/docs/internal/page'));

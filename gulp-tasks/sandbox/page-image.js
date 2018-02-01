const gulp              = require('gulp');                          // Task automator

module.exports = () => gulp.src([
    'sandbox/**/*.png',
    'sandbox/**/*.jpg',
    'sandbox/**/*.svg',
])
.pipe(gulp.dest('tmp/sandbox'));

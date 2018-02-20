const gulp              = require('gulp');                          // Task automator

module.exports = () => gulp.src([
    'docs/shared/asset/**/*.png',
    'docs/shared/asset/**/*.jpg',
    'docs/shared/asset/**/*.svg',
])
.pipe(gulp.dest('tmp/docs/shared/asset'));

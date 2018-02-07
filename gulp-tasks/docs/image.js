const gulp              = require('gulp');                          // Task automator

module.exports = () => gulp.src([
    'Docs/Shared/Asset/**/*.png',
    'Docs/Shared/asset/**/*.jpg',
    'Docs/Shared/Asset/**/*.svg',
])
.pipe(gulp.dest('tmp/docs/shared/asset'));

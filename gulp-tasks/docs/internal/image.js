const del               = require('del');                           // Delete files and folders
const gulp              = require('gulp');                          // Task automator

module.exports = () => del([
    'Docs/Internal/Shared/Asset/**/*.png',
    'Docs/Internal/Shared/Asset/**/*.jpg',
    'Docs/Internal/Shared/Asset/**/*.svg',
]);

module.exports = () => gulp.src([
    'Docs/Internal/Shared/Asset/**/*.png',
    'Docs/Internal/Shared/asset/**/*.jpg',
    'Docs/Internal/Shared/Asset/**/*.svg',
])
.pipe(gulp.dest('tmp/docs/internal/shared/asset'))
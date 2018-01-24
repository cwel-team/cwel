const del               = require('del');                           // Delete files and folders
const gulp              = require('gulp');                          // Task automator

module.exports = () => del([
    'docs/internal/shared/asset/**/*.png',
    'docs/internal/shared/asset/**/*.jpg',
    'ocs/internal/shared/asset/**/*.svg',
]);

module.exports = () => gulp.src([
    'docs/internal/shared/asset/**/*.png',
    'docs/internal/shared/asset/**/*.jpg',
    'docs/internal/shared/asset/**/*.svg',
])
.pipe(gulp.dest('tmp/docs/internal/shared/asset'))
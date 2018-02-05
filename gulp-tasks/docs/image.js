const del               = require('del');                           // Delete files and folders
const gulp              = require('gulp');                          // Task automator

module.exports = () => del([
    'Docs/Shared/Asset/**/*.png',
    'Docs/Shared/Asset/**/*.jpg',
    'Docs/Shared/Asset/**/*.svg',
]);

module.exports = () => gulp.src([
    'Docs/Shared/Asset/**/*.png',
    'Docs/Shared/asset/**/*.jpg',
    'Docs/Shared/Asset/**/*.svg',
])
.pipe(gulp.dest('tmp/docs/shared/asset'))
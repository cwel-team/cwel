const del               = require('del');                           // Delete files and folders
const gulp              = require('gulp');                          // Task automator

module.exports = () => del([
    'sandbox/page/**/*.png',
    'sandbox/page/**/*.jpg',
    'sandbox/page/**/*.svg',
]);

module.exports = () => gulp.src([
    'sandbox/page/**/*.png',
    'sandbox/page/**/*.jpg',
    'sandbox/page/**/*.svg',
])
.pipe(gulp.dest('tmp/sandbox/prototype'))
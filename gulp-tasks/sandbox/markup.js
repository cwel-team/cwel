const del               = require('del');                           // Delete files and folders
const gulp              = require('gulp');                          // Task automator
const nunjucks          = require('gulp-nunjucks');

module.exports = () => del('tmp/sandbox/page/*.html');

module.exports = () => gulp.src([
    'sandbox/page/**/*.html',
    'sandbox/shared/**/*.html',
    'cwel/component/**/*.html',
    'cwel/pattern/**/*.html',
])
//.pipe(nunjucks())
.pipe(gulp.dest('tmp/sandbox'));

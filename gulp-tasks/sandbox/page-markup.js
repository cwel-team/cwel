const del               = require('del');                           // Delete files and folders
const gulp              = require('gulp');                          // Task automator
const nunjucksRender    = require('gulp-nunjucks-render');

module.exports = () => del('tmp/sandbox/page/*.html');

module.exports = () => gulp.src([
    'sandbox/page/**/*.njk',
])
.pipe(nunjucksRender({
    path: ['sandbox/shared/layout/'],
}))
.pipe(gulp.dest('tmp/sandbox'));

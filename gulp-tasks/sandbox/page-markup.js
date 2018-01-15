const del               = require('del');                           // Delete files and folders
const path              = require('path');
const gulp              = require('gulp');                          // Task automator
const nunjucksRender    = require('gulp-nunjucks-render');

const options = require(path.join(process.cwd(), '/gulp-lib/options')); // eslint-disable-line

module.exports = () => del('tmp/sandbox/page/*.html');

module.exports = () => gulp.src([
    'sandbox/page/**/*.njk',
])
.pipe(nunjucksRender({
    path: ['sandbox/shared/layout/', '.'],
    envOptions: options.nunjucks,
}))
.pipe(gulp.dest('tmp/sandbox'));

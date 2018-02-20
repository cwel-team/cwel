const path              = require('path');
const gulp              = require('gulp');                          // Task automator
const nunjucksRender    = require('gulp-nunjucks-render');

const options = require(path.join(process.cwd(), 'gulp-lib', 'options')); // eslint-disable-line

module.exports = () => gulp.src([
    'sandbox/**/*.njk',
    '!sandbox/shared/**/*.njk',
])
.pipe(nunjucksRender({
    path: ['sandbox/shared/layout/', '.'],
    envOptions: options.nunjucks,
}))
.pipe(gulp.dest('tmp/sandbox'));

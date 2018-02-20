const gulp              = require('gulp');                          // Task automator
const path              = require('path');
const renderPage        = require('../../gulp-lib/docs/render-page');

module.exports = () => gulp.src([
    'docs/**/*.{njk,html}',
])
.pipe(renderPage([
    path.join(process.cwd(), 'docs'),
    path.join(process.cwd(), 'cwel'),
]))
.pipe(gulp.dest('tmp/docs'));

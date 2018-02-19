const gulp              = require('gulp');                          // Task automator
const path              = require('path');
const renderPage        = require('../../gulp-lib/docs/render-page');

module.exports = () => gulp.src([
    'Docs/**/*.{njk,html}',
])
.pipe(renderPage([
    path.join(process.cwd(), 'Docs'),
    path.join(process.cwd(), 'Cwel'),
]))
.pipe(gulp.dest('tmp/docs'));

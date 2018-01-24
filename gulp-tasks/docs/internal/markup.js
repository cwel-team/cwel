const gulp              = require('gulp');                          // Task automator
const path              = require('path');
const renderPage        = require('../../../gulp-lib/docs/renderPage');

module.exports = () => gulp.src([
    'Docs/Internal/Page/**/*.doc.md',
    'Docs/Internal/**/**/*.njk',
    'Cwel/Component/**/*.html',
    'Cwel/Pattern/**/*.html',
])
.pipe(renderPage([
    path.join(process.cwd(), 'Docs', 'Internal'),
    path.join(process.cwd(), 'Cwel'),
]))
.pipe(gulp.dest('tmp/docs/internal'));

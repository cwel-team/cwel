const gulp = require('gulp');
const del = require('del');


// @internal
gulp.task('docs-copy', ['dist'], () => gulp.src([
    'Cwel/dist/Cwel/**',
])
.pipe(gulp.dest('Cwel.Docs.Web/Cwel')));
// @internal
gulp.task('docs-clean', () => del(['Cwel.Docs.Web/Cwel']));

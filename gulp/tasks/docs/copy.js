const gulp = require('gulp');
const gulpSequence = require('gulp-sequence');
const del = require('del');


// @internal
gulp.task('docs-copy', done => gulpSequence(
    'docs-copy-script',
    'docs-copy-style',
    'docs-copy-razor',
    'docs-copy-config')(done));
// @internal
gulp.task('clean:docs-copy', done => gulpSequence(
    'clean:docs-copy-script',
    'clean:docs-copy-style',
    'clean:docs-copy-config')(done));

// @internal
gulp.task('docs-copy-script', () => gulp.src(['Cwel/dist/Cwel/**/*.{js,js.map}'])
.pipe(gulp.dest('Cwel.Docs.Web/Cwel')));
// @internal
gulp.task('clean:docs-copy-script', () => del(['Cwel.Docs.Web/Cwel/**/*.{js,js.map}']));

// @internal
gulp.task('docs-copy-style', () => gulp.src('Cwel/dist/Cwel/**/*.scss')
.pipe(gulp.dest('Cwel.Docs.Web/Cwel')));
// @internal
gulp.task('clean:docs-copy-style', () => del(['Cwel.Docs.Web/Cwel/**/*.scss']));

// @internal
gulp.task('docs-copy-razor', () => gulp.src('Cwel/dist/Cwel/**/*.cshtml')
.pipe(gulp.dest('Cwel.Docs.Web/Cwel')));
// @internal
gulp.task('clean:docs-copy-razor', () => del(['Cwel.Docs.Web/Cwel/**/*.cshtml']));

// @internal
gulp.task('docs-copy-config', () => gulp.src('Cwel/dist/Cwel/web.config')
.pipe(gulp.dest('Cwel.Docs.Web/Cwel')));
// @internal
gulp.task('clean:docs-copy-config', () => del(['Cwel.Docs.Web/Cwel/web.config']));

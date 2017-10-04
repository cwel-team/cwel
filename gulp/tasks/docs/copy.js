const gulp = require('gulp');
const gulpSequence = require('gulp-sequence');
const del = require('del');


// @internal
gulp.task('cwel-docs-copy', done => gulpSequence(
    'cwel-docs-copy-script',
    'cwel-docs-copy-style',
    'cwel-docs-copy-razor',
    'cwel-docs-copy-json',
    'cwel-docs-copy-img',
    'cwel-docs-copy-config')(done));
// @internal
gulp.task('clean:cwel-docs-copy', done => gulpSequence(
    'clean:cwel-docs-copy-script',
    'clean:cwel-docs-copy-style',
    'clean:cwel-docs-copy-razor',
    'clean:cwel-docs-copy-json',
    'clean:cwel-docs-copy-img',
    'clean:cwel-docs-copy-config')(done));

// @internal
gulp.task('cwel-docs-copy-script', () => gulp.src(['Cwel/dist/Cwel/**/*.{js,js.map}'])
.pipe(gulp.dest('Cwel.Docs.Web/Cwel')));
// @internal
gulp.task('clean:cwel-docs-copy-script', () => del(['Cwel.Docs.Web/Cwel/**/*.{js,js.map}']));

// @internal
gulp.task('cwel-docs-copy-style', () => gulp.src('Cwel/dist/Cwel/**/*.scss')
.pipe(gulp.dest('Cwel.Docs.Web/Cwel')));
// @internal
gulp.task('clean:cwel-docs-copy-style', () => del(['Cwel.Docs.Web/Cwel/**/*.scss']));

// @internal
gulp.task('cwel-docs-copy-img', () => gulp.src('Cwel/dist/Cwel/**/*.svg')
.pipe(gulp.dest('Cwel.Docs.Web/Cwel')));
// @internal
gulp.task('clean:cwel-docs-copy-img', () => del(['Cwel.Docs.Web/Cwel/**/*.svg']));

// @internal
gulp.task('cwel-docs-copy-razor', () => gulp.src('Cwel/dist/Cwel/**/*.cshtml')
.pipe(gulp.dest('Cwel.Docs.Web/Cwel')));
// @internal
gulp.task('clean:cwel-docs-copy-razor', () => del(['Cwel.Docs.Web/Cwel/**/*.cshtml']));

// @internal
gulp.task('cwel-docs-copy-json', () => gulp.src('Cwel/src/**/*.json')
.pipe(gulp.dest('Cwel.Docs.Web/Cwel')));
// @internal
gulp.task('clean:cwel-docs-copy-json', () => del(['Cwel.Docs.Web/Cwel/**/*.json']));

// @internal
gulp.task('cwel-docs-copy-config', () => gulp.src('Cwel/dist/Cwel/web.config')
.pipe(gulp.dest('Cwel.Docs.Web/Cwel')));
// @internal
gulp.task('clean:cwel-docs-copy-config', () => del(['Cwel.Docs.Web/Cwel/web.config']));

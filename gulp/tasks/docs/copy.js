const del               = require('del');                           // Delete files and folders
const gulp              = require('gulp');                          // Task automator
const gulpSequence      = require('gulp-sequence');                 // Specify order of tasks


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
gulp.task('cwel-docs-copy-script', () => gulp.src(['Cwel/Dist/**/*.{js,js.map}'])
.pipe(gulp.dest('Cwel.Docs.Web/Cwel')));
// @internal
gulp.task('clean:cwel-docs-copy-script', () => del(['Cwel.Docs.Web/Cwel/**/*.{js,js.map}']));


// @internal
gulp.task('cwel-docs-copy-style', () => gulp.src([
    'Cwel/Dist/**/*.scss',
    'Cwel/Dist/cwel.{css,css.map}',
])
.pipe(gulp.dest('Cwel.Docs.Web/Cwel')));
// @internal
gulp.task('clean:cwel-docs-copy-style', () => del(['Cwel.Docs.Web/Cwel/**/*.scss']));


// @internal
gulp.task('cwel-docs-copy-img', () => gulp.src('Cwel/Dist/**/*.svg')
.pipe(gulp.dest('Cwel.Docs.Web/Cwel')));
// @internal
gulp.task('clean:cwel-docs-copy-img', () => del(['Cwel.Docs.Web/Cwel/**/*.svg']));


// @internal
gulp.task('cwel-docs-copy-razor', () => gulp.src('Cwel/Dist/**/*.cshtml')
.pipe(gulp.dest('Cwel.Docs.Web/Cwel')));
// @internal
gulp.task('clean:cwel-docs-copy-razor', () => del(['Cwel.Docs.Web/Cwel/**/*.cshtml']));


// @internal
gulp.task('cwel-docs-copy-json', () => gulp.src('Cwel/Src/**/*.json')
.pipe(gulp.dest('Cwel.Docs.Web/Cwel')));
// @internal
gulp.task('clean:cwel-docs-copy-json', () => del(['Cwel.Docs.Web/Cwel/**/*.json']));


// @internal
gulp.task('cwel-docs-copy-config', () => gulp.src('Cwel/Dist/web.config')
.pipe(gulp.dest('Cwel.Docs.Web/Cwel')));
// @internal
gulp.task('clean:cwel-docs-copy-config', () => del(['Cwel.Docs.Web/Cwel/web.config']));

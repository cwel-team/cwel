const gulp             = require('gulp');
const gulpSequence     = require('gulp-sequence');
const multiSync        = require('./gulp-lib/browserSyncMulti');

require('gulp-task-loader')('gulp-tasks');

gulp.task('build', done => gulpSequence('cwel:build', 'test:build', 'sandbox:build', 'docs:internal:build')(done));

gulp.task('dev', done => gulpSequence('sandbox:build', 'docs:internal:build')(done));

gulp.task('sandbox', done => gulpSequence('sandbox:build')(done));

gulp.task('test-unit', done => gulpSequence('test:unit:build', 'test:unit:run')(done));

gulp.task('test-e2e', done => gulpSequence(['sandbox:build', 'test:e2e:build'], 'test:e2e:run')(done));

gulp.task('test-visual', done => gulpSequence(['sandbox:build', 'test:visual:run'])(done));

gulp.task('watch', ['dev'], (done) => {
    multiSync.init();

    // Watch Docs
    gulp.watch([
        'Docs/Internal/**/*.doc.md',
        'Docs/Internal/**/*.nunjucks',
    ], () => gulpSequence(
        'docs:internal:markup')(() => multiSync.reload()));
    gulp.watch([
        'Docs/Internal/**/*.scss',
    ], () => gulpSequence(
        'docs:internal:style')(() => multiSync.reload()));
    gulp.watch([
        'Docs/Internal/**/*.es',
    ], () => gulpSequence(
        'docs:internal:script')(() => multiSync.reload()));

    // Watch Sandbox
    gulp.watch([
        'Cwel/**/*.html',
        'Sandbox/**/*.njk',
    ], () => gulpSequence(
        'sandbox:markup')(() => multiSync.reload()));
    gulp.watch([
        'Cwel/**/*.scss',
        'Sandbox/**/*.scss',
    ], () => gulpSequence(
        'sandbox:style')(() => multiSync.reload()));
    gulp.watch([
        'Cwel/**/*.es',
        'Sandbox/**/*.es',
    ], () => gulpSequence(
        'sandbox:script')(() => multiSync.reload()));

    done();
});

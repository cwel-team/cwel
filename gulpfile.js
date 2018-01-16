/* eslint-disable */
const browserSync      = require('browser-sync');
// const doc              = require('gulp-task-doc').patchGulp();
const gulp             = require('gulp');
const gulpSequence     = require('gulp-sequence');
// const msbuild          = require('gulp-msbuild');
const yargs            = require('yargs');
const multiSync        = require('./gulp-lib/browserSyncMulti');

const argv = yargs.argv; // Parse process.argv with yargs

require('gulp-task-loader')('gulp-tasks');

gulp.task('build', done => gulpSequence('cwel:build', 'test:build', 'sandbox:build', 'docs:internal:build')(done));

gulp.task('dev', done => gulpSequence('sandbox:build', 'docs:internal:build')(done));

gulp.task('sandbox', done => gulpSequence('sandbox:build')(done));

gulp.task('watch', ['dev'], done => {

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
        'Cwel/**/**/*.html',
        'Sandbox/Page/**/*.njk',
        'Sandbox/Page/index.njk',
    ], () => gulpSequence(
        'sandbox:page-markup')(() => multiSync.reload()));
    gulp.watch([
        'Cwel/Page/**/*.scss',
        'Sandbox/Page/**/*.scss',
    ], () => gulpSequence(
        'sandbox:page-style',
        'sandbox:cwel-style')(() => multiSync.reload()));
    gulp.watch([
        'Cwel/Page/**/*.es',
        'Sandbox/Page/**/*.es',
    ], () => gulpSequence(
        'sandbox:page-script',
        'sandbox:cwel-script')(() => multiSync.reload()));

    done();
});


/*************************
* Old gulp tasks
************************/


/**
* Display this help
*/
// gulp.task('help', doc.help());


// @internal
// gulp.task('default', ['help']);


/**
* Check the solution's code style.
*/
// gulp.task('lint', done => gulpSequence('lint-script', 'lint-style')(done));


/**
* Perform analysis and generate reports.
*/
// gulp.task('analysis', done => gulpSequence('lint', 'cwel-analysis-cssstats-generate-data', 'cwel-analysis-cssstats-analyse-data')(done));


/**
* Build the whole project: packaging CWEL and generating docs.
*/
// gulp.task('build', done => gulpSequence('analysis', 'cwel-test-build', 'cwel-test-copy', 'cwel-dist', 'cwel-docs')(done));
/**
* Delete files created by build task
*/
// gulp.task('clean:build', done => gulpSequence('clean:cwel-dist', 'clean:cwel-docs')(done));


/**
* Run the front-end tests.
*/
// gulp.task('test', ['cwel-dist', 'cwel-test-build', 'cwel-test-copy'], done => gulpSequence('cwel-test-run')(done));


/**
* Create CWEL blueprint files for a component, pattern or service:
* e.g. Script, Razor, C# ViewModels, Test, Style, and Docs files
*/
// gulp.task('create', done => gulpSequence('cwel-create-duplo')(done));

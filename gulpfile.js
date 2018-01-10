/* eslint-disable */
const browserSync      = require('browser-sync');
// const doc              = require('gulp-task-doc').patchGulp();
const gulp             = require('gulp');
const gulpSequence     = require('gulp-sequence');
// const msbuild          = require('gulp-msbuild');
const yargs            = require('yargs');

const argv = yargs.argv; // Parse process.argv with yargs

require('gulp-task-loader')('gulp-tasks');

gulp.task('build', done => gulpSequence('docs:internal:build')(done));

gulp.task('watch', ['build'], done => {
    browserSync.init({
        server: 'tmp/docs/internal',
        serveStatic: [
            {
                route: '/internal-docs',
                dir: 'tmp/docs/internal',
            },
            {
                route: '/sandbox',
                dir: 'tmp/sandbox',
            }
        ],
        port: 3000,
        ui: {
            port: 3001,
        },
        notify: {
            styles: [
                'display: none',
                'z-index: 9999',
                'position: fixed',
                'top: 0',
                'left: 0',
                'width: 100%',
                'margin: 0',
                'padding: 10px',
                'font-family: sans-serif',
                'font-size: 12px',
                'text-align: center',
                'color: #fff',
                'background-color: #2a2a2a',
            ],
        },
        // Time, in milliseconds, to wait before instructing the browser to
        // reload/inject following a file change event.
        // reloadDelay: 1000,
        // Wait for a specified window of event-silence before sending any reload events.
        // reloadDebounce: 3000,
        // Emit only the first event during sequential time windows of a specified duration.
        // reloadThrottle: 3000,
    });

    gulp.watch([
        'Docs/Internal/**/*.doc.md',
        'Docs/Internal/**/*.nunjucks',
    ], ['docs:internal:markup'], () => browserSync.reload());
    gulp.watch([
        'Docs/Internal/**/*.scss',
    ], ['docs:internal:style'], () => browserSync.reload());
    gulp.watch([
        'Docs/Internal/**/*.es',
    ], ['docs:internal:script'], () => browserSync.reload());

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


/**
 * Run MSBuild on this solution
 */
// gulp.task('msbuild', () => gulp.src('./Cwel.sln')
// .pipe(msbuild({
//     toolsVersion: 'auto',
// })));

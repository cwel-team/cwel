const gulp = require('gulp');
const doc = require('gulp-task-doc').patchGulp(); // @TODO(Daniel Stuessy) put this in 'help' task to improve gulp startup speed
const gulpSequence = require('gulp-sequence');
const gulpMultiProcess = require('gulp-multi-process');
const eslint = require('gulp-eslint');
const gulpif = require('gulp-if');
const yargs = require('yargs');
const msbuild = require('gulp-msbuild');
const multiSync = require('./gulp/lib/util/browserSyncMulti');

const argv = yargs.argv; // parse process.argv with yargs

require('./gulp/tasks/dist/script.js');
require('./gulp/tasks/dist/style.js');
require('./gulp/tasks/dist/web-config.js');
require('./gulp/tasks/test/build.js');
require('./gulp/tasks/docs/generate.js');
require('./gulp/tasks/docs/copy.js');

// require('./gulp/tasks/copy.js');
// require('./gulp/tasks/create.js');
// require('./gulp/tasks/test.js');

/**
 * Display this help
 */
gulp.task('help', doc.help());

/**
 * @internal
 */
gulp.task('default', ['help']);

/**
 * Build and copy all relevant CWEL files into the distribution folder
 */
gulp.task('cwel-dist', done => gulpSequence('cwel-dist-script', 'cwel-dist-style', 'cwel-dist-config')(done));
/**
 * Clean the CWEL distribution folder
 */
gulp.task('clean:cwel-dist', done => gulpSequence('clean:cwel-dist-script', 'clean:cwel-dist-style', 'clean:cwel-dist-config')(done));

/**
 * Run CWEL tests
 */
gulp.task('cwel-test', done => gulpSequence('cwel-test-build')(done));

/**
 * Generate CWEL documentation pages
 */
gulp.task('docs', done => gulpSequence('docs-copy', 'docs-generate')(done));
/**
 * Clean the CWEL documentation files and code in the docs project
 */
gulp.task('clean:docs', done => gulpSequence('clean:docs-copy', 'clean:docs-generate')(done));

/**
 * Build Csharp for solution
 */
gulp.task('build-csharp', () => gulp.src('./Cwo.EpiServer.sln')
.pipe(msbuild({
    toolsVersion: 'auto',
})));

/**
 * Check the project's code style.
 */
gulp.task('lint', () => {
    return gulp.src([
        '**/*.es',
        '**/*.js',
        '!node_modules/**',
        '!gulp/cwomponent/template/**',
        '!Cwo.Docs.Web/Cwomponents/**/*.js',
        '!Cwo.Docs.Web/Assets/**/*.js',
        '!Cwo.Cms/Cwomponents/**/*.js',
        '!Cwo.Cms/Assets/**/*.js',
        '!Cwomponents/dist/**/*.js',
    ])
    .pipe(eslint({
        fix: argv.fix,
    }))
    .pipe(eslint.format())
    .pipe(gulpif(!argv.chill, eslint.failAfterError()))
    .pipe(gulpif(argv.fix, gulp.dest('.')));
});

/**
 * Run the front-end tests. e.g. unit and e2e
 */
gulp.task('test', (done) => {
    // Using gulp-multi-process module to run karma in a child process of its own.
    // It turns out Karma seems to exit the main process it
    // runs on -- i.e. the gulp process -- making it
    // impossible to execute alongside other gulp tasks.
    gulpMultiProcess(['cwomponents-e2e', 'cwomponents-unit'], (exitCode) => {
        if (exitCode !== 0) {
            throw Error('Tests processes returned non zero exit code');
        }
        done();
    });
});

/**
 * Auto-build FED code as you are working on it.
 */
gulp.task('watch', ['build'], () => {
    argv.chill = true;

    multiSync.init();

    gulp.watch('Cwomponents/**/docs.md', ['docs']);

    gulp.watch('Cwomponents/**/*.es', () => gulpSequence(
        'lint',
        'docs',
        'clean-cwomponents-dist-js',
        'clean-docs-cwomponents-js',
        'clean-cms-cwomponents-js',
        'build-cwomponents-es',
        'build-cwomponents-services',
        'copy-cwomponent-js')(() => multiSync.reload()));
    gulp.watch('Cwomponents/**/*.cshtml', () => gulpSequence(
        'clean-cms-cwomponents-razor',
        'clean-docs-cwomponents-razor',
        'copy-cwomponent-razor')(() => multiSync.reload()));
    gulp.watch('Cwomponents/**/*.json', () => gulpSequence(
        'clean-cms-cwomponents-json',
        'clean-docs-cwomponents-json',
        'copy-cwomponent-json')(() => multiSync.reload()));
    gulp.watch([
        'Cwomponents/**/*.scss',
        'Cwo.Docs.Web/**/*.scss',
        'Cwo.Cms/**/*.scss',
    ], () => gulpSequence('clean-docs-css', 'clean-cms-css', ['build-docs-scss', 'build-cms-scss'])(() => multiSync.reload()));
});

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
require('./gulp/tasks/dist/razor.js');
require('./gulp/tasks/dist/web-config.js');
require('./gulp/tasks/test/build.js');
require('./gulp/tasks/docs/generate.js');
require('./gulp/tasks/docs/copy.js');
require('./gulp/tasks/docs/build.js');
require('./gulp/tasks/create.js');

/**
 * Display this help
 */
gulp.task('help', doc.help());


// @internal
gulp.task('default', ['help']);


/**
 * Build and copy all relevant CWEL files into the distribution folder
 */
gulp.task('cwel-dist', done => gulpSequence('cwel-dist-script', 'cwel-dist-style', 'cwel-dist-razor', 'cwel-dist-config')(done));
/**
 * Clean the CWEL distribution folder
 */
gulp.task('clean:cwel-dist', done => gulpSequence('clean:cwel-dist-script', 'clean:cwel-dist-style', 'clean:cwel-dist-razor', 'clean:cwel-dist-config')(done));


/**
 * Run CWEL tests
 */
gulp.task('cwel-test', done => gulpSequence('cwel-test-build')(done));
/**
 * Clean the CWEL test files created by the cwel-test task
 */
gulp.task('clean:cwel-test', done => gulpSequence('clean:cwel-test-build')(done));


/**
 * Generate CWEL documentation pages
 */
gulp.task('cwel-docs', ['cwel-dist'], done => gulpSequence('cwel-docs-copy', 'cwel-docs-generate', 'cwel-docs-build')(done));
/**
 * Clean the CWEL documentation files and code in the docs project
 */
gulp.task('clean:cwel-docs', done => gulpSequence('clean:cwel-docs-copy', 'clean:cwel-docs-generate', 'clean:cwel-docs-build')(done));


/**
 * Create cwomponent blueprint files where needed:
 * e.g. Script, Razor, C# ViewModels, Test, Style, and Docs files
 */
gulp.task('cwel-create', done => gulpSequence('cwel-create-duplo')(done));


/**
 * Run MSBuild on this solution
 */
gulp.task('msbuild', () => gulp.src('./Cwo.EpiServer.sln')
.pipe(msbuild({
    toolsVersion: 'auto',
})));


/**
 * Check the solution's code style.
 */
gulp.task('lint', () => {
    return gulp.src([
        '**/*.es',
        '**/*.js',
        '!node_modules/**',
        '!gulp/cwomponent/template/**',
        '!Cwel.Docs.Web/Cwel/**/*.js',
        '!Cwel.Docs.Web/Assets/**/*.js',
        '!Cwel/dist/**/*.js',
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
 * @internal
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

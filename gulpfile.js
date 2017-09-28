const gulp = require('gulp');
const doc = require('gulp-task-doc').patchGulp(); // @TODO(Daniel Stuessy) put this in 'help' task to improve gulp startup speed
const gulpSequence = require('gulp-sequence');
const gulpMultiProcess = require('gulp-multi-process');
const eslint = require('gulp-eslint');
const gulpif = require('gulp-if');
const yargs = require('yargs');
const msbuild = require('gulp-msbuild');
const generateDocs = require('./gulp/lib/docs/generate.js');
const csdoc = require('./gulp/lib/docs/csharp/csdoc.js');
const multiSync = require('./gulp/lib/util/browserSyncMulti');

require('./gulp/tasks/dist/script.js');
require('./gulp/tasks/dist/style.js');
require('./gulp/tasks/docs/build.js');

require('./gulp/tasks/copy.js');
require('./gulp/tasks/create.js');
require('./gulp/tasks/test.js');

const argv = yargs.argv; // parse process.argv with yargs

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
gulp.task('dist', done => gulpSequence('dist')(done));

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
 * Clean up all files resulting from the build -- including those copied
 * i.e. undo the `gulp build` task
 */
gulp.task('clean', done => gulpSequence(['clean-cwomponents', 'clean-vendors', 'clean-js', 'clean-css'])(done));

/**
 * The general build process invoking sub commands: linting, cleaning, building,
 * and copying of the Cwomponents and each site's indigenous front-end code.
 * NOTE all command options applied here are inherited by all sub commands.
 */
gulp.task('build-old', done => gulpSequence(
    'lint', 'clean',
    ['docs', 'build-docs-js', 'build-cms-js', 'build-cwomponents-es', 'build-cwomponents-services'],
    ['copy', 'build-docs-scss', 'build-cms-scss'])(done));

gulp.task('build', done => gulpSequence(
  'lint',
  ['build-es'])(done));

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

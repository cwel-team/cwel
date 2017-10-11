const gulp = require('gulp');
const doc = require('gulp-task-doc').patchGulp(); // @TODO(Daniel Stuessy) put this in 'help' task to improve gulp startup speed
const gulpSequence = require('gulp-sequence');
const gulpMultiProcess = require('gulp-multi-process');
const eslint = require('gulp-eslint');
// const stylelint = require('gulp-stylelint');
const gulpif = require('gulp-if');
const yargs = require('yargs');
const browserSync = require('browser-sync');
const msbuild = require('gulp-msbuild');
const plumber = require('gulp-plumber');
const path = require('path');
const process = require('process');

const argv = yargs.argv; // parse process.argv with yargs
/* eslint-disable */
const options = require(path.join(process.cwd(), 'gulp', 'lib', 'util', 'options'));
/* eslint-enable */


require('./gulp/tasks/dist/script.js');
require('./gulp/tasks/dist/style.js');
require('./gulp/tasks/dist/razor.js');
require('./gulp/tasks/dist/img.js');
require('./gulp/tasks/dist/web-config.js');

require('./gulp/tasks/test/build.js');
require('./gulp/tasks/test/copy.js');
require('./gulp/tasks/test/run.js');

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
gulp.task('cwel-dist', done => gulpSequence(
    'cwel-dist-script',
    'cwel-dist-style',
    'cwel-dist-razor',
    'cwel-dist-img',
    'cwel-dist-config')(done));
/**
 * Clean the CWEL distribution folder
 */
gulp.task('clean:cwel-dist', done => gulpSequence(
    'clean:cwel-dist-script',
    'clean:cwel-dist-style',
    'clean:cwel-dist-razor',
    'clean:cwel-dist-img',
    'clean:cwel-dist-config')(done));


/**
 * Run CWEL tests
 */
gulp.task('cwel-test', done => gulpSequence('cwel-test-build', 'cwel-test-copy', 'cwel-test-run')(done));
/**
 * Clean the CWEL test files created by the cwel-test task
 */
gulp.task('clean:cwel-test', done => gulpSequence('clean:cwel-test-build')(done));


/**
 * Generate CWEL documentation pages
 */
gulp.task('cwel-docs', done => gulpSequence('cwel-docs-copy', 'cwel-docs-generate', 'cwel-docs-build')(done));
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
gulp.task('msbuild', () => gulp.src('./Cwel.sln')
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
        '!gulp/lib/create/template/**',
        '!Cwel.Docs.Web/Cwel/**/*.js',
        '!Cwel.Docs.Web/Assets/**/*.js',
        '!Cwel/src/Vendor/**/*.js',
        '!Cwel/src/Testing/vendor/**/*.js',
        '!Cwel/dist/**/*.js',
    ])
    .pipe(gulpif(argv.chill, plumber(options.plumber)))
    .pipe(eslint({
        fix: argv.fix,
    }))
    .pipe(eslint.format())
    .pipe(gulpif(!argv.chill, eslint.failAfterError()))
    .pipe(gulpif(argv.fix, gulp.dest('.')));
});


// gulp.task('stylelint', () => {
//     return gulp.src([
//         '**/*.scss',
//         '!node_modules/**',
//     ])
//     .pipe(gulpif(argv.chill, plumber(options.plumber)))
//     .pipe(stylelint({
//         failAfterError: true,
//         debug: true,
//         reporters: [{
//             formatter: 'string',
//             console: true,
//         }],
//     }));
// });

/**
 * Build the whole project: packaging CWEL and generating docs.
 */
gulp.task('build', done => gulpSequence('lint', /* 'stylelint', */ 'cwel-dist', 'cwel-docs')(done));

/**
 * Run the front-end tests. e.g. unit and e2e
 * @internal
 */
gulp.task('test', ['cwel-dist', 'cwel-test-build'], (done) => {
    // Using gulp-multi-process module to run karma in a child process of its own.
    // It turns out Karma seems to exit the main process it
    // runs on -- i.e. the gulp process -- making it
    // impossible to execute alongside other gulp tasks.
    gulpMultiProcess(['cwel-test-run-e2e', 'cwel-test-run-unit'], (exitCode) => {
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

    browserSync.init({
        proxy: 'docs.cwel.local',
        port: 3000,
        ui: {
            port: 3001,
        },
    });

    // Cwel source
    gulp.watch('Cwel/src/**/*.doc.md', () => gulpSequence(
        'cwel-docs-generate')(() => browserSync.reload()));
    gulp.watch([
        'Cwel/src/**/*.es',
        '!Cwel/src/**/*.pageobject.es',
        '!Cwel/src/**/*.e2e.es',
        '!Cwel/src/**/*.spec.es',
    ], () => gulpSequence(
        'lint',
        /* 'stylelint', */
        'cwel-dist-script',
        'cwel-docs-copy-script',
        'cwel-docs-build-script',
        'cwel-docs-generate')(() => browserSync.reload()));
    gulp.watch('Cwel/src/**/*.{pageobject,spec,e2e}.es', () => gulpSequence(
        'cwel-test-build')(() => browserSync.reload()));
    gulp.watch('Cwel/src/**/*.cshtml', () => gulpSequence(
        'cwel-dist-razor',
        'cwel-docs-copy-razor',
        'cwel-docs-generate')(() => browserSync.reload()));
    gulp.watch('Cwel/src/**/*.json', () => gulpSequence(
        'cwel-docs-copy-json',
        'cwel-docs-generate')(() => browserSync.reload()));
    gulp.watch('Cwel/src/**/*.svg', () => gulpSequence(
        'cwel-dist-img',
        'cwel-docs-copy-img')(() => browserSync.reload()));
    gulp.watch('Cwel/src/**/*.scss', () => gulpSequence(
        'cwel-dist-style',
        'cwel-docs-copy-style',
        'cwel-docs-build-style',
        'cwel-docs-generate')(() => browserSync.reload()));

    // Cwel tests
    gulp.watch([
        'Cwel/src/**/*.pageobject.es',
        'Cwel/src/**/*.e2e.es',
        'Cwel/src/**/*.spec.es',
    ], () => gulpSequence('cwel-test-build'));

    // Docs site
    gulp.watch('Cwel.Docs.Web/Assets/scss/**/*.scss', () => gulpSequence(
        /* 'styleint', */
        'cwel-docs-build-style',
        'cwel-docs-generate')(() => browserSync.reload()));
    gulp.watch('Cwel.Docs.Web/Assets/img/**/*.{svg,png,jpg,jpeg}', () => browserSync.reload());
    gulp.watch('Cwel.Docs.Web/Assets/es/**/*.es', () => gulpSequence(
        'lint',
        'cwel-docs-build-script',
        'cwel-docs-generate')(() => browserSync.reload()));
});

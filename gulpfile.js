const browserSync      = require('browser-sync');
const doc              = require('gulp-task-doc').patchGulp();
const gulp             = require('gulp');
const gulpMultiProcess = require('gulp-multi-process');
const gulpSequence     = require('gulp-sequence');
const msbuild          = require('gulp-msbuild');
const yargs            = require('yargs');

const argv = yargs.argv; // Parse process.argv with yargs


require('./gulp/tasks/dist/dist');
require('./gulp/tasks/test/test');
require('./gulp/tasks/docs/docs');
require('./gulp/tasks/create');
require('./gulp/tasks/lint');


/**
 * Display this help
 */
gulp.task('help', doc.help());


// @internal
gulp.task('default', ['help']);


/**
 * Check the solution's code style.
 */
gulp.task('lint', done => gulpSequence('lint-script', 'lint-style')(done));


/**
 * Build the whole project: packaging CWEL and generating docs.
 */
gulp.task('build', done => gulpSequence('lint', 'cwel-test-build', 'cwel-test-copy', 'cwel-dist', 'cwel-docs')(done));
/**
 * Delete files created by build task
 */
gulp.task('clean:build', done => gulpSequence('clean:cwel-dist', 'clean:cwel-docs')(done));


/**
 * Run the front-end tests.
 */
gulp.task('test', ['cwel-dist', 'cwel-test-build', 'cwel-test-copy'], (done) => {
    /*
        Using `gulp-multi-process` module to run karma in a child process of its own.
        It turns out Karma seems to exit the main process it runs on -- i.e. the gulp process --
        making it impossible to execute alongside other gulp tasks.
    */
    gulpMultiProcess(['cwel-test-run-e2e', 'cwel-test-run-unit', 'cwel-test-run-visual'], (exitCode) => {
        if (exitCode !== 0) {
            throw Error('Tests processes returned non zero exit code');
        }
        done();
    });
});


/**
 * Create CWEL blueprint files for a component, pattern or service:
 * e.g. Script, Razor, C# ViewModels, Test, Style, and Docs files
 */
gulp.task('create', done => gulpSequence('cwel-create-duplo')(done));


/**
 * Run MSBuild on this solution
 */
gulp.task('msbuild', () => gulp.src('./Cwel.sln')
.pipe(msbuild({
    toolsVersion: 'auto',
})));


/**
 * Auto-build FED code as you are working on it.
 */
gulp.task('watch', done => gulpSequence('clean:build', 'build')(() => {
    argv.chill = true;

    browserSync.init({
        proxy: 'docs.cwel.local',
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
        reloadDelay: 1000,
    });

    // Cwel source
    gulp.watch([
        'Cwel/**/*.doc.md',
        'gulp/lib/docs/template/*.tpl.html',
    ], () => gulpSequence(
        'clean:cwel-docs-generate',
        'cwel-docs-generate')(() => browserSync.reload()));
    gulp.watch([
        'Cwel/Src/**/*.es',
        '!Cwel/Src/**/*.pageobject.es',
        '!Cwel/Src/**/*.e2e.es',
        '!Cwel/Src/**/*.spec.es',
    ], () => gulpSequence(
        'lint-script',
        'clean:cwel-dist-script',
        'clean:cwel-docs-copy-script',
        'clean:cwel-docs-build-script',
        'clean:cwel-docs-generate',
        'cwel-dist-script',
        'cwel-docs-copy-script',
        'cwel-docs-build-script',
        'cwel-docs-generate')(() => browserSync.reload()));
    gulp.watch('Cwel/Src/**/*.{pageobject,spec,e2e}.es', () => gulpSequence(
        'lint-script',
        'clean:cwel-test-build',
        'cwel-test-build')(() => browserSync.reload()));
    gulp.watch('Cwel/Src/**/*.cshtml', () => gulpSequence(
        'clean:cwel-dist-razor',
        'clean:cwel-docs-copy-razor',
        'clean:cwel-docs-generate',
        'cwel-dist-razor',
        'cwel-docs-copy-razor',
        'cwel-docs-generate')(() => browserSync.reload()));
    gulp.watch('Cwel/Src/**/*.json', () => gulpSequence(
        'clean:cwel-docs-copy-json',
        'clean:cwel-docs-generate',
        'cwel-docs-copy-json',
        'cwel-docs-generate')(() => browserSync.reload()));
    gulp.watch('Cwel/Src/**/*.svg', () => gulpSequence(
        'clean:cwel-dist-img',
        'clean:cwel-docs-copy-img',
        'cwel-dist-img',
        'cwel-docs-copy-img')(() => browserSync.reload()));
    gulp.watch('Cwel/Src/**/*.scss', () => gulpSequence(
        'lint-style',
        'clean:cwel-dist-style',
        'clean:cwel-docs-copy-style',
        'clean:cwel-docs-build-style',
        'clean:cwel-docs-generate',
        'cwel-dist-style',
        'cwel-docs-copy-style',
        'cwel-docs-build-style',
        'cwel-docs-generate')(() => (browserSync.reload())));

    // Cwel tests
    gulp.watch([
        'Cwel/Src/**/*.pageobject.es',
        'Cwel/Src/**/*.e2e.es',
        'Cwel/Src/**/*.spec.es',
    ], () => gulpSequence(
        'lint-script',
        'clean:cwel-test-build',
        'cwel-test-build'));

    // Docs site
    gulp.watch('Cwel.Docs.Web/FrontEnd/Style/**/*.scss', () => gulpSequence(
        'lint-style',
        'clean:cwel-docs-build-style',
        'clean:cwel-docs-generate',
        'cwel-docs-build-style',
        'cwel-docs-generate')(() => (browserSync.reload())));
    gulp.watch('Cwel.Docs.Web/FrontEnd/Script/**/*.es', () => gulpSequence(
        'lint-script',
        'clean:cwel-docs-build-script',
        'clean:cwel-docs-generate',
        'cwel-docs-build-script',
        'cwel-docs-generate')(() => browserSync.reload()));
    gulp.watch('Cwel/Src/Theme/**/*.{html,nunjucks}', () => gulpSequence(
        'clean:cwel-docs-generate',
        'cwel-docs-generate')(() => (browserSync.reload())));
    gulp.watch('Cwel.Docs.Web/**/*.cshtml', () => browserSync.reload());
    gulp.watch('Cwel.Docs.Web/Assets/img/**/*.{svg,png,jpg,jpeg}', () => browserSync.reload());

    done();
}));

const eslint            = require('gulp-eslint');                   // JS linting
const gulp              = require('gulp');                          // Task automator
const gulpif            = require('gulp-if');                       // Conditionally run a task
const path              = require('path');                          // Core NodeJS lib
const plumber           = require('gulp-plumber');                  // Prevent errors from killing processes
const process           = require('process');                       // Core NodeJS lib
const stylelint         = require('gulp-stylelint');                // CSS linting
const yargs             = require('yargs');                         // Args

const { argv } = yargs;


/* eslint-disable */
const options = require(path.join(process.cwd(), 'gulp', 'lib', 'util', 'options'));
/* eslint-enable */

// @internal
gulp.task('lint-script', () => {
    return gulp.src([
        '**/*.es',
        '**/*.js',
        '!node_modules/**',
        '!Cwel/Src/Vendor/**/*.js',
        '!Cwel/Src/Test/e2e/vendor/**/*.js',
        '!Cwel/Dist/**/*.js',
        '!Cwel/Docs/SCSS/**/*.js',
        '!Cwel/.tmp/**/*.js',
        '!gulp/lib/create/template/**',
        '!Cwel.Docs.Web/Cwel/**/*.js',
        '!Cwel.Docs.Web/Assets/**/*.js',
        '!Cwel.Docs.Web/FrontEnd/Template/sassdoc/**/*.js',
        '!gulp/lib/docs/cssstats/**/*.js',
    ])
    .pipe(gulpif(argv.chill, plumber(options.plumber)))
    .pipe(eslint({
        fix: argv.fix,
    }))
    .pipe(eslint.format())
    .pipe(gulpif(!argv.chill, eslint.failAfterError()))
    .pipe(gulpif(argv.fix, gulp.dest('.')));
});


// @internal
gulp.task('lint-style', () => {
    return gulp.src([
        '**/*.scss',
        '!Cwel/Dist/**',
        '!Cwel/Src/Vendor/**',
        '!Cwel.Docs.Web/Assets/css/**',
        '!Cwel.Docs.Web/Assets/vendor/**',
        '!Cwel.Docs.Web/Cwel/**',
        '!gulp/lib/create/template/**',
        '!node_modules/**',
    ])
    .pipe(gulpif(argv.chill, plumber(options.plumber)))
    .pipe(stylelint({
        failAfterError: true,
        debug: true,
        reporters: [{
            formatter: 'string',
            console: true,
        }],
    }));
});

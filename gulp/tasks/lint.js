const gulp = require('gulp');
const eslint = require('gulp-eslint');
const stylelint = require('gulp-stylelint');
const gulpif = require('gulp-if');
const plumber = require('gulp-plumber');
const yargs = require('yargs');
const path = require('path');
const process = require('process');

const { argv } = yargs;
const options = require(path.join(process.cwd(), 'gulp', 'lib', 'util', 'options')); // eslint-disable-line import/no-dynamic-require


// @internal
gulp.task('lint-script', () => {
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


// @internal
gulp.task('lint-style', () => {
    return gulp.src([
        '**/*.scss',
        '!Cwel/dist/**',
        '!Cwel/src/Vendor/**',
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

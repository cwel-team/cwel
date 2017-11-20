const autoprefixer      = require('gulp-autoprefixer');             // Automatically add vendor prefixes using caniuse.com data
const babel             = require('gulp-babel');                    // ES6 -> ES5
const del               = require('del');                           // Delete files and folders
const fs                = require('fs');                            // Core NodeJS lib
const gulp              = require('gulp');                          // Task automator
const gulpif            = require('gulp-if');                       // Conditionally run a task
const gulpSequence      = require('gulp-sequence');                 // Specify order of tasks
const path              = require('path');                          // Core NodeJS lib
const plumber           = require('gulp-plumber');                  // Prevent errors from killing processes
const process           = require('process');                       // Core NodeJS lib
const sass              = require('gulp-sass');                     // Compile SCSS into CSS
const sassdoc           = require('sassdoc');                       // Build dynamic CSS documentation based on comments
const sourcemaps        = require('gulp-sourcemaps');               // Generate sourcemaps
const yargs             = require('yargs');                         // Args

const argv = yargs.argv; // parse process.argv with yargs

/* eslint-disable */
const options = require(path.join(process.cwd(), 'gulp', 'lib', 'util', 'options'));
/* eslint-enable */

const babelConfig = {
    presets: ['env', 'minify'],
    plugins: ['angularjs-annotate'],
};

const sassConfig = {
    precision: 8,
    includePaths: [
        'Cwel.Docs.Web/',
    ],
};


// @internal
gulp.task('cwel-docs-build', done => gulpSequence(
    'cwel-docs-build-script',
    'cwel-docs-build-style',
    'cwel-docs-build-dynamic-scss-docs')(done));
// @internal
gulp.task('clean:cwel-docs-build', done => gulpSequence(
    'clean:cwel-docs-build-script',
    'clean:cwel-docs-build-style')(done));


// @internal
gulp.task('cwel-docs-build-script', () => gulp.src('Cwel.Docs.Web/Assets/es/**/*.es')
.pipe(gulpif(argv.chill, plumber(options.plumber)))
.pipe(sourcemaps.init())
.pipe(babel(babelConfig))
.pipe(sourcemaps.write('.'))
.pipe(gulp.dest('Cwel.Docs.Web/Assets/js')));
// @internal
gulp.task('clean:cwel-docs-build-script', () => del(['Cwel.Docs.Web/Assets/js/**/*.{js,js.map}']));


// @internal
gulp.task('cwel-docs-build-style', () => gulp.src('Cwel.Docs.Web/Assets/scss/**/*.scss')
.pipe(gulpif(argv.chill, plumber(options.plumber)))
.pipe(sourcemaps.init())
.pipe(sass(sassConfig))
.pipe(autoprefixer({
    browsers: ['last 30 versions'],
}))
.pipe(sourcemaps.write('.'))
.pipe(gulp.dest('Cwel.Docs.Web/Assets/css')));


// @internal
// gulp.task('cwel-docs-build-dynamic-scss-docs', () => gulp.src('Cwel/src/Core/scss/**/*.scss')
// .pipe(sassdoc.parse({
//     verbose: false,
//     theme: 'pheek',
//     dest: 'Cwel/Docs/SCSS/',
// }))).then((data) => {
//     console.log(data)
// })

gulp.task('cwel-docs-build-dynamic-scss-docs', () =>

    sassdoc.parse('Cwel/src/Core/scss/**/*.scss', {
        verbose: false,
        dest: 'Cwel/Docs/SCSS/',
    }).then((dataRaw) => {
        const data = JSON.stringify(dataRaw);
        fs.writeFile('Cwel/Docs/SCSS/scss.json', data, (err) => {
            if (err) console.log(err);
            console.log('File saved');
        });
    }));


// @internal
gulp.task('clean:cwel-docs-build-style', () => del(['Cwel.Docs.Web/Assets/css/**/*.{css,css.map}']));

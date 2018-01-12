const babel             = require('gulp-babel');                    // ES6 -> ES5
const del               = require('del');                           // Delete files and folders
const concat            = require('gulp-concat');
const gulp              = require('gulp');                          // Task automator
//const gulpeach          = require('gulp-foreach');
const gulpif            = require('gulp-if');                       // Conditionally run a task
const path              = require('path');                          // Core NodeJS lib
const plumber           = require('gulp-plumber');                  // Prevent errors from killing processes
const process           = require('process');                       // Core NodeJS lib
const rename            = require('gulp-rename');                   // Rename files
const sourcemaps        = require('gulp-sourcemaps');               // Generate sourcemaps
//const webpack           = require('webpack-stream');
const yargs             = require('yargs');                         // Args

const argv = yargs.argv; // Parse process.argv with yargs

/* eslint-disable */
const options = require(path.join(process.cwd(), 'gulp', 'lib', 'util', 'options'));
/* eslint-enable */

const babelConfig = {
    presets: ['env', 'minify'],
    plugins: ['angularjs-annotate'],
};

module.exports = () => del('tmp/sandbox/**/*.js');


// module.exports = () => gulp.src([
//     'sandbox/page/**/*.es',
//     'cwel/component/**/*.es',
//     'cwel/pattern/**/*.es',
// ])
// .pipe(gulpif(argv.chill, plumber(options.plumber)))
// .pipe(gulpeach((stream, file) => {
//     const p = path.parse(file.path);
//     const tailPath = file.path
//     .replace(file.base, '') // gulp base path
//     .replace(p.base, ''); // filename
//     const outputPath = path.resolve('tmp', 'sandbox', tailPath);
//     const outputName = p.base.replace(p.ext, '.js');

//     return stream
//     .pipe(webpack({
//         entry: file.path,
//         output: {
//             filename: outputName,
//         },
//         devtool: 'source-map',
//         resolve: {
//             extensions: ['.js', '.es'],
//         },
//         module: {
//             rules: [
//                 {
//                     test: /\.es$/,
//                     exclude: /(node_modules|Vendor)/,
//                     use: {
//                         loader: 'babel-loader',
//                         options: babelConfig,
//                     },
//                 },
//             ],
//         },
//     }))
//     .pipe(gulp.dest(outputPath));
// }));

module.exports = () => gulp.src([
    'sandbox/page/**/*.es',
    'cwel/component/**/*.es',
    'cwel/pattern/**/*.es',
])
.pipe(gulpif(argv.chill, plumber(options.plumber)))
.pipe(sourcemaps.init())
.pipe(babel(babelConfig))
.pipe(sourcemaps.write('.'))
.pipe(gulp.dest('tmp/sandbox/'));

gulp.src('cwel/vendor/**/*.js')
.pipe(gulpif(argv.chill, plumber(options.plumber)))
.pipe(babel(babelConfig))
.pipe(concat('cwel-full.js'))
.pipe(gulp.dest('tmp/sandbox/'));


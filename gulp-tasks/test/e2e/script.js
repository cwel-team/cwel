const gulp              = require('gulp');                          // Task automator
const webpack           = require('webpack-stream');
const gulpif            = require('gulp-if');                       // Conditionally run a task
const gulpeach          = require('gulp-foreach');
const path              = require('path');                          // Core NodeJS lib
const plumber           = require('gulp-plumber');                  // Prevent errors from killing processes
const process           = require('process');                       // Core NodeJS lib
const yargs             = require('yargs');                         // Args

const argv = yargs.argv; // Parse process.argv with yargs

/* eslint-disable */
const options = require(path.join(process.cwd(), 'gulp-lib', 'options'));
/* eslint-enable */

const babelConfig = {
    presets: ['env', 'minify'],
    plugins: ['angularjs-annotate'],
};

module.exports = () => gulp.src([
    'Cwel/**/*.{e2e,pageobject}.es',
])
.pipe(gulpif(argv.chill, plumber(options.plumber)))
.pipe(gulpeach((stream, file) => {
    const p = path.parse(file.path);
    const tailPath = file.path
    .replace(file.base, '') // gulp base path
    .replace(p.base, ''); // filename
    const outputPath = path.resolve('tmp', 'test', 'e2e', tailPath);
    const outputName = p.base.replace(p.ext, '.js');

    return stream
    .pipe(webpack({
        entry: file.path,
        output: {
            filename: outputName,
        },
        devtool: 'source-map',
        resolve: {
            extensions: ['.js', '.es'],
        },
        module: {
            rules: [
                {
                    test: /\.es$/,
                    exclude: /(node_modules|Vendor)/,
                    use: {
                        loader: 'babel-loader',
                        options: babelConfig,
                    },
                },
            ],
        },
    }))
    .pipe(gulp.dest(outputPath));
}));

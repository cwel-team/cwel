const gulp              = require('gulp');                          // Task automator
const webpack           = require('webpack-stream');
const gulpif            = require('gulp-if');                       // Conditionally run a task
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
    'Cwel/Script/main.es',
])
.pipe(gulpif(argv.chill, plumber(options.plumber)))
.pipe(webpack({
    output: {
        filename: 'main.js',
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
.pipe(gulp.dest('tmp/sandbox/shared/asset/cwel/script'));

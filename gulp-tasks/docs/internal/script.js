const gulp              = require('gulp');                          // Task automator
const webpack           = require('webpack-stream');
const gulpif            = require('gulp-if');                       // Conditionally run a task
const path              = require('path');                          // Core NodeJS lib
const plumber           = require('gulp-plumber');                  // Prevent errors from killing processes
const process           = require('process');                       // Core NodeJS lib
const yargs             = require('yargs');                         // Args

const argv = yargs.argv; // Parse process.argv with yargs

/* eslint-disable */
const options = require(path.join(process.cwd(), 'gulp', 'lib', 'util', 'options'));
/* eslint-enable */

const babelConfig = {
    presets: ['env', 'minify'],
    plugins: ['angularjs-annotate'],
};

module.exports = () => gulpif(argv.chill, plumber(options.plumber))
.pipe(webpack({
    entry: path.resolve('Docs/Internal/Shared/Asset/Script/main.es'),
    output: {
        filename: '[name].js',
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['.js', '.es'],
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: babelConfig,
                },
            },
        ],
    },
}))
.pipe(gulp.dest('tmp/docs/internal/Shared/Asset/Script'));

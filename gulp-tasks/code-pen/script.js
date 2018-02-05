const gulp              = require('gulp');                          // Task automator
const gulpif            = require('gulp-if');                       // Conditionally run a task
const gulpeach          = require('gulp-foreach');
const path              = require('path');                          // Core NodeJS lib
const plumber           = require('gulp-plumber');                  // Prevent errors from killing processes
const process           = require('process');                       // Core NodeJS lib
const webpack           = require('webpack-stream');
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
    'Cwel/Script/core.es',
])
.pipe(gulpif(argv.chill, plumber(options.plumber)))
.pipe(gulpeach((stream, file) => {
    const p = path.parse(file.path);
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
                    exclude: /(node_modules)/,
                    use: {
                        loader: 'babel-loader',
                        options: babelConfig,
                    },
                },
            ],
        },
    }))
    .pipe(gulp.dest('tmp/code-pen'));
}));

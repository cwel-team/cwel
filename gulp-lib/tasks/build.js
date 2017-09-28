const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const msbuild = require('gulp-msbuild');

gulp.task('build-es', () => gulp.src('Cwel/Src'));

// @internal
gulp.task('build-cwomponents-es', () => gulp.src('Cwomponents/{Pattern,Component,Testing}/**/*.es')
.pipe(sourcemaps.init())
.pipe(babel({
    presets: ['es2015'],
    plugins: ['angularjs-annotate'],
}))
.pipe(sourcemaps.write('.'))
.pipe(gulp.dest('Cwomponents/dist/')));

// TODO(Declan Cook) Include a cwomponents.js file for run / config blocks?
// TODO(Daniel Stuessy) Use merge gulp plugin to put this task into the 'build-cwomponents-es' one.
//      This one has no right to be its own!
// @internal
gulp.task('build-cwomponents-services', () => gulp.src('Cwomponents/Service/**/*.es')
.pipe(sourcemaps.init())
.pipe(concat('services.js'))
.pipe(babel({
    presets: ['es2015'],
    plugins: ['angularjs-annotate'],
}))
.pipe(sourcemaps.write('.'))
.pipe(gulp.dest('Cwomponents/dist/')));

// @internal
gulp.task('build-docs-js', () => gulp.src('Cwo.Docs.Web/Assets/es/**/*.es')
.pipe(sourcemaps.init())
.pipe(babel({
    presets: ['es2015'],
    plugins: ['angularjs-annotate'],
}))
.pipe(sourcemaps.write('.'))
.pipe(gulp.dest('Cwo.Docs.Web/Assets/js/')));

// @internal
gulp.task('build-cms-js', () => gulp.src('Cwo.Cms/Assets/es/**/*.es')
.pipe(sourcemaps.init())
.pipe(babel({
    presets: ['es2015'],
    plugins: ['angularjs-annotate'],
}))
.pipe(sourcemaps.write('.'))
.pipe(gulp.dest('Cwo.Cms/Assets/js/')));

// @internal
gulp.task('build-docs-scss', () => gulp.src('Cwo.Docs.Web/Assets/scss/site.scss')
.pipe(sass({
    precision: 8,
    includePaths: [
        '.',
    ],
}).on('error', sass.logError))
.pipe(gulp.dest('Cwo.Docs.Web/Assets/css/')));

// @internal
gulp.task('build-cms-scss', () => gulp.src('Cwo.Cms/Assets/scss/cms.scss')
.pipe(sass({
    precision: 8,
    includePaths: [
        '.',
    ],
}).on('error', sass.logError))
.pipe(gulp.dest('Cwo.Cms/Assets/css/')));

// @internal
gulp.task('build-csharp', () => gulp.src('./Cwo.EpiServer.sln')
.pipe(msbuild({
    toolsVersion: 'auto',
})));

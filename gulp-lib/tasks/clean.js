const gulp = require('gulp');
const gulpSequence = require('gulp-sequence');
const del = require('del');


// @internal
gulp.task('clean-cwomponents', done => gulpSequence(['clean-cwomponents-dist', 'clean-docs-cwomponents', 'clean-cms-cwomponents'])(done));

// @internal
gulp.task('clean-vendors', done => gulpSequence(['clean-docs-vendor-js', 'clean-cms-vendor-js'])(done));

// @internal
gulp.task('clean-cwomponents-dist', done => gulpSequence(['clean-cwomponents-dist-js', 'clean-cwomponents-dist-razor'])(done));
// @internal
gulp.task('clean-cwomponents-dist-js', done => gulpSequence([
    'clean-cwomponents-dist-component-js',
    'clean-cwomponents-dist-pattern-js',
    'clean-cwomponents-dist-testing-js',
    'clean-cwomponents-dist-services-js'])(done));
// @internal
gulp.task('clean-cwomponents-dist-razor', () => del(['Cwomponents/dist/**/*.cshtml']));
// @internal
gulp.task('clean-cwomponents-dist-component-js', () => del(['Cwomponents/dist/Component/**/*{.js,.js.map}']));
// @internal
gulp.task('clean-cwomponents-dist-pattern-js', () => del(['Cwomponents/dist/Pattern/**/*{.js,.js.map}']));
// @internal
gulp.task('clean-cwomponents-dist-testing-js', () => del(['Cwomponents/dist/Testing/**/*{.js,.js.map}']));
// @internal
gulp.task('clean-cwomponents-dist-services-js', () => del(['Cwomponents/dist/**/services{.js,.js.map}']));

// @internal
gulp.task('clean-js', done => gulpSequence(['clean-docs-js', 'clean-cms-js'])(done));

// @internal
gulp.task('clean-css', done => gulpSequence(['clean-docs-css', 'clean-cms-css'])(done));

// @internal
gulp.task('clean-docs-cwomponents', () => del(['Cwo.Docs.Web/Cwomponents/**']));
// @internal
gulp.task('clean-docs-cwomponents-js', () => del(['Cwo.Docs.Web/Cwomponents/**/*.js', 'Cwo.Docs.Web/Cwomponents/**/*.js.map']));
// @internal
gulp.task('clean-docs-cwomponents-json', () => del(['Cwo.Docs.Web/Cwomponents/**/*.json']));
// @internal
gulp.task('clean-docs-cwomponents-razor', () => del(['Cwo.Docs.Web/Cwomponents/**/*.cshtml']));
// @internal
gulp.task('clean-docs-vendor-js', () => del(['Cwo.Docs.Web/Assets/vendor/**/*.js']));
// @internal
gulp.task('clean-docs-js', () => del(['Cwo.Docs.Web/Assets/js/**/*.js', 'Cwo.Docs.Web/Assets/js/**/*.js.map']));
// @internal
gulp.task('clean-docs-css', () => del(['Cwo.Docs.Web/Assets/css/**/*.css']));

// @internal
gulp.task('clean-cms-cwomponents', () => del(['Cwo.Cms/Cwomponents']));
// @internal
gulp.task('clean-cms-cwomponents-js', () => del(['Cwo.Cms/Cwomponents/**/*.js', 'Cwo.Cms/Cwomponents/**/*.js.map']));
// @internal
gulp.task('clean-cms-cwomponents-json', () => del(['Cwo.Cms/Cwomponents/**/*.json']));
// @internal
gulp.task('clean-cms-cwomponents-razor', () => del(['Cwo.Cms/Cwomponents/**/*.cshtml']));
// @internal
gulp.task('clean-cms-vendor-js', () => del(['Cwo.Cms/Assets/vendor/**/*.js']));
// @internal
gulp.task('clean-cms-js', () => del(['Cwo.Cms/Assets/js/**/*.js', 'Cwo.Cms/Assets/js/**/*.js.map']));
// @internal
gulp.task('clean-cms-css', () => del(['Cwo.Cms/Assets/css/**/*.css']));

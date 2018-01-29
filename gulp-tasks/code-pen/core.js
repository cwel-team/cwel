const gulp = require('gulp');
const bundleScss = require('../../gulp-lib/bundleScss');

module.exports = () => gulp.src('Cwel/Style/core.scss')
.pipe(bundleScss())
.pipe(gulp.dest(''));

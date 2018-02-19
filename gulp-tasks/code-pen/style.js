const gulp = require('gulp');
const bundleScss = require('../../gulp-lib/bundle-scss');

module.exports = () => gulp.src('Cwel/Style/core.scss')
.pipe(bundleScss())
.pipe(gulp.dest('tmp/code-pen'));

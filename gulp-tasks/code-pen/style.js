const gulp = require('gulp');
const bundleScss = require('../../gulp-lib/bundle-scss');

module.exports = () => gulp.src('cwel/style/core.scss')
.pipe(bundleScss())
.pipe(gulp.dest('tmp/code-pen'));

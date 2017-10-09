const del = require('del');
const gulp = require('gulp');
const gulpSequence = require('gulp-sequence');


// @internal
gulp.task('cwel-test-copy', done => gulpSequence('cwel-test-copy-vendor')(done));
// @internal
gulp.task('clean:cwel-test-copy', done => gulpSequence([
    'clean:cwel-test-copy-vendor',
])(done));


// @internal
gulp.task('cwel-test-copy-vendor', () => gulp.src('Cwel/src/Testing/vendor/**/*.js')
.pipe(gulp.dest('Cwel/dist/test/Cwel/Testing/vendor')));
// @internal
gulp.task('clean:cwel-test-copy-vendor', () => del(['Cwel/dist/test/Cwel/Testing/vendor/**/*.js']));

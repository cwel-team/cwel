const del               = require('del');                           // Delete files and folders
const gulp              = require('gulp');                          // Task automator
const gulpSequence      = require('gulp-sequence');                 // Specify order of tasks


// @internal
gulp.task('cwel-test-copy', done => gulpSequence('cwel-test-copy-vendor')(done));
// @internal
gulp.task('clean:cwel-test-copy', done => gulpSequence([
    'clean:cwel-test-copy-vendor',
])(done));


// @internal
gulp.task('cwel-test-copy-vendor', () => gulp.src('Cwel/Src/Test/e2e/vendor/**/*.js')
.pipe(gulp.dest('Cwel/.tmp/test/Test/e2e/vendor')));
// @internal
gulp.task('clean:cwel-test-copy-vendor', () => del(['Cwel/.tmp/test/Test/e2e/vendor/**/*.js']));

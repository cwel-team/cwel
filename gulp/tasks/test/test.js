const gulp             = require('gulp');
const gulpSequence     = require('gulp-sequence');


require('./build');
require('./copy');
require('./run');


/**
 * Run CWEL tests
 */
gulp.task('cwel-test', ['clean:cwel-test'], done => gulpSequence('cwel-test-build', 'cwel-test-copy', 'cwel-test-run')(done));
/**
 * Clean the CWEL test files created by the cwel-test task
 */
gulp.task('clean:cwel-test', done => gulpSequence('clean:cwel-test-build', 'clean:cwel-test-copy')(done));

const gulp              = require('gulp');                          // Task automator
const gulpMultiProcess = require('gulp-multi-process');

require('./e2e');
require('./unit');
require('./visual');

// @internal
gulp.task('cwel-test-run', (done) => {
    /*
        Using `gulp-multi-process` module to run karma in a child process of its own.
        It turns out Karma seems to exit the main process it runs on -- i.e. the gulp process --
        making it impossible to execute alongside other gulp tasks.
    */
    gulpMultiProcess(['cwel-test-run-e2e', 'cwel-test-run-unit', 'cwel-test-run-visual'], (exitCode) => {
        if (exitCode !== 0) {
            throw Error('Tests processes returned non zero exit code');
        }
        done();
    });
});

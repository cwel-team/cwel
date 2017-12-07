const gulp             = require('gulp');
const gulpSequence     = require('gulp-sequence');


require('./cssstats');
require('./lint');


/**
 * Check the solution's code style.
 */
gulp.task('lint', done => gulpSequence('lint-script', 'lint-style')(done));


/**
 * Build and copy all relevant CWEL files into the distribution folder
 */
gulp.task('cwel-analysis', ['clean:cwel-analysis'], done => gulpSequence(
    'lint-script',
    'lint-style',
    'cwel-analysis-generate-css-stats-data',
    'cwel-analysis-css-stats',
)(done));
/**
 * Clean the CWEL distribution folder
 */
gulp.task('clean:cwel-analysis', done => gulpSequence(
    'clean:cwel-analysis-generate-css-stats-data',
)(done));

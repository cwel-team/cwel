const gulp             = require('gulp');
const gulpSequence     = require('gulp-sequence');


require('./cssstats');
require('./lint');


/**
 * Build and copy all relevant CWEL files into the distribution folder
 */
gulp.task('cwel-analysis', ['clean:cwel-analysis'], done => gulpSequence(
    'lint-script',
    'lint-style',
    'cwel-analysis-cssstats-generate-data',
    'cwel-analysis-cssstats-analyse-data',
)(done));
/**
 * Clean the CWEL distribution folder
 */
gulp.task('clean:cwel-analysis', done => gulpSequence(
    'clean:cwel-analysis-cssstats-generate-data',
)(done));

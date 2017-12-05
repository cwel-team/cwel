const gulp             = require('gulp');
const gulpSequence     = require('gulp-sequence');


require('./cssstats');


/**
 * Build and copy all relevant CWEL files into the distribution folder
 */
gulp.task('cwel-analysis', ['clean:cwel-analysis'], done => gulpSequence(
    'cwel-analysis-generate-css-stats-data',
    'cwel-analysis-css-stats',
)(done));
/**
 * Clean the CWEL distribution folder
 */
gulp.task('clean:cwel-analysis', done => gulpSequence(
    'clean:cwel-analysis-generate-css-stats-data',
)(done));

const gulp             = require('gulp');
const gulpSequence     = require('gulp-sequence');


require('./script');
require('./style');
require('./razor');
require('./img');
require('./web-config');


/**
 * Build and copy all relevant CWEL files into the distribution folder
 */
gulp.task('cwel-dist', ['clean:cwel-dist'], done => gulpSequence(
    'cwel-dist-script',
    'cwel-dist-style',
    'cwel-dist-razor',
    'cwel-dist-img',
    'cwel-dist-config')(done));
/**
 * Clean the CWEL distribution folder
 */
gulp.task('clean:cwel-dist', done => gulpSequence(
    'clean:cwel-dist-script',
    'clean:cwel-dist-style',
    'clean:cwel-dist-razor',
    'clean:cwel-dist-img',
    'clean:cwel-dist-config')(done));

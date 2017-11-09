const gulp             = require('gulp');
const gulpSequence     = require('gulp-sequence');


require('./generate');
require('./copy');
require('./build');


/**
 * Generate CWEL documentation pages
 */
gulp.task('cwel-docs', done => gulpSequence('cwel-docs-copy', 'cwel-docs-generate', 'cwel-docs-build')(done));
/**
 * Clean the CWEL documentation files and code in the docs project
 */
gulp.task('clean:cwel-docs', done => gulpSequence('clean:cwel-docs-copy', 'clean:cwel-docs-generate', 'clean:cwel-docs-build')(done));

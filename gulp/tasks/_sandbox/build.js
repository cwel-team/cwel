const gulp             = require('gulp');
const gulpSequence     = require('gulp-sequence');

require('./markup');
require('./script');
require('./style');

gulp.task('cwel-sandbox', done => gulpSequence(
    'sandbox-markup',
    'sandbox-script',
    'sandbox-style')(done));

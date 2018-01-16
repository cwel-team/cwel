const gulpSequence     = require('gulp-sequence');

module.exports = done => gulpSequence(
    'sandbox:page-markup',
    'sandbox:page-script',
    'sandbox:page-style',
    'sandbox:page-image',
    'sandbox:cwel-script',
    'sandbox:cwel-style')(done);

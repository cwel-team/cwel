const gulpSequence     = require('gulp-sequence');

module.exports = done => gulpSequence(
    'sandbox:markup',
    'sandbox:script',
    'sandbox:style')(done);

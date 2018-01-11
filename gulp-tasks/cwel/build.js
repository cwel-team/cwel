const gulpSequence     = require('gulp-sequence');

module.exports = done => gulpSequence(
    'cwel:script',
    'cwel:style')(done);

const gulpSequence     = require('gulp-sequence');

module.exports = done => gulpSequence(
    // 'cwel:markup',
    'cwel:script',
    // 'cwel:style'
)(done);

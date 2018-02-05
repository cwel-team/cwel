const gulpSequence     = require('gulp-sequence');

module.exports = done => gulpSequence(
    'docs:markup',
    'docs:script',
    'docs:style',
    'docs:image')(done);

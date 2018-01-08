const gulpSequence     = require('gulp-sequence');

module.exports = done => gulpSequence(
    'docs:internal:markup',
    'docs:internal:script',
    'docs:internal:style')(done);

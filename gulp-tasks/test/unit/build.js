const gulpSequence     = require('gulp-sequence');

module.exports = done => gulpSequence(
    'test:unit:script')(done);

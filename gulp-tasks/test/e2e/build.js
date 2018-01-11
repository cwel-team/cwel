const gulpSequence     = require('gulp-sequence');

module.exports = done => gulpSequence(
    'test:e2e:markup',
    'test:e2e:script',
    'test:e2e:style')(done);

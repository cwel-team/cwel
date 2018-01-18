const gulpSequence = require('gulp-sequence');

module.exports = done => gulpSequence(['test:unit:build', 'test:e2e:build'])(() => done());

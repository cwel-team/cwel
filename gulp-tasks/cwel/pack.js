const gulp = require('gulp');
const through = require('through2');

// These paths are just there to stop gulp from loading the largest folders
// into memory. The real authorities on which files get packaged are
// .gitignore and .npmignore. They cover the rest when publishing
// to npm from ~/tmp/package.
module.exports = () => gulp.src([
    './**',
    '!node_modules/**',
    '!.git/**',
    '!tmp/**',
    '!gulp-tasks/**',
    '!gulp-lib/**',
    '!gulp/**',
    '!docs/**',
    '!sandbox/**',
], { dot: true })
.pipe(through.obj((file, enc, cb) => {
    if (file.path.indexOf('package.json') > -1) {
        const data = JSON.parse(file.contents.toString());
        delete data.scripts;
        file.contents = Buffer.from(JSON.stringify(data));
    }

    cb(null, file);
}))
.pipe(gulp.dest('tmp/package'));

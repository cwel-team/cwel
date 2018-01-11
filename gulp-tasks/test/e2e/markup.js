const gulp              = require('gulp');                          // Task automator
const path              = require('path');
const through           = require('through2');
const nunjucks          = require('nunjucks');

module.exports = () => gulp.src([
    'Cwel/**/*.html',
])
.pipe(through.obj((file, enc, cb) => {
    const p = path.parse(file.path);
    const data = {
        name: p.base.replace(p.ext, ''), // filename with no extention
    };

    nunjucks.render(file.path, data, (e, res) => {
        if (e) {
            throw Error(e);
        }

        file.contents = Buffer.from(res, 'utf-8');

        cb(null, file);
    });
}))
.pipe(gulp.dest('tmp/test/e2e'));

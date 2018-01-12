const gulp              = require('gulp');                          // Task automator
const path              = require('path');
const through           = require('through2');
const nunjucks          = require('nunjucks');

module.exports = () => gulp.src([
    'Cwel/**/*.html',
])
.pipe(through.obj((file, enc, cb) => {
    const p = path.parse(file.path);
    const pathDirs = p.dir.split(path.sep);
    const data = {
        type: pathDirs[pathDirs.length - 2],
        componentDir: p.dir,
        componentFile: file.path,
        name: p.base.replace(p.ext, ''), // filename with no extention
    };

    nunjucks.render('Test/E2e/Template/master.nunjucks', data, (e, res) => {
        if (e) {
            throw Error(e);
        }

        file.contents = Buffer.from(res, 'utf-8');

        cb(null, file);
    });
}))
.pipe(gulp.dest('tmp/test/e2e'));

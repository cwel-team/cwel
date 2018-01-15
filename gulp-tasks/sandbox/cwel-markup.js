const gulp              = require('gulp');                          // Task automator
const path              = require('path');
const through           = require('through2');
const nunjucks          = require('nunjucks');

const options = require(path.join(process.cwd(), '/gulp-lib/options')); // eslint-disable-line

module.exports = () => {
    nunjucks.configure(['.'], options.nunjucks);

    return gulp.src([
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

        nunjucks.render('Sandbox/Shared/Layout/_component.njk', data, (e, res) => {
            if (e) {
                throw Error(e);
            }

            file.contents = Buffer.from(res, 'utf-8');

            cb(null, file);
        });
    }))
    .pipe(gulp.dest('tmp/sandbox'));
};

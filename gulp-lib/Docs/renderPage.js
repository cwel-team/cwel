const through           = require('through2');
const nunjucks          = require('nunjucks');
const path              = require('path');

const options = require(path.join(process.cwd(), 'gulp-lib', 'options')); // eslint-disable-line

module.exports = (paths) => {
    nunjucks.configure(paths || [], options.nunjucks);

    // render the nunjucks template
    return through.obj((file, encoding, cb) => {
        const data = {}; // to be defined when a dev needs to pass data to the template

        nunjucks.render(file.path, data, (e, res) => {
            if (e) {
                throw Error(e);
            }
            const ext = path.parse(file.path).base.replace(/^[^.]+/, '');

            file.contents = Buffer.from(res, 'utf-8');
            file.path = file.path.replace(RegExp(`${ext}$`), '.html');

            cb(null, file);
        });
    });
};

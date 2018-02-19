const fs = require('fs');
const path = require('path');
const kebab = require('lodash.kebabcase');

function getExtension(filePath) {
    const ext = path.parse(filePath).base
    .split('.')
    .slice(1)
    .join('.');

    return ext.length > 0 ? `.${ext}` : ext;
}

function getName(filePath) {
    const fileName = path.parse(filePath).base;
    return fileName.replace(getExtension(fileName), '');
}

function renameFile(pth, format = () => {}, cb) {
    const ext = getExtension(pth);
    const oldName = getName(pth);
    const newName = format(oldName);
    const scssprefix = oldName.indexOf('_') === 0 ? '_' : '';
    const newPth = pth.replace(RegExp(`${oldName}${ext}$`), `${scssprefix}${newName}${ext}`);

    console.log('rename file:', pth, 'ext:', ext, 'oldName:', oldName, 'newName:', newName);

    fs.rename(pth, newPth, () => cb(newPth));
}

module.exports = function rename(pth, cb) {
    const isFile = fs.lstatSync(pth).isFile();
    const isDir = fs.lstatSync(pth).isDirectory();

    if (isFile) {
        renameFile(pth, kebab, cb);
    } else if (isDir) {
        fs.readdir(pth, (err, paths) => {
            if (err) {
                throw err;
            }
            const ignoreRegEx = /(?:\.git|node_modules|tmp|dist|vendor|Vendor|gulp-lib|gulp-tasks|LICENSE|README\.md)/;
            let count = 0;
            const filtered = paths.filter(p => !ignoreRegEx.test(p));

            filtered.forEach((p) => {
                const fullP = path.join(pth, p);

                rename(fullP, () => {
                    count += 1;

                    if (count >= filtered.length) {
                        renameFile(pth, kebab, cb);
                    }
                });
            });
        });
    }
};

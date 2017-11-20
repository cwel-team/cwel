const path              = require('path'); // NodeJS core path library

const processCsData     = require('./processCsData');


module.exports = function gatherPageData(file) {
    const srcDir = path.parse(file.path).dir;
    const name = path.parse(file.path).base.replace(/\..*$/, '');
    const destDir = path.join(path.parse(file.path).dir, name);
    const type = path.parse(path.resolve(destDir, '..')).name.toLowerCase();
    const mdFile = path.resolve(srcDir, `${name}.doc.md`);
    const csData = processCsData(path.join(process.cwd(), 'Cwel/tmp/docs/csdoc'));

    return {
        name,
        type,
        dirPath: destDir,
        mdFile,
        csData,
    };
};

const path = require('path');
const fs = require('fs');

function findFileUpTree(filename, dirPath) {
    const exists = fs.existsSync(path.join(dirPath, filename));
    return exists
        ? dirPath
        : findFileUpTree(filename, path.parse(dirPath).base);
}

const gulpRootPath = findFileUpTree('Gulpfile.js', path.resolve('./'));

module.exports = function gulpRoot(filepath) {
    let prefix = '';
    if (filepath.indexOf('!') === 0) {
        prefix = '!';
        filepath = filepath.substring(1);
    }
    return prefix + path.join(gulpRootPath, filepath);
};

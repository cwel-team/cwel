const fs = require('fs'); // NodeJS core file system library

module.exports = function processJsonData(jsonPath) {
    return fs.existsSync(jsonPath)
        ? JSON.parse(fs.readFileSync(jsonPath, { encoding: 'utf-8' }))
        : {};
};

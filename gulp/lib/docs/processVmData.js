const fs = require('fs'); // NodeJS core file system library

module.exports = function processVmData(jsonPath) {
    return fs.existsSync(jsonPath)
        ? JSON.parse(fs.readFileSync(jsonPath, { encoding: 'utf-8' }))
        : null;
};

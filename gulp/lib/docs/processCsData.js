const fs                = require('fs');
const path              = require('path');

module.exports = function processCsData(dataDirPath) {
    if (!fs.existsSync(dataDirPath)) {
        return {};
    }

    const filenames = fs.readdirSync(dataDirPath);
    const csData = filenames
    .map(filename => path.join(dataDirPath, filename))
    .map(filepath => fs.readFileSync(filepath, { encoding: 'utf-8' }))
    .map(json => JSON.parse(json))
    .reduce((obj, csDatum) => {
        obj[csDatum.name] = csDatum;
        return obj;
    }, {});

    return csData;
};

const fs = require('fs');
const through = require('through2');

module.exports = () => through.obj((file, enc, cb) => {
    const pathReggie = "'([^'\"]+)'";
    const importReggie = `^@import ${pathReggie}.*$`;
    const content = file.contents.toString();
    const result = content.match(RegExp(importReggie, 'gm'))
    .map((line, ...args) => {
        const importPath = (line.match(RegExp(pathReggie)) || [])[1] || '';
        const filePath = `Cwel/Style/${importPath}.scss`
        .replace(/(?:\.scss)+/, '.scss')
        .replace(/\/([^./]+\.scss)$/, '/_$1');
        const src = fs.readFileSync(filePath).toString();

        console.log(line, args);

        debugger;

        return src;
    })
    .reduce((total, scss) => total + scss, '');

    file.contents = Buffer.from(result);

    cb(null, file);
});

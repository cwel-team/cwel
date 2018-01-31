const fs = require('fs');
const through = require('through2');

module.exports = () => through.obj((file, enc, cb) => {
    const pathReggie = "'([^'\"]+)'";
    const importReggie = `@import ${pathReggie}.*[\n\r]+`;
    let content = file.contents.toString();
    const importMatches = content.match(RegExp(importReggie, 'g'));

    importMatches.forEach((line) => {
        const importPath = (line.match(RegExp(pathReggie)) || [])[1] || '';
        const filePath = `Cwel/Style/${importPath}.scss`
        .replace(/(?:\.scss)+/, '.scss')
        .replace(/\/([^./]+\.scss)$/, '/_$1');
        const src = fs.readFileSync(filePath).toString();

        content = content.replace(line, src);
    });

    file.contents = Buffer.from(content);

    cb(null, file);
});

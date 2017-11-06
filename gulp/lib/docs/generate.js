const commentsParser    = require('comments-parser');               // Generic JSDoc-like comment parser
const fs                = require('fs');                            // NodeJS core file system library
const marked            = require('marked');                        // Full-featured markdown parser and compiler
const nunjucks          = require('nunjucks');                      // Templating engine
const path              = require('path');                          // NodeJS core path library
const through           = require('through2');                      // Functions in streams


function filterTags(tags, name) {
    return tags.filter(tag => tag.name === name) || [];
}

function findTag(tags, name) {
    return tags.find(tag => tag.name === name) || {};
}

function processScriptData(filePath) {
    if (!fs.existsSync(filePath)) {
        return {};
    }
    const contents = fs.readFileSync(filePath, { encoding: 'utf-8' });
    const comments = commentsParser(contents);
    if (!comments[0]) {
        return {};
    }
    const header = comments[0] || {};
    const scopeComments = comments.slice(1);
    const data = {
        name: findTag(header.tags, 'name').value,
        type: findTag(header.tags, 'type').value,
        angulartype: findTag(header.tags, 'angulartype').value,
    };

    data.scope = scopeComments.map(comment => ({
        name: findTag(comment.tags, 'name').value,
        type: findTag(comment.tags, 'type').value,
        params: filterTags(comment.tags, 'param').map(tag => tag.value),
        return: findTag(comment.tags, 'return').value,
    }));

    return data;
}

function processNotes(notesPath) {
    if (!fs.existsSync(notesPath)) {
        return '';
    }
    const contents = fs.readFileSync(notesPath, { encoding: 'utf-8' });
    return marked(contents);
}

function processVmData(jsonPath) {
    return fs.existsSync(jsonPath)
        ? JSON.parse(fs.readFileSync(jsonPath, { encoding: 'utf-8' }))
        : null;
}

function gatherCwomponentData(file) {
    const dirPath = path.parse(file.path).dir;
    const name = path.parse(file.path).base.replace(/\..*$/, '');
    const type = path.parse(path.resolve(dirPath, '..')).name.toLowerCase();
    const vmName = `${name}ViewModel`;
    const scriptData = processScriptData(path.resolve(dirPath, `${name}.es`));
    const notes = processNotes(path.resolve(dirPath, `${name}.doc.md`));
    const vm = processVmData(path.resolve(process.cwd(), `Cwel/dist/docs/csdoc/${vmName}.json`));

    return {
        name,
        type,
        dirPath,
        script: scriptData,
        notes,
        vm,
    };
}

module.exports = function generateDocs() {
    return through.obj((file, encoding, cb) => {
        const cwomponentData = gatherCwomponentData(file);

        let templatePath = path.resolve(`gulp/lib/docs/template/${cwomponentData.type}.tpl.html`);

        if (!fs.existsSync(templatePath)) {
            templatePath = path.resolve('gulp/lib/docs/template/default.tpl.html');
        }

        fs.readFile(templatePath, 'utf-8', (e, template) => {
            if (e) {
                throw Error(e);
            }
            const docsHtml = nunjucks.renderString(template, cwomponentData);

            file.contents = Buffer.from(docsHtml, 'utf-8');
            file.path = path.resolve(cwomponentData.dirPath, 'index.cshtml');

            cb(null, file);
        });
    });
};

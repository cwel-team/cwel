const fs                  = require('fs');                            // NodeJS core file system library
const nunjucks            = require('nunjucks');                      // Templating engine
const path                = require('path');                          // NodeJS core path library
const through             = require('through2');                      // Functions in streams
const marked              = require('marked');
const markdown            = require('nunjucks-markdown');

const gatherComponentData = require('./gatherComponentData');
const gatherPageData = require('./gatherPageData');

const env = nunjucks.configure({ noCache: true });

markdown.register(env, marked);

env.addFilter('kebab', (str) => {
    return (str || '').replace(/(?:^\w|[A-Z]|\b\w)/g, (letter, index) => {
        return index === 0 ? letter.toLowerCase() : `-${letter.toLowerCase()}`;
    }).replace(/\s+/g, '');
});

module.exports = function generateDocs(format) {
    return through.obj((file, encoding, cb) => {
        const data = format === 'component' ? gatherComponentData(file) : gatherPageData(file);

        let templatePath = path.resolve(`gulp/lib/docs/template/${data.type}.tpl.html`);

        if (!fs.existsSync(templatePath)) {
            templatePath = path.resolve('gulp/lib/docs/template/default.tpl.html');
        }

        fs.readFile(templatePath, 'utf-8', (e, template) => {
            if (e) {
                throw Error(e);
            }
            const docsHtml = nunjucks.renderString(template, data);

            file.contents = Buffer.from(docsHtml, 'utf-8');
            file.path = path.resolve(data.dirPath, 'index.cshtml');

            cb(null, file);
        });
    });
};

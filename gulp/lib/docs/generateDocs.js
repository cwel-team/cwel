const fs                  = require('fs');                            // NodeJS core file system library
const nunjucks            = require('nunjucks');                      // Templating engine
const path                = require('path');                          // NodeJS core path library
const through             = require('through2');                      // Functions in streams
const marked              = require('marked');
const markdown            = require('nunjucks-markdown');

const gatherComponentData = require('./gatherComponentData');
const gatherPageData = require('./gatherPageData');

// Make sure nunjucks is aware of all templates in the repo
// e.g. Cwel/src/Component/Badge/Badge.doc.md
const env = nunjucks.configure('.', { noCache: true });

markdown.register(env, marked);

env.addFilter('kebab', (str) => {
    return (str || '').replace(/(?:^\w|[A-Z]|\b\w)/g, (letter, index) => {
        return index === 0 ? letter.toLowerCase() : `-${letter.toLowerCase()}`;
    }).replace(/\s+/g, '');
});

module.exports = function generateDocs(format) {
    return through.obj((file, encoding, cb) => {
        const macroDir = path.join('gulp', 'lib', 'docs', 'template', 'macro');
        const data = format === 'component' ? gatherComponentData(file) : gatherPageData(file);

        // macro paths resolved here for ease of use in the template
        data.macros = fs.readdirSync(macroDir)
        .map(filename => path.resolve(macroDir, filename))
        .reduce((obj, filePath) => {
            const name = path.parse(filePath).base.split('.')[0].replace(/^_/, '');
            obj[name] = filePath;
            return obj;
        }, {});

        let templatePath = path.resolve(`gulp/lib/docs/template/${data.type}.tpl.html`);

        if (!fs.existsSync(templatePath)) {
            templatePath = path.resolve('gulp/lib/docs/template/default.tpl.html');
        }

        nunjucks.render(templatePath, data, (e, res) => {
            if (e) {
                throw Error(e);
            }

            file.contents = Buffer.from(res, 'utf-8');
            file.path = path.resolve(data.dirPath, 'index.cshtml');

            cb(null, file);
        });
    });
};

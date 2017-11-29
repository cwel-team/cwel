const fs                  = require('fs');                            // NodeJS core file system library
const nunjucks            = require('nunjucks');                      // Templating engine
const path                = require('path');                          // NodeJS core path library
const through             = require('through2');                      // Functions in streams
const marked              = require('marked');
const markdown            = require('nunjucks-markdown');

const gatherComponentData = require('./gatherComponentData');
const gatherPageData = require('./gatherPageData');

const renderer = new marked.Renderer();

/**
 * Make sure highlightjs can highlight syntax of
 * codeblocks in markdown and that angular doesn't compile
 * preformatted code as template.
 *
 * @param {string} text The code block contents to render in HTML.
 * @param {string} language The syntax in which the code block is written.
 * @return {string} HTML of the pre and code tags containing the given text.
 */
renderer.code = (text, language) => {
    const escaped = text.replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');

    return `<pre ng-non-bindable><code class="language-${language}">${escaped}</code></pre>`;
};

/**
 * Make sure the table is rendered with a docs-table class.
 *
 * @param {string} header Table header markup.
 * @param {string} body Table body markup.
 * @return {string} HTML of the table, including new docs-table class.
 */
renderer.table = (header, body) => {
    return `
    <table class="docs-table">
        <thead>${header}</thead>
        <tbody>${body}</tbody>
    </table>`;
};

/**
 * Allow for namespaced heading ids.
 *
 * Algorithm:
 * At the heart of this algorithm a stack is used to keep
 * track of the current namespace. Each rendering of a heading
 * trims the stored namespace to match its level - 1
 * i.e. headings at level 1 trim the namespace to 0, headings
 * of level 3 trim the namespace to 2. The heading's id
 * is then the stored namespace separated by '.', including
 * its own id.
 */
renderer.heading = (function rendererScope() {
    const namespace = [];

    return (text, level) => {
        const kebabText = text.replace(/\s+/g, '-').toLowerCase();
        const levelIndex = level - 1;

        // trim the namespace to match the level of this heading
        while (namespace.length > 0 && levelIndex < namespace.length) {
            namespace.pop();
        }

        namespace.push(kebabText);

        const id = namespace.join('.');

        return `
        <h${level} class="docs__anchored" id="${id}">
            <a href="#${id}">${text}</a>
        </h${level}>`;
    };
}());

marked.setOptions({
    renderer,
});

// Make sure nunjucks is aware of all templates in the repo
// e.g. Cwel/src/Component/Badge/Badge.doc.md
//      as well as
//      gulp/lib/docs/template/default.tpl.html
const env = nunjucks.configure('.', { autoescape: false, noCache: true });

markdown.register(env, marked);

env.addFilter('kebab', (str) => {
    return (str || '').replace(/(?:^\w|[A-Z]|\b\w)/g, (letter, index) => {
        return index === 0 ? letter.toLowerCase() : `-${letter.toLowerCase()}`;
    }).replace(/\s+/g, '');
});

module.exports = function generateDocs(format) {
    return through.obj((file, encoding, cb) => {
        const macroDir = path.join('Cwel.Docs.Web', 'FrontEnd', 'Template', 'docs', 'macro');
        const data = format === 'component' ? gatherComponentData(file) : gatherPageData(file);

        // macro paths resolved here for ease of use in the template
        data.macros = fs.readdirSync(macroDir)
        .map(filename => path.resolve(macroDir, filename))
        .reduce((obj, filePath) => {
            const name = path.parse(filePath).base.split('.')[0].replace(/^_/, '');
            obj[name] = filePath;
            return obj;
        }, {});

        let templatePath = path.resolve(`Cwel.Docs.Web/FrontEnd/Template/docs/${data.type}.nunjucks`);

        if (!fs.existsSync(templatePath)) {
            templatePath = path.resolve('Cwel.Docs.Web/FrontEnd/Template/docs/default.nunjucks');
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

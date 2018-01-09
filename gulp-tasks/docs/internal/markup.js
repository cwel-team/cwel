const gulp              = require('gulp');                          // Task automator
const nunjucks          = require('nunjucks');
const through           = require('through2');
const path              = require('path');
const marked            = require('marked');
const markdown          = require('nunjucks-markdown');

const env = nunjucks.configure([
    path.join(process.cwd(), 'Docs', 'Internal'),
    path.join(process.cwd(), 'Cwel'),
]);

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

markdown.register(env, marked);

module.exports = () => gulp.src([
    'Docs/Internal/Page/**/*.doc.md',
    'Cwel/Component/**/*.html',
    'Cwel/Pattern/**/*.html',
])
.pipe(through.obj((file, encoding, cb) => {
    const data = {};

    nunjucks.render(file.path, data, (e, res) => {
        if (e) {
            throw Error(e);
        }

        file.contents = Buffer.from(res, 'utf-8');

        cb(null, file);
    });
}))
.pipe(gulp.dest('tmp/docs/internal/page'));

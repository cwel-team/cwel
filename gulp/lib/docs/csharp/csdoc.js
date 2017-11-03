const gutil            = require('gulp-util');                     // Gulp utilities
const path             = require('path');                          // Core NodeJS lib
const through          = require('through2');                      // Functions in streams
const xmldoc           = require('xmldoc');                        // Parse XML documents


function getChild(node, name) {
    const cnodes = node.childrenNamed(name);
    return (!cnodes ? '' : cnodes.reduce((a, r) => {
        return a + r.val.trim();
    }, ''));
}

module.exports = function generateJson() {
    return through.obj(function processCsharp(file, encoding, cb) {
        const contents = file.contents.toString();
        const document = new xmldoc.XmlDocument(contents);
        const members = document.childrenNamed('members')[0].childrenNamed('member');
        const types = {};

        members.forEach((c) => {
            let type;
            const ns = c.attr.name.substring(2, c.attr.name.length).split('.');
            if (c.attr.name.startsWith('T')) {
                type = ns[ns.length - 1];
                types[type] = {
                    name: ns[ns.length - 1],
                    summary: getChild(c, 'summary'),
                    returns: getChild(c, 'returns'),
                    props: [],
                };
            } else if (c.attr.name.startsWith('P')) {
                type = ns[ns.length - 2];
                const propName = ns[ns.length - 1];
                if (!types[type]) {
                    types[type] = { props: [] };
                }
                types[type].props.push({
                    name: propName,
                    summary: getChild(c, 'summary'),
                    returns: getChild(c, 'returns'),
                });
            }
        });

        Object.keys(types).forEach((type) => {
            this.push(new gutil.File({
                base: file.base,
                cwd: process.cwd(),
                path: path.join(file.base, `${type}.json`),
                contents: Buffer.from(JSON.stringify(types[type], null, 2), 'utf-8'),
            }));
        });

        cb(null, null);
    });
};

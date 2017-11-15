const gutil            = require('gulp-util');                     // Gulp utilities
const path             = require('path');                          // Core NodeJS lib
const through          = require('through2');                      // Functions in streams
const xmldoc           = require('xmldoc');                        // Parse XML documents

function getParameters(node) {
    const cnodes = node.childrenNamed('param');
    if (cnodes.length === 0) return [];

    const paramsMatch = node.attr.name.match(/\((.*)\)/);
    if (paramsMatch === null || paramsMatch[1] === undefined) return [];

    // Get paramters handling issues with generics
    const paramsTypes = paramsMatch[1]
    .replace(/{[^}]+}+/g, match => match.replace(/,/g, '+'))
    .split(',')
    .map(type => type.replace(/\+/g, ', '));

    return cnodes.map((n, i) => {
        return {
            name: n.attr.name,
            summary: n.val.trim(),
            type: paramsTypes[i] };
    });
}

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
            let memberName = c.attr.name.substring(2, c.attr.name.length);
            const paramsIndex = memberName.indexOf('(');
            if (paramsIndex !== -1) {
                memberName = memberName.substring(0, paramsIndex);
            }
            const ns = memberName.split('.');

            if (c.attr.name.startsWith('T')) {
                type = ns[ns.length - 1];
                types[type] = {
                    name: ns[ns.length - 1],
                    summary: getChild(c, 'summary'),
                    props: [],
                    members: [],
                };
            } else if (c.attr.name.startsWith('P') || c.attr.name.startsWith('F')) {
                type = ns[ns.length - 2];
                const propName = ns[ns.length - 1];
                types[type].props.push({
                    name: propName,
                    summary: getChild(c, 'summary'),
                    returns: getChild(c, 'returns'),
                });
            } else if (c.attr.name.startsWith('M')) {
                type = ns[ns.length - 2];
                const methodName = ns[ns.length - 1];
                types[type].members.push({
                    name: methodName,
                    params: getParameters(c),
                    summary: getChild(c, 'summary'),
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

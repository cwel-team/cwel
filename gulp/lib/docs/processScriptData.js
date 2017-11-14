const commentsParser    = require('comments-parser');               // Generic JSDoc-like comment parser
const fs                = require('fs');                            // NodeJS core file system library


function filterTags(tags, name) {
    return tags.filter(tag => tag.name === name) || [];
}

function findTag(tags, name) {
    return tags.find(tag => tag.name === name) || {};
}

function parseParamTag(tagValue) {
    const name = (tagValue.match(/\s([^\s]+)/) || [])[1] || '';
    const type = (tagValue.match(/{([^}]+)}/) || [])[1] || '';
    const description = (tagValue.match(RegExp(`${name}\\s(.+)$`)) || [])[1] || '';

    return {
        type,
        name,
        description,
    };
}

module.exports = function processScriptData(filePath) {
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

    data.scope = scopeComments.map((comment) => {
        const name = findTag(comment.tags, 'name').value;
        const params = filterTags(comment.tags, 'param').map(tag => parseParamTag(tag.value));
        const returnVal = findTag(comment.tags, 'return').value;
        const type = !returnVal
            ? findTag(comment.tags, 'type').value
            : 'function';

        return {
            name,
            description: comment.lines.join(' '),
            type,
            params,
            return: returnVal,
        };
    });

    return data;
};

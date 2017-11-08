const commentsParser    = require('comments-parser');               // Generic JSDoc-like comment parser
const fs                = require('fs');                            // NodeJS core file system library


function filterTags(tags, name) {
    return tags.filter(tag => tag.name === name) || [];
}

function findTag(tags, name) {
    return tags.find(tag => tag.name === name) || {};
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

    data.scope = scopeComments.map(comment => ({
        name: findTag(comment.tags, 'name').value,
        type: findTag(comment.tags, 'type').value,
        params: filterTags(comment.tags, 'param').map(tag => tag.value),
        return: findTag(comment.tags, 'return').value,
    }));

    return data;
};

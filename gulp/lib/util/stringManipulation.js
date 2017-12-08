module.exports = {
    safeEval: (str, scope, methods) => {
        const variableName = (str.split('|')[0] || '').trim();
        const value = scope[variableName];
        const methodName = (str.split('|')[1] || '').trim();
        const method = methods[methodName];

        if (typeof method === 'function') {
            return method(value);
        }

        return value;
    },

    kebabize: (str) => {
        return str.replace(/(?:^\w|[A-Z]|\b\w)/g, (letter, index) => {
            return index === 0 ? letter.toLowerCase() : `-${letter.toLowerCase()}`;
        }).replace(/\s+/g, '');
    },

    camelize: (str) => {
        return str.replace(/(?:^\w|[A-Z]|\b\w)/g, (letter, index) => {
            return index === 0 ? letter.toLowerCase() : letter.toUpperCase();
        }).replace(/\s+/g, '').replace(/[\s-]/g, '');
    },

    pascalize: (str) => {
        return str.replace(/(?:^\w|[A-Z]|\b\w)/g, (letter) => {
            return letter.toUpperCase();
        }).replace(/\s+/g, '').replace(/[\s-]/g, '');
    },
};

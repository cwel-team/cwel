const path              = require('path');                          // NodeJS core path library
const resolve           = require('resolve');                       // `require.resolve()` on behalf of a file asynchronously and synchronously


module.exports = {
    interfaceVersion: 2,
    resolve(source, file) {
        const fileDir = path.parse(file).dir;
        const original = source.replace(/(?:\.js|\.es)$/, '');
        const sources = [];

        sources.push(source);
        sources.push(path.resolve(fileDir, `${original}.js`));
        sources.push(path.resolve(fileDir, `${original}.es`));

        const resolutions = sources.map((src) => {
            try {
                return {
                    found: true,
                    path: resolve.sync(src, { file }),
                };
            } catch (err) {
                return { found: false };
            }
        });
        const found = resolutions.filter(resolution => resolution.found === true)[0];

        return found;
    },
};

const gulp = require('gulp');
const through = require('through2');

const invokeOnCount = require('../../lib/util/invokeOnCount');
const config = require('../../../cwomponents.conf.json');


function safeEval(str, scope, methods) {
    const variableName = (str.split('|')[0] || '').trim();
    const value = scope[variableName];
    const methodName = (str.split('|')[1] || '').trim();
    const method = methods[methodName];

    if (typeof method === 'function') {
        return method(value);
    }

    return value;
}

function kebabize(str) {
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, (letter, index) => {
        return index === 0 ? letter.toLowerCase() : `-${letter.toLowerCase()}`;
    }).replace(/\s+/g, '');
}

function camelize(str) {
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, (letter, index) => {
        return index === 0 ? letter.toLowerCase() : letter.toUpperCase();
    }).replace(/\s+/g, '');
}

function pascalize(str) {
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, (letter) => {
        return letter.toUpperCase();
    }).replace(/\s+/g, '');
}

function evaluateTemplate(name, scope, methods) {
    return through.obj((file, encoding, cb) => {
        const stringContent = file.contents
        .toString()
        .replace(/{{([^}]*)}}/g, (match, capture) => safeEval(capture, scope, methods));

        file.contents = Buffer.from(stringContent);

        cb(null, file);
    });
}

function evaluatePath(name) {
    return through.obj((file, encoding, cb) => {
        file.path = file.path.replace('_name_', name);
        cb(null, file);
    });
}

function createFed(options) {
    const { name, includeJs, scope, methods, templateDirPath, destPath, callback } = options;
    const templatePaths = [`${templateDirPath}/*`, `!${templateDirPath}/*.cs`];

    if (!includeJs) {
        templatePaths.push(`!${templateDirPath}/*.{es,e2e.js,pageobject.es}`);
    }

    gulp.src(templatePaths, { base: templateDirPath })
    .pipe(evaluateTemplate(name, scope, methods))
    .pipe(evaluatePath(name))
    .pipe(gulp.dest(destPath))
    .on('end', callback);
}

function createBed(options) {
    const { name, scope, methods, templateDirPath, destPath, callback } = options;

    gulp.src([`${templateDirPath}/*.cs`], { base: templateDirPath })
    .pipe(evaluateTemplate(name, scope, methods))
    .pipe(evaluatePath(name))
    .pipe(gulp.dest(destPath))
    .on('end', callback);
}

module.exports = function createCwomponent(type, options, callback) {
    const { name, includeJs } = options;
    const fedDestPath = (config[type].fedSrc || '').replace('{name}', name);
    const bedDestPath = (config[type].bedSrc || '').replace('{name}', name);
    const templateDirPath = config[type].templates;
    const scope = {
        name,
        type,
    };
    const methods = {
        camelize,
        pascalize,
        kebabize,
        toLowerCase: str => String.prototype.toLowerCase.call(str),
    };
    const cb = invokeOnCount(callback, 2);

    createFed({
        name,
        includeJs,
        scope,
        methods,
        templateDirPath,
        destPath: fedDestPath,
        callback: cb,
    });

    createBed({
        name,
        scope,
        methods,
        templateDirPath,
        destPath: bedDestPath,
        callback: cb,
    });
};

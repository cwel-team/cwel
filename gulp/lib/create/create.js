const gulp                 = require('gulp');                          // Task automator
const through              = require('through2');                      // Functions in streams


const config               = require('../../../create.conf.json');
const invokeOnCount        = require('../../lib/util/invokeOnCount');
const stringManipulation   = require('../util/stringManipulation');

const safeEval = stringManipulation.safeEval;
const kebabize = stringManipulation.kebabize;
const camelize = stringManipulation.camelize;
const pascalize = stringManipulation.pascalize;

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

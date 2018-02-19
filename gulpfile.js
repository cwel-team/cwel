const gulp             = require('gulp');
const gulpSequence     = require('gulp-sequence');
const multiSync        = require('./gulp-lib/browserSyncMulti');
const fs               = require('fs');
const path             = require('path');
const camel            = require('lodash.camelcase');

require('gulp-task-loader')('gulp-tasks');

function getExtension(filePath) {
    const ext = path.parse(filePath).base
    .split('.')
    .slice(1)
    .join('.');

    return ext.length > 0 ? `.${ext}` : ext;
}

function getName(filePath) {
    const fileName = path.parse(filePath).base;
    return fileName.replace(getExtension(fileName), '');
}

function renameFile(pth, format = () => {}, cb) {
    const ext = getExtension(pth);
    const oldName = getName(pth);
    const newName = format(oldName);
    const newPth = pth.replace(RegExp(`${oldName}${ext}$`), `${newName}${ext}`);

    console.log('rename file:', pth, 'ext:', ext, 'oldName:', oldName, 'newName:', newName);

    fs.rename(pth, newPth, () => cb(newPth));
}

function rename(pth, cb) {
    const isFile = fs.lstatSync(pth).isFile();
    const isDir = fs.lstatSync(pth).isDirectory();

    if (isFile) {
        renameFile(pth, camel, cb);
    } else if (isDir) {
        fs.readdir(pth, (err, paths) => {
            if (err) {
                throw err;
            }
            const ignoreRegEx = /(?:\.git|node_modules|tmp|dist|vendor|Vendor|gulp-lib|gulp-tasks|LICENSE|README\.md)/;
            let count = 0;
            const filtered = paths.filter(p => !ignoreRegEx.test(p));

            filtered.forEach((p) => {
                const fullP = path.join(pth, p);

                rename(fullP, () => {
                    count += 1;

                    if (count >= filtered.length) {
                        renameFile(pth, camel, cb);
                    }
                });
            });
        });
    }
}

gulp.task('rename', done => rename('.', done));

gulp.task('build', done => gulpSequence('cwel:build', 'test:build', 'sandbox:build', 'docs:build')(done));

gulp.task('dev', done => gulpSequence('sandbox:build', 'docs:build')(done));

gulp.task('sandbox', done => gulpSequence('sandbox:build')(done));

gulp.task('test-unit', done => gulpSequence('test:unit:build', 'test:unit:run')(done));

gulp.task('test-e2e', done => gulpSequence(['sandbox:build', 'test:e2e:build'], 'test:e2e:run')(done));

gulp.task('test-visual', done => gulpSequence(['sandbox:build', 'test:visual:run'])(done));

gulp.task('lint', done => gulpSequence('lint:style', 'lint:script')(done));

gulp.task('watch', ['lint', 'dev'], (done) => {
    multiSync.init();

    // Watch Docs
    gulp.watch([
        'Docs/**/*.doc.md',
        'Docs/**/*.{njk,nunjucks}',
        'Docs/**/*.html',
    ], () => gulpSequence(
        'docs:markup')(() => multiSync.reload()));
    gulp.watch([
        'Docs/**/*.scss',
    ], () => gulpSequence(
        'docs:style',
        'lint:style')(() => multiSync.reload()));
    gulp.watch([
        'Docs/**/*.es',
    ], () => gulpSequence(
        'docs:script',
        'lint:script')(() => multiSync.reload()));

    // Watch Sandbox
    gulp.watch([
        'Cwel/**/*.html',
        'Sandbox/**/*.njk',
    ], () => gulpSequence(
        'sandbox:markup')(() => multiSync.reload()));
    gulp.watch([
        'Cwel/**/*.scss',
        'Sandbox/**/*.scss',
    ], () => gulpSequence(
        'sandbox:style',
        'lint:style')(() => multiSync.reload()));
    gulp.watch([
        'Cwel/**/*.es',
        'Sandbox/**/*.es',
    ], () => gulpSequence(
        'sandbox:script',
        'lint:script')(() => multiSync.reload()));

    done();
});

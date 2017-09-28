const gulp = require('gulp');
const del = require('del');
const generateDocs = require('../../lib/docs/generate');
const csdoc = require('../../lib/docs/csharp/csdoc');


/**
 * @internal
 */
gulp.task('docs-build', () => {
    return gulp.src([
        'Cwel/src/**/*.doc.md',
    ])
    .pipe(generateDocs())
    .pipe(gulp.dest('Cwel.Docs.Web/Cwel'));
});
gulp.task('clean:docs-build', () => del(['Cwel/src/**/*.doc.md']));


/**
 * TODO(Daniel Stuessy) work-out where csdoc files reside and where they go
 * @internal
 */
gulp.task('docs-build-csharp', () => {
    return gulp.src([
        'Cwo.Core/**/*.csdoc',
    ]).pipe(csdoc()).pipe(gulp.dest('Cwomponents/dist/csdoc'));
});

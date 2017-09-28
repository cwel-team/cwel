const gulp = require('gulp');
const gulpSequence = require('gulp-sequence');
const del = require('del');
const generateDocs = require('../../lib/docs/generate');
const csdoc = require('../../lib/docs/csharp/csdoc');

// @internal
gulp.task('docs-generate', gulpSequence('docs-generate-csharp', 'docs-generate-md'));
// @internal
gulp.task('clean:docs-generate', () => gulpSequence('clean:docs-generate-csharp', 'clean:docs-generate-md'));


/**
 * @internal
 */
gulp.task('docs-generate-md', () => {
    return gulp.src([
        'Cwel/src/**/*.doc.md',
    ])
    .pipe(generateDocs())
    .pipe(gulp.dest('Cwel.Docs.Web/Cwel'));
});
gulp.task('clean:docs-generate-md', () => del(['Cwel.Docs.Web/Cwel/**/index.cshtml']));


/**
 * TODO(Daniel Stuessy) work-out where csdoc files reside and where they go
 * @internal
 */
gulp.task('docs-generate-csharp', () => {
    return gulp.src([
        'Cwel/**/*.csdoc',
    ]).pipe(csdoc()).pipe(gulp.dest('Cwel/tmp/csdoc'));
});
gulp.task('clean:docs-generate-csharp', () => del(['Cwel/tmp/csdoc']));

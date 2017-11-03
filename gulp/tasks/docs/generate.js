const del               = require('del');                           // Delete files and folders
const gulp              = require('gulp');                          // Task automator
const gulpSequence      = require('gulp-sequence');                 // Specify order of tasks

const csdoc             = require('../../lib/docs/csharp/csdoc');
const generateDocs      = require('../../lib/docs/generate');


// @internal
gulp.task('cwel-docs-generate', done => gulpSequence('cwel-docs-generate-csharp', 'cwel-docs-generate-md')(done));
// @internal
gulp.task('clean:cwel-docs-generate', done => gulpSequence('clean:cwel-docs-generate-csharp', 'clean:cwel-docs-generate-md')(done));


// @internal
gulp.task('cwel-docs-generate-md', () => {
    return gulp.src([
        'Cwel/src/**/*.doc.md',
    ])
    .pipe(generateDocs())
    .pipe(gulp.dest('Cwel.Docs.Web/Cwel'));
});
// @internal
gulp.task('clean:cwel-docs-generate-md', () => del(['Cwel.Docs.Web/Cwel/**/index.cshtml']));


/**
 * TODO(Daniel Stuessy) work-out where csdoc files reside and where they go
 * @internal
 */
gulp.task('cwel-docs-generate-csharp', () => {
    return gulp.src([
        'Cwel/**/*.csdoc',
    ]).pipe(csdoc()).pipe(gulp.dest('Cwel/dist/docs/csdoc'));
});
// @internal
gulp.task('clean:cwel-docs-generate-csharp', () => del(['Cwel/dist/docs/csdoc']));

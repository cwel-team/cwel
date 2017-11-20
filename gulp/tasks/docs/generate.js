const del                   = require('del');                           // Delete files and folders
const gulp                  = require('gulp');                          // Task automator
const gulpSequence          = require('gulp-sequence');                 // Specify order of tasks

const csdoc                 = require('../../lib/docs/csharp/csdoc');
const generateDocs          = require('../../lib/docs/generateDocs');


// @internal
gulp.task('cwel-docs-generate', done => gulpSequence(
    'cwel-docs-generate-csharp',
    'cwel-docs-generate-md-component',
    'cwel-docs-generate-md-page')(done));
// @internal
gulp.task('clean:cwel-docs-generate', done => gulpSequence(
    'clean:cwel-docs-generate-csharp',
    'clean:cwel-docs-generate-md-component',
    'clean:cwel-docs-generate-md-page')(done));


// @internal
gulp.task('cwel-docs-generate-md-component', () => {
    return gulp.src([
        'Cwel/Src/**/*.doc.md',
    ])
    .pipe(generateDocs('component'))
    .pipe(gulp.dest('Cwel.Docs.Web/Cwel'));
});
// @internal
gulp.task('clean:cwel-docs-generate-md-component', () => del([
    'Cwel.Docs.Web/Cwel/**/index.cshtml',
    '!Cwel.Docs.Web/Cwel/Docs/**/index.cshtml',
]));


// @internal
gulp.task('cwel-docs-generate-md-page', () => {
    return gulp.src([
        'Cwel/Docs/**/*.doc.md',
    ])
    .pipe(generateDocs('page'))
    .pipe(gulp.dest('Cwel.Docs.Web/Cwel/Docs'));
});
// @internal
gulp.task('clean:cwel-docs-generate-md-page', () => del(['Cwel.Docs.Web/Cwel/Docs/**/*.cshtml']));


/**
 * TODO(Daniel Stuessy) work-out where csdoc files reside and where they go
 * @internal
 */
gulp.task('cwel-docs-generate-csharp', () => {
    return gulp.src([
        'Cwel/**/*.csdoc',
    ]).pipe(csdoc()).pipe(gulp.dest('Cwel/tmp/docs/csdoc'));
});
// @internal
gulp.task('clean:cwel-docs-generate-csharp', () => del(['Cwel/tmp/docs/csdoc']));

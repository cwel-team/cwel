const gulp = require('gulp');
const generateDocs = require('../../lib/docs/generate');
const csdoc = require('../../lib/docs/csharp/csdoc');


/**
 * Generate cwomponent documentation
 */
gulp.task('docs', () => {
    return gulp.src([
        'Cwomponents/{Pattern,Component,Service}/**/*.doc.md',
    ])
    .pipe(generateDocs())
    .pipe(gulp.dest('Cwel.Docs.Web/Cwel'));
});


/**
 * TODO(Daniel Stuessy) Get csdoc files sorted after docs task is done
 * @internal
 */
gulp.task('docs-csharp', () => {
    return gulp.src([
        'Cwo.Core/**/*.csdoc',
    ]).pipe(csdoc()).pipe(gulp.dest('Cwomponents/dist/csdoc'));
});

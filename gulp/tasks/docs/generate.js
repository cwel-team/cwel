const del                   = require('del');                           // Delete files and folders
const fs                    = require('fs');                            // Core NodeJS lib
const gulp                  = require('gulp');                          // Task automator
const gulpSequence          = require('gulp-sequence');                 // Specify order of tasks
const sassdoc               = require('sassdoc');                       // Build dynamic CSS documentation based on comments

const csdoc                 = require('../../lib/docs/csharp/csdoc');
const generateDocs          = require('../../lib/docs/generateDocs');


// @internal
gulp.task('cwel-docs-generate', done => gulpSequence(
    'cwel-docs-generate-csharp',
    'cwel-docs-generate-dynamic-scss-docs',
    'cwel-docs-generate-md-component',
    'cwel-docs-generate-md-page')(done));
// @internal
gulp.task('clean:cwel-docs-generate', done => gulpSequence(
    'clean:cwel-docs-generate-csharp',
    'clean:cwel-docs-generate-dynamic-scss-docs',
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
 */
// @internal
gulp.task('cwel-docs-generate-csharp', () => {
    return gulp.src([
        'Cwel/**/*.csdoc',
    ]).pipe(csdoc()).pipe(gulp.dest('Cwel/.tmp/docs/csdoc'));
});
// @internal
gulp.task('clean:cwel-docs-generate-csharp', () => del(['Cwel/.tmp/docs/csdoc']));


// @internal
gulp.task('cwel-docs-generate-dynamic-scss-docs', () =>
    sassdoc('Cwel/Src/Style/**/*.scss', {
        verbose: false,
        theme: 'pheek',
        dest: 'Cwel/.tmp/docs/scss/',
    }).then(() => {
        let file = fs.readFileSync('Cwel/.tmp/docs/scss/index.html', 'utf-8'); // Once the file has rendered read it back in...
        file = file.replace(/@/g, '@@'); // Swap all (SCSS) `@` symbols for `@@` so that C# doesn't get confused when it renders the page...
        file = file.replace(/="assets/g, '="/Assets/ScssDocsAssets'); // Swap out all `src` references to new location...
        file = file.replace(/ScssDocsAssets\/css\/main\.css/g, 'CSS/sass-doc-theme.css'); // Swap out default 'Fleek' theme for one we have more control over...
        file = file.replace(/csss/g, 'css'); // Remove bug where SassDoc pluralizes 'css'...
        fs.writeFileSync('Cwel/.tmp/docs/scss/index.html', file, 'utf-8'); // Then rewrite the file
        gulp.src('Cwel/.tmp/docs/scss/assets/**/*')
        .pipe(gulp.dest('Cwel.Docs.Web/Assets/ScssDocsAssets')); // Copy SassDoc src files to correct location
    }, (err) => {
        console.error(`SCSS docs generation error: ${err}`);
    }));
// @internal
gulp.task('clean:cwel-docs-generate-dynamic-scss-docs', () => del(['Cwel/.tmp/docs/scss']));

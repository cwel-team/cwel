const data                  = require('gulp-data');                     // Data injection
const del                   = require('del');                           // Delete files and folders
const fs                    = require('fs');                            // Core NodeJS module
const gulp                  = require('gulp');                          // Task automator
const nunjucks              = require('gulp-nunjucks');                 // Compile/precompile Nunjucks templates
const gulpSequence          = require('gulp-sequence');                 // Specify order of tasks
const sassdoc               = require('sassdoc');                       // Build dynamic CSS documentation based on comments
const cssstats              = require('gulp-cssstats');                 // Get stats for your rendered CSS
const path                  = require('path');                          // core NodeJS module
const rename                = require('gulp-rename');                   // Rename files

const csdoc                 = require('../../lib/docs/csharp/csdoc');
const generateDocs          = require('../../lib/docs/generateDocs');


// @internal
gulp.task('cwel-docs-generate', done => gulpSequence(
    'cwel-docs-generate-csharp',
    'cwel-docs-generate-dynamic-scss-docs',
    'cwel-docs-generate-css-stats',
    'cwel-docs-generate-md-component',
    'cwel-docs-generate-md-page')(done));
// @internal
gulp.task('clean:cwel-docs-generate', done => gulpSequence(
    'clean:cwel-docs-generate-csharp',
    'clean:cwel-docs-generate-dynamic-scss-docs',
    'clean:cwel-docs-generate-css-stats',
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
gulp.task('cwel-docs-generate-dynamic-scss-docs', (done) => {
    sassdoc('Cwel/Src/Style/**/*.scss', { // http://sassdoc.com/configuration/
        verbose: true,
        cache: false, // Disable cache to enable live-reloading
        display: {
            watermark: false,
        },
        theme: 'Cwel.Docs.Web/FrontEnd/Template/sassdoc',
        dest: 'Cwel/.tmp/docs/sassdoc',
    }).then(() => {
        let file = fs.readFileSync(path.join(process.cwd(), 'Cwel', '.tmp', 'docs', 'sassdoc', 'index.html'), 'utf-8'); // Once the file has rendered read it back in
        file = file.replace(/@/g, '@@'); // Swap all (SCSS) `@` symbols for `@@` so that C# doesn't get confused when it builds the page
        file = file.replace(/csss/g, 'CSS'); // Fix SassDoc bug where 'css' gets pluralized
        fs.writeFileSync('Cwel/.tmp/docs/sassdoc/index.html', file, 'utf-8'); // Then rewrite the file
        done();
    });
    // The following task is not required for SassDocs to generate
    // but is useful for debugging as it spits out the JSON data used by the task proper
    sassdoc.parse('Cwel/Src/Style/**/*.scss', { verbose: true })
    .then((sassdocraw) => {
        fs.writeFileSync('Cwel/.tmp/docs/sassdoc-raw.json', JSON.stringify(sassdocraw, null, '\t'), 'utf-8');
    });
});
// @internal
gulp.task('clean:cwel-docs-generate-dynamic-scss-docs', () => del(['Cwel/.tmp/docs/sassdoc']));

// @internal
gulp.task('cwel-docs-generate-css-stats', () => {
    gulp.src('Cwel.Docs.Web/Cwel/cwel.css')
    .pipe(cssstats())
    .pipe(rename('cssstats.json'))
    .pipe(gulp.dest('Cwel/.tmp/docs/cssstats/'))
    .on('end', () => {
        let cssstatsJsonPath = fs.readFileSync(path.join(process.cwd(), 'Cwel', '.tmp', 'docs', 'cssstats', 'cssstats.json'), 'utf-8');
        cssstatsJsonPath = JSON.parse(cssstatsJsonPath);
        gulp.src('Cwel.Docs.Web/FrontEnd/Template/cssstats/cssstats.nunjucks')
        .pipe(data(cssstatsJsonPath))
        .pipe(nunjucks.compile(cssstatsJsonPath))
        .pipe(rename('index.nunjucks'))
        .pipe(gulp.dest('Cwel/.tmp/docs/cssstats'));
    });
});
// @internal
gulp.task('clean:cwel-docs-generate-css-stats', () => del(['Cwel/.tmp/docs/cssstats/']));

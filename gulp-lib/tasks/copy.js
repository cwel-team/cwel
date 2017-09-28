const gulp = require('gulp');
const gulpSequence = require('gulp-sequence');
const chmod = require('gulp-chmod');
const sourcemaps = require('gulp-sourcemaps');
const path = require('path');
const through = require('through2');

const gulpRoot = require('../gulpRoot'); // @TODO redundant as demonstrated by the build-cwomponents-es task
const vendorManifest = require('../../npm.manifest.json');

// @internal
gulp.task('copy', done => gulpSequence(
    'copy-cwomponent-js',
    'copy-cwomponent-json',
    'copy-cwomponent-razor',
    'copy-cwomponent-docs',
    'copy-cwomponent-config',
    'copy-vendor-js')(done));

// @internal
gulp.task('copy-cwomponent-js', () => {
    return gulp.src([
        gulpRoot('Cwomponents/dist/**/*.js'), // see TODO above
        gulpRoot('Cwomponents/dist/**/*.js.map'),
        gulpRoot('!Cwomponents/dist/**/*.pageobject.*'),
        gulpRoot('!Cwomponents/dist/Testing/**/*.*'),
    ])
    .pipe(chmod({
        owner: {
            read: true,
            write: false,
            execute: false,
        },
    }))
    .pipe(gulp.dest(gulpRoot('Cwo.Docs.Web/Cwomponents')))
    .pipe(gulp.dest(gulpRoot('Cwo.Cms/Cwomponents')));
});

// @internal
gulp.task('copy-cwomponent-json', () => {
    return gulp.src([
        gulpRoot('Cwomponents/**/*.json'),
    ])
    .pipe(chmod({
        owner: {
            read: true,
            write: false,
            execute: false,
        },
    }))
    .pipe(gulp.dest(gulpRoot('Cwo.Docs.Web/Cwomponents')))
    .pipe(gulp.dest(gulpRoot('Cwo.Cms/Cwomponents')));
});

// @internal
gulp.task('copy-cwomponent-razor', () => {
    return gulp.src([
        gulpRoot('Cwomponents/**/*.cshtml'),
        `!${gulpRoot('Cwomponents/dist/*.cshtml')}`,
    ])
    .pipe(chmod({
        owner: {
            read: true,
            write: false,
            execute: false,
        },
    }))
    .pipe(gulp.dest(gulpRoot('Cwo.Docs.Web/Cwomponents')))
    .pipe(gulp.dest(gulpRoot('Cwo.Cms/Cwomponents')));
});

gulp.task('copy-cwomponent-docs', () => {
    // base path needs to be specified for correct copying
    return gulp.src('Cwomponents/dist/**/*.cshtml', { base: 'Cwomponents' })
    .pipe(through.obj((file, encoding, cb) => {
        file.path = path.resolve(file.path.replace(/dist/, '')); // regex used to match the first instance of 'dist'.
        cb(null, file);
    }))
    .pipe(chmod({
        owner: {
            read: true,
            write: false,
            execute: false,
        },
    }))
    .pipe(gulp.dest(gulpRoot('Cwo.Docs.Web/Cwomponents')))
    .pipe(gulp.dest(gulpRoot('Cwo.Cms/Cwomponents')));
});

// @internal
gulp.task('copy-cwomponent-config', () => {
    return gulp.src([
        gulpRoot('Cwomponents/web.config'),
    ])
    .pipe(chmod({
        owner: {
            read: true,
            write: false,
            execute: false,
        },
    }))
    .pipe(gulp.dest(gulpRoot('Cwo.Docs.Web/Cwomponents')))
    .pipe(gulp.dest(gulpRoot('Cwo.Cms/Cwomponents')));
});

// @internal
gulp.task('copy-vendor-js', () => {
    const vendorFilePaths = Object.values(vendorManifest);

    return gulp.src(vendorFilePaths, { base: gulpRoot('./') })
    .pipe(through.obj((file, encoding, callback) => {
        const fileData = path.parse(file.path);
        const danglingPathMatch = fileData.dir.match(/node_modules[\\/][^\\/]+(.*)$/) || [];

        fileData.dir = fileData.dir.replace(danglingPathMatch[1] || '', '');
        file.path = path.normalize(path.join(fileData.dir, `${fileData.name}${fileData.ext}`));
        file.path = path.normalize(file.path.replace(`node_modules${path.sep}`, ''));

        callback(null, file);
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(gulpRoot('Cwo.Docs.Web/Assets/vendor/js')))
    .pipe(gulp.dest(gulpRoot('Cwo.Cms/Assets/vendor/js')));
});

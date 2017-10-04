const del = require('del');
const gulp = require('gulp');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const gulpSequence = require('gulp-sequence');


const sassConfig = {
    precision: 8,
    outputStyle: 'compressed',
    includePaths: [
        'Cwel/src',
    ],
};


// @internal
gulp.task('cwel-dist-style', done => gulpSequence([
    'cwel-dist-style-component',
    'cwel-dist-style-pattern',
    'cwel-dist-style-core',
    'cwel-dist-style-vendor',
    'cwel-dist-style-compile',
])(done));
// @internal
gulp.task('clean:cwel-dist-style', done => gulpSequence([
    'clean:cwel-dist-style-component',
    'clean:cwel-dist-style-pattern',
    'clean:cwel-dist-style-core',
    'clean:cwel-dist-style-vendor',
    'clean:cwel-dist-style-compile',
])(done));


// @internal
gulp.task('cwel-dist-style-component', () => gulp.src('Cwel/src/Component/**/*.scss')
.pipe(gulp.dest('Cwel/dist/Cwel/Component/')));
// @internal
gulp.task('clean:cwel-dist-style-component', () => del(['Cwel/dist/Cwel/Component/**/*.scss']));


// @internal
gulp.task('cwel-dist-style-pattern', () => gulp.src('Cwel/src/Pattern/**/*.scss')
.pipe(gulp.dest('Cwel/dist/Cwel/Pattern/')));
// @internal
gulp.task('clean:cwel-dist-style-pattern', () => del(['Cwel/dist/Cwel/Pattern/**/*.scss']));


// @internal
gulp.task('cwel-dist-style-core', () => gulp.src('Cwel/src/Core/**/*.scss')
.pipe(gulp.dest('Cwel/dist/Cwel/Core/')));
// @internal
gulp.task('clean:cwel-dist-style-core', () => del(['Cwel/dist/Cwel/Core/**/*.scss']));

// @internal
gulp.task('cwel-dist-style-compile', () => gulp.src('Cwel/src/Core/scss/main.scss')
.pipe(sourcemaps.init())
.pipe(sass(sassConfig))
.pipe(autoprefixer({
    browsers: ['last 30 versions'],
}))
.pipe(rename({
    basename: 'cwel',
}))
.pipe(sourcemaps.write('.'))
.pipe(gulp.dest('Cwel/dist/Cwel')));
// @internal
gulp.task('clean:cwel-dist-style-compile', () => del(['Cwel/dist/Cwel/cwel.css']));


// @internal
gulp.task('cwel-dist-style-vendor', () => gulp.src('Cwel/src/Vendor/**/*.{css,scss}')
.pipe(gulp.dest('Cwel/dist/Cwel/Vendor')));
// @internal
gulp.task('clean:cwel-dist-style-vendor', () => del(['Cwel/dist/Cwel/Vendor/**/*.{css,scss}']));

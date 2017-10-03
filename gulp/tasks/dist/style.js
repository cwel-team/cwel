const del = require('del');
const gulp = require('gulp');
const gulpSequence = require('gulp-sequence');


// @internal
gulp.task('cwel-dist-style', done => gulpSequence([
    'cwel-dist-style-component',
    'cwel-dist-style-pattern',
    'cwel-dist-style-core',
    'cwel-dist-style-vendor',
])(done));
// @internal
gulp.task('clean:cwel-dist-style', done => gulpSequence([
    'clean:cwel-dist-style-component',
    'clean:cwel-dist-style-pattern',
    'clean:cwel-dist-style-core',
    'clean:cwel-dist-style-vendor',
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
gulp.task('cwel-dist-style-vendor', () => gulp.src('Cwel/src/Vendor/**/*.{css,scss}')
.pipe(gulp.dest('Cwel/dist/Cwel/Vendor')));
// @internal
gulp.task('clean:cwel-dist-style-vendor', () => del(['Cwel/dist/Cwel/Vendor/**/*.{css,scss}']));

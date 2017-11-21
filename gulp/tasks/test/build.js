const babel             = require('gulp-babel');                    // ES6 -> ES5
const del               = require('del');                           // Delete files and folders
const gulp              = require('gulp');                          // Task automator
const gulpSequence      = require('gulp-sequence');                 // Specify order of tasks
const sourcemaps        = require('gulp-sourcemaps');               // Generate sourcemaps

const babelConfig = {
    presets: ['env'],
    plugins: ['angularjs-annotate'],
};


// @internal
gulp.task('cwel-test-build', done => gulpSequence([
    'cwel-test-build-component',
    'cwel-test-build-pattern',
    'cwel-test-build-service',
    'cwel-test-build-utils',
])(done));
// @internal
gulp.task('clean:cwel-test-build', done => gulpSequence([
    'clean:cwel-test-build-component',
    'clean:cwel-test-build-pattern',
    'clean:cwel-test-build-service',
    'clean:cwel-test-build-utils',
])(done));


// @internal
gulp.task('cwel-test-build-component', () => gulp.src([
    'Cwel/Src/Component/**/*.e2e.es',
    'Cwel/Src/Component/**/*.pageobject.es',
])
.pipe(sourcemaps.init())
.pipe(babel(babelConfig))
.pipe(sourcemaps.write('.'))
.pipe(gulp.dest('Cwel/.tmp/test/Component')));
// @internal
gulp.task('clean:cwel-test-build-component', () => del(['Cwel/.tmp/test/Component/**/*.{js,js.map}']));


// @internal
gulp.task('cwel-test-build-pattern', () => gulp.src([
    'Cwel/Src/Pattern/**/*.e2e.es',
    'Cwel/Src/Pattern/**/*.pageobject.es',
])
.pipe(sourcemaps.init())
.pipe(babel(babelConfig))
.pipe(sourcemaps.write('.'))
.pipe(gulp.dest('Cwel/.tmp/test/Pattern')));
// @internal
gulp.task('clean:cwel-test-build-pattern', () => del(['Cwel/.tmp/test/Pattern/**/*.{js,js.map}']));


// @internal
gulp.task('cwel-test-build-service', () => gulp.src([
    'Cwel/Src/Service/**/*.spec.es',
    'Cwel/Src/Service/**/*.e2e.es',
])
.pipe(sourcemaps.init())
.pipe(babel(babelConfig))
.pipe(sourcemaps.write('.'))
.pipe(gulp.dest('Cwel/.tmp/test/Service')));
// @internal
gulp.task('clean:cwel-test-build-service', () => del(['Cwel/.tmp/test/Service/**/*.{js,js.map}']));


// @internal
gulp.task('cwel-test-build-utils', () => gulp.src([
    'Cwel/Src/Test/e2e/**/*.es',
    '!Cwel/Src/Test/e2e/vendor/**',
])
.pipe(sourcemaps.init())
.pipe(babel(babelConfig))
.pipe(sourcemaps.write('.'))
.pipe(gulp.dest('Cwel/.tmp/test/Test/e2e')));
// @internal
gulp.task('clean:cwel-test-build-utils', () => del([
    'Cwel/.tmp/test/Test/e2e/**/*.{js,js.map}',
    '!Cwel/.tmp/test/Test/e2e/vendor/**/*.{js,js.map}',
]));

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
    'Cwel/src/Component/**/*.e2e.es',
    'Cwel/src/Component/**/*.pageobject.es',
])
.pipe(sourcemaps.init())
.pipe(babel(babelConfig))
.pipe(sourcemaps.write('.'))
.pipe(gulp.dest('Cwel/dist/test/Cwel/Component')));
// @internal
gulp.task('clean:cwel-test-build-component', () => del(['Cwel/dist/test/Cwel/Component/**/*.{js,js.map}']));


// @internal
gulp.task('cwel-test-build-pattern', () => gulp.src([
    'Cwel/src/Pattern/**/*.e2e.es',
    'Cwel/src/Pattern/**/*.pageobject.es',
])
.pipe(sourcemaps.init())
.pipe(babel(babelConfig))
.pipe(sourcemaps.write('.'))
.pipe(gulp.dest('Cwel/dist/test/Cwel/Pattern')));
// @internal
gulp.task('clean:cwel-test-build-pattern', () => del(['Cwel/dist/test/Cwel/Pattern/**/*.{js,js.map}']));


// @internal
gulp.task('cwel-test-build-service', () => gulp.src([
    'Cwel/src/Service/**/*.spec.es',
    'Cwel/src/Service/**/*.e2e.es',
])
.pipe(sourcemaps.init())
.pipe(babel(babelConfig))
.pipe(sourcemaps.write('.'))
.pipe(gulp.dest('Cwel/dist/test/Cwel/Service')));
// @internal
gulp.task('clean:cwel-test-build-service', () => del(['Cwel/dist/test/Cwel/Service/**/*.{js,js.map}']));


// @internal
gulp.task('cwel-test-build-utils', () => gulp.src([
    'Cwel/src/Testing/**/*.es',
    '!Cwel/src/Testing/vendor/**',
])
.pipe(sourcemaps.init())
.pipe(babel(babelConfig))
.pipe(sourcemaps.write('.'))
.pipe(gulp.dest('Cwel/dist/test/Cwel/Testing')));
// @internal
gulp.task('clean:cwel-test-build-utils', () => del([
    'Cwel/dist/test/Cwel/Testing/**/*.{js,js.map}',
    '!Cwel/dist/test/Cwel/Testing/vendor/**/*.{js,js.map}',
]));

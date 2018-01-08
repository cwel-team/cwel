const gulp              = require('gulp');                          // Task automator

gulp.task('sandbox-markup', () => {
    return gulp.src([
        'sandbox/page/**/*.html',
        'cwel/component/**/*.html',
        'cwel/pattern/**/*.html',
    ])
    .pipe(gulp.dest('tmp/sandbox/page'))
});
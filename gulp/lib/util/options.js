const notify = require('gulp-notify');

module.exports = {
    plumber: function onError(err) {
        notify.onError({
            title: 'I am Error.',
            message: `There has been an error in [${err.plugin}]`,
            appIcon: './img/gulp.png'
        })(err);
        this.emit('end');
    },
};

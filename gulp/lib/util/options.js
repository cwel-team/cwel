const notify = require('gulp-notify');
const path = require('path');

module.exports = {
    plumber: function onError(err) {
        notify.onError({
            title: 'I am Error.',
            message: `There has been an error in [${err.plugin}]`,
            icon: path.join(__dirname, '../', '../', 'img/gulp.png'),
        })(err);
        this.emit('end');
    },
};

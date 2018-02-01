const notify            = require('gulp-notify');                   // OS-level toast notifications
const path              = require('path');                          // NodeJS core path library

module.exports = {
    nunjucks: {
        tags: {
            variableStart: '{[',
            variableEnd: ']}',
        },
    },
    plumber: function onError(err) {
        notify.onError({
            title: 'I am Error.',
            message: `There has been an error in [${err.plugin}]`,
            icon: path.join(__dirname, '../', '../', 'img/icon-gulp.png'),
        })(err);
        this.emit('end');
    },
};


module.exports = {
    plumber: {
        errorHandler(err) {
            console.log(err);
            this.emit('end');
        },
    },
};

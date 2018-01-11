import app from '../../Script/app';

app.factory('addOne', () => {
    return {
        increment: (num) => {
            return num + 1;
        },
    };
});

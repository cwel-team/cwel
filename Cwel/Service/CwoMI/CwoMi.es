import app from '../../Script/app';

app
.service('CwoMI', ($window) => {
    $window.dataLayer = $window.dataLayer || [];

    return {
        logEvent(event) {
            if (event) {
                $window.dataLayer.push(event);
            }
        },
    };
});

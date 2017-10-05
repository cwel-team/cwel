angular.module('cwel')
.factory('CwomponentFactory', ($compile) => {
    const cwomponentPrio = 50;

    // Cwomponentify a directive definition object
    return (ddo) => {
        let prevLink;

        if (ddo.priority || ddo.compile) {
            console.warn('CwomponentFactory called for a directive that defines a compile function or a priority');
            return ddo;
        }

        // Remove link function
        if (ddo.link) {
            prevLink = ddo.link;
            delete ddo.link;
        }

        ddo.compile = (templateElement) => {
            const compiled = $compile(templateElement, null, cwomponentPrio);
            return (scope, ...args) => {
                compiled(scope);

                if (prevLink) {
                    prevLink(scope, ...args);
                }
            };
        };

        ddo.priority = cwomponentPrio;
        return ddo;
    };
});

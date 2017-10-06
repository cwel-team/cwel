(function playgroundStore() {
    class store {
        constructor($window) {
            this.$window = $window;
        }
        load() {
            const dataElm = this.$window.document.querySelector('[type="x-play"]');
            if (dataElm) {
                return JSON.parse(dataElm.text);
            }
            const currentUrl = this.$window.location.pathname;
            const local = this.$window.localStorage.getItem(`storedPlay ${currentUrl}`);
            return local ? JSON.parse(local) : { children: [] };
        }
        store(model) {
            const currentUrl = this.$window.location.pathname;
            this.$window.localStorage.setItem(`storedPlay ${currentUrl}`, model);
        }
    }

    angular.module('cwoApp').service('playgroundStore', store);
}());

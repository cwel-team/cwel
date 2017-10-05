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
            const local = this.$window.localStorage.getItem('storedPlay');
            return local ? JSON.parse(local) : { children: [] };
        }
        store(model) {
            this.$window.localStorage.setItem('storedPlay', model);
        }
    }

    angular.module('cwoApp').service('playgroundStore', store);
}());

(function playgroundStore() {
    class store {
        constructor($window) {
            this.$window = $window;
            this.dataElm = this.$window.document.querySelector('[type="x-play"]');
        }
        load() {
            if (this.dataElm) {
                return JSON.parse(this.dataElm.text);
            }
            const local = this.$window.localStorage.getItem('storedPlay');
            return local ? JSON.parse(local) : { children: [] };
        }
        store(model) {
            if (!this.dataElm) {
                this.$window.localStorage.setItem('storedPlay', model);
            }
        }
    }

    angular.module('cwoApp').service('playgroundStore', store);
}());

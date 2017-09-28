import CwomponentPageObject from '../../Testing/CwomponentPageObject';// eslint-disable-line

export default class {{ name | pascalize }}PageObject extends CwomponentPageObject {
    constructor() {
        super('{{ type }}', '{{ name }}');        
    }
}

import PageObject from '../../Testing/PageObject';

export default class {{ name | pascalize }}PageObject extends PageObject {
    constructor() {
        super('{{ type }}', '{{ name }}');
    }
}

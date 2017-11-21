import PageObject from '../../Test/PageObject';

export default class {{ name | pascalize }}PageObject extends PageObject {
    constructor() {
        super('{{ type }}', '{{ name }}');
    }
}

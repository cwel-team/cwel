const {{ name | pascalize }}PageObject = require('../../dist/Component/{{ name }}/{{ name }}.pageobject').default; // eslint-disable-line import/no-unresolved

describe('{{ name }} Component', () => {
    let {{ name | camelize }}Po;

    beforeEach(() => {
        {{ name | camelize }}Po = new {{ name | pascalize }}PageObject();
    });

    it('should do something', () => {
        const model = {};

        {{ name | camelize }}Po.navigate(model);
        // Test, test, durr
    });
});

const {{ name | pascalize }}PageObject = require('./{{ name | pascalize }}.pageobject').default;

describe('{{ name | pascalize }} Pattern', () => {
    let wizKhalifaPo;

    beforeEach(() => {
        {{ name | camelize }}Po = new {{ name | pascalize }}PageObject();
    });

    it('should do something', () => {
        const model = {};

        {{ name | camelize }}Po.navigate(model);
        // Test, test, durr
    });
});

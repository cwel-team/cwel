describe('{{ name }} Service', () => {
    let {{ name | camelize }};

    beforeEach(() => {
        module('cwoApp');
        inject((_{{ name | camelize }}_) => {
            {{ name | camelize }} = _{{ name | camelize }}_;
        });
    });

    it('should test some behaviour', () => {
        // test your stuff right here
    });
});

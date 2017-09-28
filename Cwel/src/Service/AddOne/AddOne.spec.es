describe('AddOne Service', () => {
    let addOne;

    beforeEach(() => {
        module('cwoApp');
        inject((_addOne_) => {
            addOne = _addOne_;
        });
    });

    it('should add one to the input', () => {
        const result = addOne.increment(1);
        expect(result).toBe(2);
    });
});

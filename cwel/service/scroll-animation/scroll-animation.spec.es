describe('Animation Factory', () => {
    let animationFactory;

    beforeEach(() => {
        module('cwel');
        inject((_animationFactory_) => {
            animationFactory = _animationFactory_;
        });
    });

    it('should handle the animation if the name doesnt exist', () => {
        const result = animationFactory.getAnimation('fakeAnimation');
        expect(result).toBe(false);
    });

    it('should handle when no animation is used', () => {
        const expected = [];
        const result = animationFactory.getAnimation('no-animation');
        expect(result).toEqual(expected);
    });

    // needs work
    it('should handle when range does exist but elm doesnt', () => {
        const elm = document.querySelector('[animate="fakeAnimation"]');
        const result = animationFactory.getAnimation('top-right', elm, '0 , 0');
        expect(result).toBeUndefined();
    });

    it('should handle when both range and elm exist', () => {
        const elm = document.querySelector('[animate="top-right"]');
        const expected = [{ type: 'scale', style: 'top', from: 0, to: -2, unit: 'rem',  range: '0 , 0', selector: elm }, { type: 'scale', style: 'left', from: 0, to: 2, unit: 'rem',  range: '0 , 0', selector: elm }];
        const result = animationFactory.getAnimation('top-right', elm, '0 , 0');
        expect(result).toEqual(expected);
    });
});

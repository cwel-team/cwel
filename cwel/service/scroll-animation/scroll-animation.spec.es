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

    it('should handle when range does exist but element doesnt', () => {
        const elm = document.querySelector('[animate="fakeAnimation"]');
        const expected = [{ type: 'scale', style: 'top', from: 0, to: -2, unit: 'rem',  range: '0 , 0', selector: null }, { type: 'scale', style: 'left', from: 0, to: 2, unit: 'rem',  range: '0 , 0', selector: null }];
        const result = animationFactory.getAnimation('top-right', elm, '0 , 0');
        expect(result).toEqual(expected);
    });

    it('should handle when element does exist but range doesnt', () => {
        const elm = document.querySelector('[animate="top-right"]');
        const expected = [{ type: 'scale', style: 'top', from: 0, to: -2, unit: 'rem',  range: '', selector: elm }, { type: 'scale', style: 'left', from: 0, to: 2, unit: 'rem',  range: '', selector: elm }];
        const result = animationFactory.getAnimation('top-right', elm, '');
        expect(result).toEqual(expected);
    });

    it('should handle when both range and element exist', () => {
        const elm = document.querySelector('[animate="top-right"]');
        const expected = [{ type: 'scale', style: 'top', from: 0, to: -2, unit: 'rem',  range: '0 , 0', selector: elm }, { type: 'scale', style: 'left', from: 0, to: 2, unit: 'rem',  range: '0 , 0', selector: elm }];
        const result = animationFactory.getAnimation('top-right', elm, '0 , 0');
        expect(result).toEqual(expected);
    });
});

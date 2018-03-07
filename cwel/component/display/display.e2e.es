/* eslint-disable */

const DisplayPageObject = require('./display.pageobject').default;

describe('dipslay Component', () => {
    let displayPo;
    const path = '/component/display';

    beforeEach(() => {
        displayPo = new DisplayPageObject();
    });

    it('should animate element top right', (done) => {
        displayPo.navigate(path);
        const elm = displayPo.getAnimationElmTopRight();
        const elm2 = displayPo.getDisplayElmLight();

        elm.getCssValue('top').then(function(top) {
            console.log('top: '+ JSON.stringify(top));
            expect(top).toBe('0px');
        });

        elm.getCssValue('right').then(function(right) {
            console.log('right: '+ JSON.stringify(right));
            expect(right).toBe('0px');
        });

        // TODO: Get scroll to work so you can see animation functions correctly
        browser.executeScript("arguments[0].scrollIntoView();", elm.getWebElement())
            .then(function() {
                 elm.getCssValue('top').then(function(top) {
                    console.log('top: '+ JSON.stringify(top));
                    expect(top).toBe('-20px');

                    done();
                });
            })

    });
});

const CardSliderPageObject = require('./cardSlider.pageobject').default;

describe('CardSlider', () => {
    let cardSliderPo;
    const path = '/pattern/cardslider';

    beforeEach(() => {
        cardSliderPo = new CardSliderPageObject();
    });


    it('should decrease offset by one when clicking the previous button', (done) => {
        cardSliderPo.navigate(path);

        cardSliderPo.getIndex()
        .then((i) => {
            expect(i).toBe(1);
            cardSliderPo.clickPrev();

            cardSliderPo.getIndex()
            .then((ii) => {
                expect(ii).toBe(0);
                done();
            });
        });
    });

    it('should increase offset by one when clicking the next button', (done) => {
        cardSliderPo.navigate(path);

        cardSliderPo.getIndex()
        .then((i) => {
            expect(i).toBe(0);
            cardSliderPo.clickNext();

            cardSliderPo.getIndex()
            .then((ii) => {
                expect(ii).toBe(1);
                done();
            });
        });
    });

    it('wont allow the offset to go beyond the last slide', () => {
        cardSliderPo.navigate(path);

        cardSliderPo.clickNext();

        cardSliderPo.getIndex()
        .then((i) => {
            expect(i).toBe(1);
        });
    });

    it('Wont allow the offset to go below the first slide', () => {
        cardSliderPo.navigate(path);

        cardSliderPo.clickPrev();

        cardSliderPo.getIndex()
        .then((i) => {
            expect(i).toBe(0);
        });
    });
});

const CardSliderPageObject = require('../../dist/Pattern/CardSlider/CardSlider.pageobject').default; // eslint-disable-line import/no-unresolved

describe('CardSlider', () => {
    let cardSliderPo;
    const model = {
        StartIndex: 0,
        Cards: [
            {
                Header: 'Header 1',
                Details:
                    'Loreum ipsum Loreum ipsumLoreum ipsumLoreum ipsumLoreum ipsumLoreum ipsumLoreum ipsumLoreum ipsumLoreum ipsum',
                Class: 'pt-interactive',
            },
            {
                Header: 'Header 2',
                Details: 'Loreum ipsum',
                Class: 'pt-interactive',
            },
            {
                Header: 'Header 3',
                Details: 'Loreum ipsum',
                Class: 'pt-interactive',
            },
            {
                Header: 'Header 4',
                Details: 'Loreum ipsum',
                Class: 'pt-interactive',
            },
            {
                Header: 'Header 5',
                Details: 'Loreum ipsum',
                Class: 'pt-interactive',
            },
        ],
    };

    beforeEach(() => {
        cardSliderPo = new CardSliderPageObject();
        model.StartIndex = 0;
    });


    it('should decrease offset by one when clicking the previous button', (done) => {
        model.StartIndex = 1;

        cardSliderPo.navigate(model);

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
        cardSliderPo.navigate(model);

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
        model.StartIndex = 1;
        cardSliderPo.navigate(model);

        cardSliderPo.clickNext();

        cardSliderPo.getIndex()
        .then((i) => {
            expect(i).toBe(1);
        });
    });

    it('Wont allow the offset to go below the first slide', () => {
        cardSliderPo.navigate(model);

        cardSliderPo.clickPrev();

        cardSliderPo.getIndex()
        .then((i) => {
            expect(i).toBe(0);
        });
    });
});

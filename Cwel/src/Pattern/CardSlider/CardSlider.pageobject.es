import PageObject from '../../Test/e2e/PageObject';

export default class CardSliderPageObject extends PageObject {
    constructor() {
        super('Pattern', 'CardSlider');
        this.sliderSelector = '.cwel-card-slider';
        this.itemSelector = '.cwel-card-slider__item';
        this.prevButtonSelector = '.cwel-card-slider__control--previous';
        this.nextButtonSelector = '.cwel-card-slider__control--next';
    }

    getCard(index) {
        return element(by.css(`${this.itemSelector}:nth-child(${index + 1})`));
    }

    isActive(index) {
        return this.getCard(index).getAttribute('class').then(cl => cl.includes(`${this.itemSelector}--active`));
    }

    getIndex() {
        return new Promise((resolve, reject) => {
            element(by.css(this.sliderSelector)).evaluate('currentIndex')
            .then((ci) => {
                resolve(ci);
            })
            .catch((error) => {
                reject(error);
            });
        });
    }

    clickPrev() {
        return element(by.css(this.prevButtonSelector)).click();
    }

    clickNext() {
        return element(by.css(this.nextButtonSelector)).click();
    }
}

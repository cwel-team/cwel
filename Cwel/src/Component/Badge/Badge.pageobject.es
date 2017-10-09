import PageObject from '../../Testing/PageObject';

export default class BadgePageObject extends PageObject {
    constructor() {
        super('Component', 'Badge');
        this.selector = '.badge';
    }

    get domElement() {
        return element(by.css(this.selector));
    }

    get text() {
        return this.domElement.getText();
    }

    click() {
        return this.domElement.click();
    }
}

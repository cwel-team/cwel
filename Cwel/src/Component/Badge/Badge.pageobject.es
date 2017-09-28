import CwomponentPageObject from '../../Testing/CwomponentPageObject';// eslint-disable-line

export default class BadgePageObject extends CwomponentPageObject {
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

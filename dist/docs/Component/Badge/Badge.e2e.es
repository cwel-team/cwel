const BadgePageObject = require('./Badge.pageobject').default;

describe('Badge Component', () => {
    let badgePo;

    beforeEach(() => {
        badgePo = new BadgePageObject();
    });

    it('should increment counter by 1', () => {
        badgePo.navigate('/component/badge');

        expect(badgePo.text).toBe('1');
        badgePo.click();
        expect(badgePo.text).toBe('2');
    });
});

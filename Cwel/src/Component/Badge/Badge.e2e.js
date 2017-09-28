const BadgePageObject = require('../../dist/Component/Badge/Badge.pageobject').default; // eslint-disable-line import/no-unresolved

describe('Badge Component', () => {
    let badgePo;

    beforeEach(() => {
        badgePo = new BadgePageObject();
    });

    it('should increment counter by 1', () => {
        const model = {
            start: 1,
        };

        badgePo.navigate(model);
        expect(badgePo.text).toBe('1');
        badgePo.click();
        expect(badgePo.text).toBe('2');
    });
});

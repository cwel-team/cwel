describe('CwoMI', () => {
    let CwoMI;
    let $window;

    beforeEach(() => {
        module('cwel');

        inject((_$window_, _CwoMI_) => {
            CwoMI = _CwoMI_;
            $window = _$window_;
        });
    });

    it('Should Log events for GTM', () => {
        expect($window.dataLayer.length).toBe(0);

        CwoMI.logEvent({ event: 'Test-Event' });

        expect($window.dataLayer.length).toBe(1);
        const event = $window.dataLayer[0];
        expect(event.event).toBe('Test-Event');
    });
});

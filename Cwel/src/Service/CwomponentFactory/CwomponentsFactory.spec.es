describe('CwomponentFactory', () => {
    let CwomponentFactory;
    let $rootScope;
    let $window;

    beforeEach(() => {
        module('cwel');
        inject((_CwomponentFactory_, _$rootScope_, _$window_) => {
            CwomponentFactory = _CwomponentFactory_;
            $rootScope = _$rootScope_;
            $window = _$window_;
        });
    });

    it('Should add a compile pass into a DDO', () => {
        const ddo = CwomponentFactory({});
        expect(typeof ddo.compile).toBe('function');
    });

    it('Should add a priority lower than 100 to a DDO', () => {
        const ddo = CwomponentFactory({});
        expect(ddo.priority).toBeLessThan(100);
    });

    it('Should preserve an originial link function', () => {
        const linkFn = jasmine.createSpy('linkSpy');
        const ddo = CwomponentFactory({
            link: linkFn,
        });
        const factoryLink = ddo.compile($window.document.body, null);
        const scope = $rootScope.$new();

        factoryLink(scope, 'element', 'attrs');

        expect(linkFn).toHaveBeenCalledWith(scope, 'element', 'attrs');
    });

    it('Should preserve controller functions', () => {
        const ctrlFn = angular.noop;

        const ddo = CwomponentFactory({
            controller: ctrlFn,
        });

        expect(ddo.controller).toEqual(ctrlFn);
        expect(typeof ddo.compile).toBe('function');
    });

    it('Should pass through any DDO with a compile or priority set', () => {
        const compile = angular.noop;

        const ddo = CwomponentFactory({
            compile,
            priority: 200,
        });

        expect(ddo.compile).toEqual(compile);
        expect(ddo.priority).toEqual(200);
    });
});

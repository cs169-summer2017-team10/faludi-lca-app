describe('AssemblyCtrl', function() {
    beforeEach(module('focusLcaApp'));

    var $controller;

    beforeEach(inject(function(_$controller_){
        // The injector unwraps the underscores (_) from around the parameter names when matching
        $controller = _$controller_;
    }));

    describe('init', function() {
        it('does nothing', function() {
            expect('sentinel').toEqual('sentinel');
        });
    });
});

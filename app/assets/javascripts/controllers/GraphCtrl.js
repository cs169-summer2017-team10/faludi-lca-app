(function() {
    angular.module('focusLcaApp')
        .controller('GraphCtrl', GraphCtrl);

    GraphCtrl.$inject = ['$scope', '$mdDialog'];

    function GraphCtrl($scope, $mdDialog) {
        $scope.hello = "Hello World";

        $scope.hide = function() {
            $mdDialog.hide();
        };

        $scope.cancel = function() {
            $mdDialog.cancel();
        };

        $scope.answer = function(answer) {
            $mdDialog.hide(answer);
        };
    }
})();
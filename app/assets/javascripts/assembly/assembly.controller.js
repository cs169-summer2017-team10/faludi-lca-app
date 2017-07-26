angular.module('assembly.controller', [])
    .controller('AssemblyController', ['$scope', function ($scope) {
        $scope.things = [{ name: 'its' }, { name: 'working' }, { name: 'woooo' }];
    }]);
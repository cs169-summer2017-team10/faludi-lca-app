var app =angular.module('assembly.controller', ['dndLists', 'ui.materialize']);

    app.controller('assemblyController', ['$scope', '$http', function ($scope, $http) {

        // Get assemblies json data from server
        $http({
            method : "GET",
            url : "/show_assemblies.json"
        }).then(function mySuccess(response) {
            $scope.assembly.dropzones = response.data;
        }, function myError(response) {
            $scope.DebugZone = response.statusText;
        });

        // Get library json data from server
        $http({
            method : "GET",
            url : "/show_lib.json"
        }).then(function mySuccess(response) {
            $scope.library.lib = response.data;
        }, function myError(response) {
            $scope.DebugZone = response.statusText;
        });

        $scope.material_units = ["kg", "ton", "lb"]

        $scope.process_units = ["J", "kJ"]

        // var for library
        $scope.library = {
            selected: null,
            lib:[]
        }

        // var for assembly
        $scope.assembly = {
            selected: null,
            templates: [
                {type: "material", name: "new"},
                {type: "container", name: "new", columns: [[], []]}
            ],
            dropzones: {}
        };
    }]);
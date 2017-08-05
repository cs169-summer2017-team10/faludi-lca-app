var app =angular.module('assembly_page_app', ['dndLists', 'ui.materialize']);

app.controller('assembly_page_controller', ['$scope', '$http', '$window','$location', function ($scope, $http, $window, $location) {

    $scope.fillAssembly = function ( url ) {
        $http({
            method : "GET",
            url : url,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function mySuccess(response) {
            $scope.assembly.dropzones = response.data;
        }, function myError(response) {
            $scope.DebugZone = response.statusText;
        });
    };

    $scope.fillLibrary = function ( url ) {
        $http({
            method : "GET",
            url : url
        }).then(function mySuccess(response) {
            $scope.library.lib = response.data;
        }, function myError(response) {
            $scope.DebugZone = response.statusText;
        });
    };

    // alert in angular js
    $scope.doGreeting = function( msg ) {
        $window.alert( msg );
    };

    // Save data to server
    $scope.createAssembly = function( token , url ){

        $http({
            method : "POST",
            url : url,
            data: { 'build': $scope.assembly.dropzones },
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-Token': token
            }
        }).then(function mySuccess(response) {
            $window.location.href = response.data.url;
        }, function myError(response) {
            $scope.DebugZone = response.statusText;
        });
    };

    // Save data to server
    $scope.updateAssembly = function( token, url, id ){
        $http({
            method : "PUT",
            url : url,
            data: { 'build': $scope.assembly.dropzones, 'assembly_id': id},
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-Token': token
            }
        }).then(function mySuccess(response) {
            $scope.doGreeting( response.data.message );
        }, function myError(response) {
            $scope.DebugZone = response.statusText;
        });
    };

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

angular
    .module('focusLcaApp')
    .factory('assembliesFactory', assembliesFactory);

assembliesFactory.$inject = ['$http', '$mdToast'];

function assembliesFactory($http, $mdToast) {
    var o = {
        assemblies: []
    };
    // o.getAll = function() {
    //     return $http({method: 'GET', url: '/assemblies.json'})
    //         .then(function(success){
    //             angular.copy(success, o.assemblies);
    //         }, function (error) {
    //
    //         });
    // };
    o.getByUserId = function(user_id) {
        return $http({method: 'GET', url: '/assemblies.json?user_id=' + user_id})
            .then(function(success){
                console.log('Assembly getByUserId SUCCESS');
                // console.log(success);
                angular.copy(success.data, o.assemblies);
            }, function (error) {
                console.log('Assembly getByUserId ERROR');
                // console.log(error);
            });
    };
    o.save = function(assembly) {
        $mdToast.show(
            $mdToast.simple()
                .textContent('Saving...')
                .position('bottom right')
                .hideDelay(0)
        );
        // console.log("========== BEFORE POST REQUEST ==========");
        // console.log(assembly);
        // console.log("=========================================");
        var method = 'POST';
        var url = '/assemblies.json';
        if (assembly.id) {
            console.log("Update assembly");
            method = 'PUT';
            url = '/assemblies/' + assembly.id + ".json";
        }
        return $http({method: method, url: url, data: JSON.stringify(assembly) })
            .then(function(success){
                o.id = success.data.id;
                $mdToast.show(
                    $mdToast.simple()
                        .textContent('Saved!')
                        .position('bottom right')
                        .hideDelay(3000)
                );
                console.log('========== Assembly save SUCCESS ==========');
                console.log(success);
                console.log("===========================================");
            }, function (error) {
                $mdToast.show(
                    $mdToast.simple()
                        .textContent('Error :(')
                        .position('bottom right')
                        .hideDelay(3000)
                );
                console.log('========== Assembly save ERROR ==========');
                console.log(error);
                console.log("=========================================");
                console.log('Assembly save ERROR');
            });
    };
    o.get = function(id) {
        return $http({method: 'GET', url: '/assemblies/' + id + '.json'})
            .then(function(success){
                console.log('Assembly get SUCCESS');
                return success.data;
            }, function (error) {
                console.log('Assembly get ERROR');
            });
    };
    return o;
}
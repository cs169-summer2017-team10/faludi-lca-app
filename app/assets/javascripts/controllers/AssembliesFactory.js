angular
    .module('focusLcaApp')
    .factory('assembliesFactory', [
        '$http',
        function($http) {
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
            o.save = function(assembly) {
                return $http({method: 'POST', url: '/assemblies.json', data: assembly})
                    .then(function(success){
                        console.log('Assembly save SUCCESS');
                        console.log(success);
                        // o.assemblies.push(success);
                    }, function (error) {
                        console.log('Assembly save ERROR');
                        console.log(error);
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
        }]);
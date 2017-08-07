angular
    .module('focusLcaApp')
    .factory('assemblies', [
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
        }])
    .controller('AssemblyCtrl', [
        '$scope',
        'assemblies',
        'assembly',
        '$stateParams',
        'Auth',
        '$rootScope',
        '$mdDialog',
        function($scope, assemblies, assembly, $stateParams, Auth, $rootScope, $mdDialog){
            // Assembly data
            if ($stateParams['id']) {
                if (assembly) {
                    $scope.assembly = assembly;
                } else {
                    $scope.assembly = {
                        name: 'Assembly Not Found',
                        content: '',
                        user_id: $scope.user.id
                    };
                }
            } else {
                $scope.assembly = {
                    name: 'Untitled assembly',
                    content: '',
                    user_id: $scope.user.id
                };
            }

            $scope.saveAssembly = function() {
                if (!$scope.assembly.name || $scope.assembly.name === '') {
                    return;
                }
                assemblies.save($scope.assembly);
            };

            // Edit Assembly Name
            $scope.editName = false;

            // Expandable/Collapsable Menu Items
            $scope.data = ["Item 1", "Item 2", "Item 3", "Item 4"];
            $scope.toggle = {materials: true, manufacturing: true, transportation: true, use: true, eol: true};

            // Analyze/Graph Dialog
            $scope.showAdvanced = function(ev) {
                $mdDialog.show({
                    scope: $scope,
                    preserveScope: true,
                    controller: 'GraphCtrl',
                    templateUrl: 'views/graph.tmpl.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: false,
                    fullscreen: true // Only for -xs, -sm breakpoints.
                })
            };

            // Scrollable side nav
            // var assemblyCanvas = $('#assembly-canvas');
            // var height = assemblyCanvas.height();
            // var scrollHeight = assemblyCanvas.get(0).scrollHeight;
            // assemblyCanvas.bind('mousewheel', function(e, d) {
            //   if((this.scrollTop === (scrollHeight - height) && d < 0) || (this.scrollTop === 0 && d > 0)) {
            //     e.preventDefault();
            //   }
            // });
            $scope.configScrollbar = {
                autoHideScrollbar: false,
                theme: 'dark',
                advanced:{
                    updateOnContentResize: true
                },
                scrollInertia: 0
            };

            // Resizable sidebar
            var min = 300;
            var max = 800;
            var mainmin = 200;
            $('#split-bar').mousedown(function (e) {
                e.preventDefault();
                $(document).mousemove(function (e) {
                    e.preventDefault();
                    var x = e.pageX - $('#sidebar').offset().left;
                    if (x > min && x < max && e.pageX < ($(window).width() - mainmin)) {
                        $('#sidebar').css("width", x);
                        $('#main').css("margin-left", x);
                    }
                })
            });
            $(document).mouseup(function (e) {
                $(document).unbind('mousemove');
            });
        }]);

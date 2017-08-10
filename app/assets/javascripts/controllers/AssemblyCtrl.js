angular
    .module('focusLcaApp')
    .controller('AssemblyCtrl', [
        '$scope',
        'assembliesFactory',
        'assembly',
        '$stateParams',
        'Auth',
        '$rootScope',
        '$mdDialog',
        '$mdExpansionPanel',
        '$mdToast',
        function($scope, assembliesFactory, assembly, $stateParams, Auth, $rootScope, $mdDialog, $mdExpansionPanel, $mdToast){
            // Get user info after a hard refresh or a new tab
            $scope.$on('devise:login', function(event, currentUser) {
                $scope.user = currentUser;
            });

            // Custom grabber for the resizable left sidebar
            $scope.customGrabber = "<div id=\"custom-grabber\"></div>";

            // Models for the drag and drop library
            $scope.models = {
                selected: null,
                templates: {
                    // item: {type: "item", name: "New item", id: 2},
                    // container: {type: "container", name: "New container", id: 1, columns: [[]]}
                    material: {type: "material", name: "New material", processes: [[]]},
                    subassembly: {type: "subassembly", name: "New subassembly", columns: [[]], processes: [[]]}
                },
                dropzones: {
                    "assembly": [
                    ]
                }
            };
            $scope.$watch('models.dropzones', function(model) {
                $scope.modelAsJson = angular.toJson(model, true);
            }, true);
            $scope.initDraggable = function(name) {
                $scope.models.templates.material.id++;
                var draggable = JSON.parse(JSON.stringify($scope.models.templates.material));
                draggable.name = name;
                return draggable;
            };

            // Assembly data
            if ($stateParams['id']) {
                if (assembly) {
                    $scope.assembly = assembly;
                    $scope.models.dropzones.assembly = $scope.assembly.content;
                } else {
                    $scope.assembly = {
                        name: 'Assembly Not Found',
                        content: $scope.models.dropzones.assembly
                    };
                }
            } else {
                $scope.assembly = {
                    name: 'Untitled assembly',
                    content: $scope.models.dropzones.assembly
                };
            }

            // Functions
            $scope.addSubassembly = function() {
                var newSubassembly = JSON.parse(JSON.stringify($scope.models.templates.subassembly));
                $scope.models.dropzones.assembly.push(newSubassembly);
            };
            $scope.saveAssembly = function() {
                if (!$scope.assembly.name || $scope.assembly.name === '') {
                    $mdToast.show(
                        $mdToast.simple()
                            .textContent('Assembly name can\'t be empty')
                            .position('bottom right')
                            .hideDelay(5000)
                    );
                    return;
                }
                $scope.assembly.user_id = $scope.user.id; // Important
                assembliesFactory.save($scope.assembly).then(function() {
                    $scope.assembly.id = assembliesFactory.id;
                });
            };

            // Toggle for edit Assembly Name
            $scope.editName = false;

            // Library data (left sidebar)
            $scope.library = ["Materials", "Manufacturing", "Transportation", "Use", "End of Life"];
            $scope.data = ["Steel", "Iron", "Copper", "Acid"];

            // Analyze/Graph Dialog configuration
            $scope.showAnalyze = function(ev) {
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

            // Block scrolling on page
            var assemblyCanvas = $('#assembly-page');
            var height = assemblyCanvas.height();
            var scrollHeight = assemblyCanvas.get(0).scrollHeight;
            assemblyCanvas.bind('mousewheel', function(e, d) {
              if((this.scrollTop === (scrollHeight - height) && d < 0) || (this.scrollTop === 0 && d > 0)) {
                e.preventDefault();
              }
            });
            // Config custom scrollbar for sidebar and assembly canvas
            $scope.configScrollbar = {
                autoHideScrollbar: true,
                theme: 'minimal-dark',
                advanced:{
                    updateOnContentResize: true
                },
                scrollInertia: 0
            };

            $scope.deleteSelected = function(selected, dropzone) {
                function deleteSelectedHelper(selected, dropzone) {
                    for (var i = 0; i < dropzone.length; i++){
                        if (dropzone[i] === selected) {
                            dropzone.splice(i, 1);
                            return;
                        } else {
                            var columns = dropzone[i].columns;
                            var processes = dropzone[i].processes;
                            if (typeof columns !== 'undefined' && columns) {
                                deleteSelectedHelper(selected, columns[0]);
                            }
                            if (typeof processes !== 'undefined' && processes){
                                deleteSelectedHelper(selected, processes[0]);
                            }
                        }
                    }
                }
                deleteSelectedHelper(selected, dropzone);
            };
        }]);

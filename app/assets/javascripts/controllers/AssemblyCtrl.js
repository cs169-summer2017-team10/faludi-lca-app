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
            $scope.fakeLibrary = ["Materials", "Manufacturing", "Transportation", "Use", "End of Life"];
            $scope.fakeData = ["Steel", "Iron", "Copper", "Acid"];
            $scope.remove = function (scope) {
                scope.remove();
            };

            // Function needed for the library left sidebar
            $scope.visible = function (item) {
                if (!$scope.query)
                    return true;
                if (item.nodes && item.nodes.length > 0) {
                    return true;
                }
                var queryLowercase = $scope.query.toLowerCase();
                var itemTitle = item.title.toLowerCase();
                return !(itemTitle.indexOf(queryLowercase) === -1);
            };
            $scope.findNodes = function () {
            };

            // Library left sidebar data
            $scope.libraryData = [{
                'id': 1,
                'title': 'Materials',
                'nodes': [
                    {
                        'id': 11,
                        'title': 'Chemicals',
                        'nodes': [
                            {
                                'id': 111,
                                'title': 'Acids',
                                'nodes': [
                                    {
                                        'id': 1111,
                                        'title': 'Acetic acid production, product in 98% solution state',
                                        'nodes': []
                                    }, {
                                        'id': 1112,
                                        'title': 'Acrylic acid production',
                                        'nodes': []
                                    }, {
                                        'id': 1113,
                                        'title': 'Formic acid production, methyl formate route',
                                        'nodes': []
                                    }
                                ]
                            }, {
                                'id': 112,
                                'title': 'Coastings, finishings',
                                'nodes': [
                                    {
                                        'id': 1121,
                                        'title': 'Acrylic varnish production, product in 87.5% solution state',
                                        'nodes': []
                                    }, {
                                        'id': 1122,
                                        'title': 'Polyurethane production, flexible foam',
                                        'nodes': []
                                    }, {
                                        'id': 1123,
                                        'title': 'Polyurethane production, rigid foam',
                                        'nodes': []
                                    }
                                ]
                            }
                        ]
                    }, {
                        'id': 12,
                        'title': 'Metals',
                        'nodes': [
                            {
                                'id': 121,
                                'title': 'Non-ferrous',
                                'nodes': [
                                    {
                                        'id': 1211,
                                        'title': 'Aluminum',
                                        'nodes': [
                                            {
                                                'id': 12111,
                                                'title': 'Aluminium alloy production, AlMg3',
                                                'nodes': []
                                            }, {
                                                'id': 12112,
                                                'title': 'Aluminium drilling, conventional',
                                                'nodes': []
                                            }
                                        ]
                                    }, {
                                        'id': 1212,
                                        'title': 'Copper',
                                        'nodes': [
                                            {
                                                'id': 12121,
                                                'title': 'Copper carbonate production',
                                                'nodes': []
                                            }, {
                                                'id': 121212,
                                                'title': 'Brass drilling, conventional',
                                                'nodes': []
                                            }, {
                                                'id': 121213,
                                                'title': 'Brass production',
                                                'nodes': []
                                            }, {
                                                'id': 121214,
                                                'title': 'Brass turning, average, conventional',
                                                'nodes': []
                                            }, {
                                                'id': 121215,
                                                'title': 'Bronze production',
                                                'nodes': []
                                            }, {
                                                'id': 121216,
                                                'title': 'Casting, bronze',
                                                'nodes': []
                                            }
                                        ]
                                    }
                                ]
                            }, {
                                'id': 122,
                                'title': 'Ferrous',
                                'nodes': [
                                    {
                                        'id': 1221,
                                        'title': 'Iron alloy',
                                        'nodes': [
                                            {
                                                'id': 1221,
                                                'title': 'Cast iron milling, average',
                                                'nodes': []
                                            }, {
                                                'id': 1222,
                                                'title': 'Cast iron milling, large parts',
                                                'nodes': []
                                            }
                                        ]
                                    }, {
                                        'id': 1222,
                                        'title': 'Steel',
                                        'nodes': [
                                            {
                                                'id': 1221,
                                                'title': 'Steel production, chromium steel 18/8',
                                                'nodes': []
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }, {
                        'id': 13,
                        'title': 'Natural materials',
                        'nodes': [
                            {
                                'id': 131,
                                'title': 'Wood',
                                'nodes': [
                                    {
                                        'id': 1311,
                                        'title': 'Door production, inner, glass-wood',
                                        'nodes': []
                                    }, {
                                        'id': 1312,
                                        'title': 'Fibreboard production, hard, from virgin wood',
                                        'nodes': []
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }, {
                'id': 2,
                'title': 'Processes',
                'nodes': [
                    {
                        'id': 21,
                        'title': 'Anodising, aluminium sheet',
                        'nodes': []
                    },
                    {
                        'id': 22,
                        'title': 'Section bar extrusion, aluminium',
                        'nodes': []
                    },
                    {
                        'id': 23,
                        'title': 'Drawing of pipe, steel',
                        'nodes': []
                    },
                    {
                        'id': 24,
                        'title': 'Hot rolling, steel',
                        'nodes': []
                    },
                    {
                        'id': 25,
                        'title': 'Powder coating, steel',
                        'nodes': []
                    }
                ]
            }, {
                'id': 3,
                'title': 'Transportation',
                'nodes': [
                    {
                        'id': 31,
                        'title': 'Market for transport, freight train',
                        'nodes': []
                    }, {
                        'id': 32,
                        'title': 'Market for transport, freight, aircraft',
                        'nodes': []
                    }, {
                        'id': 33,
                        'title': 'Market for transport, freight, light commercial vehicle',
                        'nodes': []
                    }, {
                        'id': 34,
                        'title': 'Market for transport, freight, sea, transoceanic ship',
                        'nodes': []
                    }
                ]
            }, {
                'id': 4,
                'title': 'Use',
                'nodes': [
                    {
                        'id': 41,
                        'title': 'Market for water, completely softened, from decarbonised water, at user',
                        'nodes': []
                    }, {
                        'id': 42,
                        'title': 'Market for water, deionised, from tap water, at user',
                        'nodes': []
                    }, {
                        'id': 43,
                        'title': 'Market for water, ultrapure',
                        'nodes': []
                    }, {
                        'id': 44,
                        'title': 'Electricity production, hard coal',
                        'nodes': []
                    }, {
                        'id': 45,
                        'title': 'Electricity production, hydro, pumped storage',
                        'nodes': []
                    }, {
                        'id': 46,
                        'title': 'Electricity production, oil',
                        'nodes': []
                    }, {
                        'id': 47,
                        'title': 'Market for electricity, low voltage',
                        'nodes': []
                    }
                ]
            }, {
                'id': 5,
                'title': 'End of Life',
                'nodes': [
                    {
                        'id': 51,
                        'title': 'Market for process-specific burden, sanitary landfill',
                        'nodes': []
                    }, {
                        'id': 52,
                        'title': 'Market for process-specific burdens, municipal waste incineration',
                        'nodes': []
                    }, {
                        'id': 53,
                        'title': 'Recycling',
                        'nodes': []
                    }
                ]
            }
            ];

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

            // $scope.configScrollbar = {
            //     autoHideScrollbar: true,
            //     theme: 'minimal-dark',
            //     advanced:{
            //         updateOnContentResize: true
            //     },
            //     scrollInertia: 0
            // };

            // var c =
            //     [
            //         {
            //             "type": "container",
            //             "name": "Memory",
            //             "columns": [
            //                 [
            //                     {
            //                         "type": "container",
            //                         "name": "RAM",
            //                         "columns": [
            //                             [
            //                                 {
            //                                     "type": "material",
            //                                     "name": "Gold",
            //                                     "quantity": 1,
            //                                     "unit": "kg"
            //                                 },
            //                                 {
            //                                     "type": "container",
            //                                     "name": "DRAM",
            //                                     "columns": [
            //                                         [
            //                                             {
            //                                                 "type": "material",
            //                                                 "name": "Steel",
            //                                                 "quantity": 1,
            //                                                 "unit": "kg"
            //                                             }
            //                                         ]
            //                                     ]
            //                                 }
            //                             ]
            //                         ]
            //                     },
            //                     {
            //                         "type": "material",
            //                         "name": "Copper",
            //                         "quantity": 1,
            //                         "unit": "kg"
            //                     },
            //                     {
            //                         "type": "material",
            //                         "name": "Iron",
            //                         "quantity": 1,
            //                         "unit": "kg"
            //                     },
            //                     {
            //                         "type": "material",
            //                         "name": "Silver",
            //                         "quantity": 1,
            //                         "unit": "kg"
            //                     }
            //                 ]
            //             ]
            //         },
            //         {
            //             "type": "container",
            //             "name": "Screen",
            //             "columns":
            //                 [
            //                     [
            //                         {
            //                             "type": "container",
            //                             "name": "LCD module",
            //                             "columns":
            //                                 [
            //                                     [
            //                                         {
            //                                             "type": "material",
            //                                             "name": "Gold",
            //                                             "quantity": 1,
            //                                             "unit": "kg"
            //                                         },
            //                                         {
            //                                             "type": "container",
            //                                             "name": "LED",
            //                                             "columns":
            //                                                 [
            //                                                     [
            //                                                         {
            //                                                             "type": "material",
            //                                                             "name": "Glass",
            //                                                             "quantity": 1,
            //                                                             "unit": "kg"
            //                                                         }
            //                                                     ]
            //                                                 ]
            //                                         }
            //                                     ]
            //                                 ]
            //                         },
            //                         {
            //                             "type": "material",
            //                             "name": "Copper",
            //                             "quantity": 1,
            //                             "unit": "kg"
            //                         },
            //                         {
            //                             "type": "material",
            //                             "name": "Iron",
            //                             "quantity": 1,
            //                             "unit": "kg"
            //                         },
            //                         {
            //                             "type": "material",
            //                             "name": "Silver",
            //                             "quantity": 1,
            //                             "unit": "kg"
            //                         }
            //                     ]
            //                 ]
            //         },
            //         {
            //             "type": "container",
            //             "name": "Motherboard",
            //             "columns": [
            //                 [
            //                     {
            //                         "type": "container",
            //                         "name": "PCIE-X",
            //                         "columns":
            //                             [
            //                                 [
            //                                     {
            //                                         "type": "material",
            //                                         "name": "Gold",
            //                                         "quantity": 1,
            //                                         "unit": "kg"
            //                                     },
            //                                     {
            //                                         "type": "container",
            //                                         "name": "Capacitor",
            //                                         "columns": [
            //                                             [
            //                                                 {
            //                                                     "type": "material",
            //                                                     "name": "Wood",
            //                                                     "quantity": 1,
            //                                                     "unit": "kg"
            //                                                 },
            //                                                 {
            //                                                     "type": "material",
            //                                                     "name": "Ceramics",
            //                                                     "quantity": 1,
            //                                                     "unit": "kg"
            //                                                 }
            //                                             ]
            //                                         ]
            //                                     },
            //                                     {
            //                                         "type": "container",
            //                                         "name": "Resistor",
            //                                         "columns": [
            //                                             [
            //                                                 {
            //                                                     "type": "material",
            //                                                     "name": "Wood",
            //                                                     "quantity": 1,
            //                                                     "unit": "kg"
            //                                                 },
            //                                                 {
            //                                                     "type": "material",
            //                                                     "name": "Ceramics",
            //                                                     "quantity": 1,
            //                                                     "unit": "kg"
            //                                                 }
            //                                             ]
            //                                         ]
            //                                     }
            //                                 ]
            //                             ]
            //                     },
            //                     {
            //                         "type": "material",
            //                         "name": "Copper",
            //                         "quantity": 1,
            //                         "unit": "kg"
            //                     },
            //                     {
            //                         "type": "material",
            //                         "name": "Iron",
            //                         "quantity": 1,
            //                         "unit": "kg"
            //                     },
            //                     {
            //                         "type": "material",
            //                         "name": "Silver",
            //                         "quantity": 1,
            //                         "unit": "kg"
            //                     }
            //                 ]
            //             ]
            //         },
            //         {
            //             "type": "material",
            //             "name": "Wood",
            //             "quantity": 1,
            //             "unit": "kg"
            //         },
            //         {
            //             "type": "material",
            //             "name": "Glass",
            //             "quantity": 1,
            //             "unit": "kg"
            //         },
            //         {
            //             "type": "material",
            //             "name": "PVC",
            //             "quantity": 1,
            //             "unit": "kg"
            //         }
            //     ];
            // $scope.assembly = {
            //     name: 'Computer',
            //     content: c
            // }
        }]);

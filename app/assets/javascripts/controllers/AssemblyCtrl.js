angular
    .module('focusLcaApp')
    .controller('AssemblyCtrl', AssemblyCtrl);

AssemblyCtrl.$inject = ['$scope', 'assembliesFactory', 'assembly', '$stateParams', 'Auth', '$rootScope', '$mdDialog', '$mdExpansionPanel', '$mdToast'];

function AssemblyCtrl($scope, assembliesFactory, assembly, $stateParams, Auth, $rootScope, $mdDialog, $mdExpansionPanel, $mdToast){
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
            material: {type: "material", name: "New material", quantity: 1, unit: "kg", impact: 1, columns: [[]]},
            process: {type: "process", name: "New process", quantity: 1, unit: "m2", impact: 1},
            transport: {type: "transport", name: "New transport", quantity: 1, unit: "ton*km", impact: 1},
            use: {type: "use", name: "New use", quantity: 1, unit: "kg", impact: 1},
            eol: {type: "eol", name: "New eol", quantity: 1, unit: "kg", impact: 1},
            subassembly: {type: "subassembly", name: "New subassembly", columns: [[]]}
        },
        dropzones: {
            "assembly": [
            ]
        }
    };
    $scope.$watch('models.dropzones', function(model) {
        $scope.modelAsJson = angular.toJson(model, true);
    }, true);
    $scope.initDraggable = function(name, id, impact) {

        var firstDigitOfId = id.toString()[0]; // needed to know which category the part is from
        var draggable = JSON.parse(JSON.stringify($scope.models.templates[$scope.parts[firstDigitOfId - 1]]));
        draggable.name = name;
        draggable.impact = impact;
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
    $scope.getBadgeClass = function(id) {
        var firstDigitOfId = id.toString()[0]; // needed to know which category the part is from
        return $scope.parts[firstDigitOfId - 1] + "-badge";
    };

    // Toggle for edit Assembly Name
    $scope.editName = false;

    // Library data (left sidebar)
    // $scope.fakeLibrary = ["Materials", "Manufacturing", "Transportation", "Use", "End of Life"];
    // $scope.fakeData = ["Steel", "Iron", "Copper", "Acid"];
    // $scope.remove = function (scope) {
    //     scope.remove();
    // };

    // Functions needed for the library left sidebar (with search bar)
    $scope.visible = function (item) {
        return true;
    };
    $scope.findNodes = function () {
        $scope.results.length = 0;
        $scope.libraryData.forEach(function(entry) {
            findNodesHelper(entry);
        });
    };
    var findNodesHelper = function(node) {
        if (!node.nodes || node.nodes.length <= 0) {
            var queryLowercase = $scope.query.toLowerCase();
            var nodeTitle = node.title.toLowerCase();
            var ret = !(nodeTitle.indexOf(queryLowercase) === -1);
            if (ret) {
                var result = {name: node.title, id: node.id};
                $scope.results.push(result);
                if (!$scope.query || $scope.query.length <= 0) {
                    $scope.results.length = 0;
                }
            }
            return;
        }
        node.nodes.forEach(function(entry) {
            findNodesHelper(entry);
        });
    };
    $scope.results = [];

    // Library left sidebar data
    $scope.parts = ["material", "process", "transport", "use", "eol"];
    $scope.libraryData = JSON.parse(`[
        {
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
                                    'impact': 1,
                                    'nodes': []
                                }, {
                                    'id': 1112,
                                    'title': 'Acrylic acid production',
                                    'impact': 1,
                                    'nodes': []
                                }, {
                                    'id': 1113,
                                    'title': 'Formic acid production, methyl formate route',
                                    'impact': 1,
                                    'nodes': []
                                }
                            ]
                        },
                        {
                            'id': 112,
                            'title': 'Coastings, finishings',
                            'nodes': [
                                {
                                    'id': 1121,
                                    'title': 'Acrylic varnish production, product in 87.5% solution state',
                                    'impact': 1,
                                    'nodes': []
                                }, {
                                    'id': 1122,
                                    'title': 'Polyurethane production, flexible foam',
                                    'impact': 1,
                                    'nodes': []
                                }, {
                                    'id': 1123,
                                    'title': 'Polyurethane production, rigid foam',
                                    'impact': 1,
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
                                            'impact': 1,
                                            'nodes': []
                                        }, {
                                            'id': 12112,
                                            'title': 'Aluminium drilling, conventional',
                                            'impact': 1,
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
                                            'impact': 1,
                                            'nodes': []
                                        }, {
                                            'id': 121212,
                                            'title': 'Brass drilling, conventional',
                                            'impact': 1,
                                            'nodes': []
                                        }, {
                                            'id': 121213,
                                            'title': 'Brass production',
                                            'impact': 1,
                                            'nodes': []
                                        }, {
                                            'id': 121214,
                                            'title': 'Brass turning, average, conventional',
                                            'impact': 1,
                                            'nodes': []
                                        }, {
                                            'id': 121215,
                                            'title': 'Bronze production',
                                            'impact': 1,
                                            'nodes': []
                                        }, {
                                            'id': 121216,
                                            'title': 'Casting, bronze',
                                            'impact': 1,
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
                                            'impact': 1,
                                            'nodes': []
                                        }, {
                                            'id': 1222,
                                            'title': 'Cast iron milling, large parts',
                                            'impact': 1,
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
                                            'impact': 1,
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
                                    'impact': 1,
                                    'nodes': []
                                }, {
                                    'id': 1312,
                                    'title': 'Fibreboard production, hard, from virgin wood',
                                    'impact': 1,
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
                    'impact': 1,
                    'nodes': []
                },
                {
                    'id': 22,
                    'title': 'Section bar extrusion, aluminium',
                    'impact': 1,
                    'nodes': []
                },
                {
                    'id': 23,
                    'title': 'Drawing of pipe, steel',
                    'impact': 1,
                    'nodes': []
                },
                {
                    'id': 24,
                    'title': 'Hot rolling, steel',
                    'impact': 1,
                    'nodes': []
                },
                {
                    'id': 25,
                    'title': 'Powder coating, steel',
                    'impact': 1,
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
                    'impact': 1,
                    'nodes': []
                }, {
                    'id': 32,
                    'title': 'Market for transport, freight, aircraft',
                    'impact': 1,
                    'nodes': []
                }, {
                    'id': 33,
                    'title': 'Market for transport, freight, light commercial vehicle',
                    'impact': 1,
                    'nodes': []
                }, {
                    'id': 34,
                    'title': 'Market for transport, freight, sea, transoceanic ship',
                    'impact': 1,
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
                    'impact': 1,
                    'nodes': []
                }, {
                    'id': 42,
                    'title': 'Market for water, deionised, from tap water, at user',
                    'impact': 1,
                    'nodes': []
                }, {
                    'id': 43,
                    'title': 'Market for water, ultrapure',
                    'impact': 1,
                    'nodes': []
                }, {
                    'id': 44,
                    'title': 'Electricity production, hard coal',
                    'impact': 1,
                    'nodes': []
                }, {
                    'id': 45,
                    'title': 'Electricity production, hydro, pumped storage',
                    'impact': 1,
                    'nodes': []
                }, {
                    'id': 46,
                    'title': 'Electricity production, oil',
                    'impact': 1,
                    'nodes': []
                }, {
                    'id': 47,
                    'title': 'Market for electricity, low voltage',
                    'impact': 1,
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
                    'impact': 1,
                    'nodes': []
                }, {
                    'id': 52,
                    'title': 'Market for process-specific burdens, municipal waste incineration',
                    'impact': 1,
                    'nodes': []
                }, {
                    'id': 53,
                    'title': 'Recycling',
                    'impact': 1,
                    'nodes': []
                }
            ]
        }
    ]`);

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

    // Units tables
    $scope.massUnits = ["kg", "oz", "lb", "ton"];
    $scope.areaUnits = [("m2"), ("in2"), ("ft2")];
    // ("m" + "2".sup())
    $scope.transportUnits = ["ton*km"];


    // Config custom scrollbar for sidebar and assembly canvas
    // $scope.configScrollbar = {
    //     autoHideScrollbar: true,
    //     theme: 'dark-3',
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
}

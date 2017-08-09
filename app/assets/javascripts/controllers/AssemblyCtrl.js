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
        function($scope, assembliesFactory, assembly, $stateParams, Auth, $rootScope, $mdDialog){
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

            var c =
                [
                    {
                        "type": "container",
                        "name": "Memory",
                        "columns": [
                            [
                                {
                                    "type": "container",
                                    "name": "RAM",
                                    "columns": [
                                        [
                                            {
                                                "type": "material",
                                                "name": "Gold",
                                                "quantity": 1,
                                                "unit": "kg"
                                            },
                                            {
                                                "type": "container",
                                                "name": "DRAM",
                                                "columns": [
                                                    [
                                                        {
                                                            "type": "material",
                                                            "name": "Steel",
                                                            "quantity": 1,
                                                            "unit": "kg"
                                                        }
                                                    ]
                                                ]
                                            }
                                        ]
                                    ]
                                },
                                {
                                    "type": "material",
                                    "name": "Copper",
                                    "quantity": 1,
                                    "unit": "kg"
                                },
                                {
                                    "type": "material",
                                    "name": "Iron",
                                    "quantity": 1,
                                    "unit": "kg"
                                },
                                {
                                    "type": "material",
                                    "name": "Silver",
                                    "quantity": 1,
                                    "unit": "kg"
                                }
                            ]
                        ]
                    },
                    {
                        "type": "container",
                        "name": "Screen",
                        "columns":
                            [
                                [
                                    {
                                        "type": "container",
                                        "name": "LCD module",
                                        "columns":
                                            [
                                                [
                                                    {
                                                        "type": "material",
                                                        "name": "Gold",
                                                        "quantity": 1,
                                                        "unit": "kg"
                                                    },
                                                    {
                                                        "type": "container",
                                                        "name": "LED",
                                                        "columns":
                                                            [
                                                                [
                                                                    {
                                                                        "type": "material",
                                                                        "name": "Glass",
                                                                        "quantity": 1,
                                                                        "unit": "kg"
                                                                    }
                                                                ]
                                                            ]
                                                    }
                                                ]
                                            ]
                                    },
                                    {
                                        "type": "material",
                                        "name": "Copper",
                                        "quantity": 1,
                                        "unit": "kg"
                                    },
                                    {
                                        "type": "material",
                                        "name": "Iron",
                                        "quantity": 1,
                                        "unit": "kg"
                                    },
                                    {
                                        "type": "material",
                                        "name": "Silver",
                                        "quantity": 1,
                                        "unit": "kg"
                                    }
                                ]
                            ]
                    },
                    {
                        "type": "container",
                        "name": "Motherboard",
                        "columns": [
                            [
                                {
                                    "type": "container",
                                    "name": "PCIE-X",
                                    "columns":
                                        [
                                            [
                                                {
                                                    "type": "material",
                                                    "name": "Gold",
                                                    "quantity": 1,
                                                    "unit": "kg"
                                                },
                                                {
                                                    "type": "container",
                                                    "name": "Capacitor",
                                                    "columns": [
                                                        [
                                                            {
                                                                "type": "material",
                                                                "name": "Wood",
                                                                "quantity": 1,
                                                                "unit": "kg"
                                                            },
                                                            {
                                                                "type": "material",
                                                                "name": "Ceramics",
                                                                "quantity": 1,
                                                                "unit": "kg"
                                                            }
                                                        ]
                                                    ]
                                                },
                                                {
                                                    "type": "container",
                                                    "name": "Resistor",
                                                    "columns": [
                                                        [
                                                            {
                                                                "type": "material",
                                                                "name": "Wood",
                                                                "quantity": 1,
                                                                "unit": "kg"
                                                            },
                                                            {
                                                                "type": "material",
                                                                "name": "Ceramics",
                                                                "quantity": 1,
                                                                "unit": "kg"
                                                            }
                                                        ]
                                                    ]
                                                }
                                            ]
                                        ]
                                },
                                {
                                    "type": "material",
                                    "name": "Copper",
                                    "quantity": 1,
                                    "unit": "kg"
                                },
                                {
                                    "type": "material",
                                    "name": "Iron",
                                    "quantity": 1,
                                    "unit": "kg"
                                },
                                {
                                    "type": "material",
                                    "name": "Silver",
                                    "quantity": 1,
                                    "unit": "kg"
                                }
                            ]
                        ]
                    },
                    {
                        "type": "material",
                        "name": "Wood",
                        "quantity": 1,
                        "unit": "kg"
                    },
                    {
                        "type": "material",
                        "name": "Glass",
                        "quantity": 1,
                        "unit": "kg"
                    },
                    {
                        "type": "material",
                        "name": "PVC",
                        "quantity": 1,
                        "unit": "kg"
                    }
                ];
            $scope.assembly = {
                name: 'Computer',
                content: c
            }

        }]);

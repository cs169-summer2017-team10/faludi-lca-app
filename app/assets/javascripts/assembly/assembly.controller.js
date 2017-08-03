var app =angular.module('assembly.controller', ['dndLists', 'ui.materialize']);

    app.controller('assemblyController', ['$scope', function ($scope) {

        $scope.$watch('models.dropzones', function(model) {
            $scope.modelAsJson = angular.toJson(model, true);
        }, true);

        $scope.library = {
            selected: null,
            lib:
            [{
                //Materials
                "type": "container",
                "name": "Metals",
                "columns": [
                    {
                        "type": "container-lib",
                        "name": "Metal",
                        "columns": [
                            [
                                {
                                    "type": "material",
                                    "name": "Gold"
                                },
                                {
                                    "type": "material",
                                    "name": "Iron"
                                },
                                {
                                    "type": "material",
                                    "name": "Silver"
                                },
                                {
                                    "type": "material",
                                    "name": "Copper"
                                },
                            ]
                        ]
                    },
                    {
                        "type": "container-lib",
                        "name": "Nonmetal",
                        "columns": [
                            [
                                {
                                    "type": "material",
                                    "name": "PVC"
                                },
                                {
                                    "type": "material",
                                    "name": "Wood"
                                },
                                {
                                    "type": "material",
                                    "name": "Paper"
                                },
                                {
                                    "type": "material",
                                    "name": "Glass"
                                },
                            ]
                        ]
                    }
                ]
            },
            {
                // Processes
                "type": "container",
                "name": "Process",
                "columns": [
                    {
                        "type": "process",
                        "name": "Hot Rolling"
                    },
                    {
                        "type": "process",
                        "name": "Cold Rolling"
                    }
                ]
            },
            {
                // Processes
                "type": "container",
                "name": "Transportation",
                "columns": [
                    {
                        "type": "process",
                        "name": "Air"
                    },
                    {
                        "type": "process",
                        "name": "Boat"
                    },
                    {
                        "type": "process",
                        "name": "Truck"
                    },
                    {
                        "type": "process",
                        "name": "Train"
                    },
                ]
            }]
        }

        $scope.assembly = {
            selected: null,
            templates: [
                {type: "material", name: "new"},
                {type: "container", name: "new", columns: [[], []]}
            ],
            dropzones: {
                "MacBook Pro": [
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
                                                "name": "Gold"
                                            },
                                            {
                                                "type": "container",
                                                "name": "DRAM",
                                                "columns": [
                                                    [
                                                        {
                                                            "type": "material",
                                                            "name": "Steel"
                                                        }
                                                    ]
                                                ]
                                            }
                                        ]
                                    ]
                                },
                                {
                                    "type": "material",
                                    "name": "Copper"
                                },
                                {
                                    "type": "material",
                                    "name": "Iron"
                                },
                                {
                                    "type": "material",
                                    "name": "Silver"
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
                                                "name": "Gold"
                                            },
                                            {
                                                "type": "container",
                                                "name": "LED",
                                                "columns":
                                                [
                                                    [
                                                        {
                                                            "type": "material",
                                                            "name": "Glass"
                                                        }
                                                    ]
                                                ]
                                            }
                                        ]
                                    ]
                                },
                                {
                                    "type": "material",
                                    "name": "Copper"
                                },
                                {
                                    "type": "material",
                                    "name": "Iron"
                                },
                                {
                                    "type": "material",
                                    "name": "Silver"
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
                                                "name": "Gold"
                                            },
                                            {
                                                "type": "container",
                                                "name": "Capacitor",
                                                "columns": [
                                                    [
                                                        {
                                                            "type": "material",
                                                            "name": "Wood"
                                                        },
                                                        {
                                                            "type": "material",
                                                            "name": "Ceramics"
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
                                                            "name": "Wood"
                                                        },
                                                        {
                                                            "type": "material",
                                                            "name": "Ceramics"
                                                        }
                                                    ]
                                                ]
                                            }
                                        ]
                                    ]
                                },
                                {
                                    "type": "material",
                                    "name": "Copper"
                                },
                                {
                                    "type": "material",
                                    "name": "Iron"
                                },
                                {
                                    "type": "material",
                                    "name": "Silver"
                                }
                            ]
                        ]
                    },
                    {
                        "type": "material",
                        "name": "Wood"
                    },
                    {
                        "type": "material",
                        "name": "Glass"
                    },
                    {
                        "type": "material",
                        "name": "PVC"
                    }
                ]
            }
        };

    }]);
angular.module('assembly.controller', ['dndLists', 'ui.materialize'])
    .controller('assemblyController', ['$scope', function ($scope) {

        $scope.menu = {
            selected: null,
            lists: {"A": [], "B": []}
        };

        // Generate initial model for Material/Process Menu List
        for (var i = 1; i <= 3; ++i) {
            $scope.menu.lists.A.push({label: "Item A" + i});
            $scope.menu.lists.B.push({label: "Item B" + i});
        }

        $scope.collapsibleElements = [{
            icon: 'mdi-image-filter-drama',
            title: 'First',
            content: 'Lorem ipsum dolor sit amet.'
        },{
            icon: 'mdi-maps-place',
            title: 'Second',
            content: 'Lorem ipsum dolor sit amet.'
        },{
            icon: 'mdi-social-whatshot',
            title: 'Third',
            content: 'Lorem ipsum dolor sit amet.'
        }
        ];

        // Generate initial model for Building Blocks
        $scope.models = {
            selected: null,
            templates: [
                {type: "item", id: 2},
                {type: "container", id: 1, columns: [[], []]}
            ],
            dropzones: {
                "A": [
                    {
                        "type": "container",
                        "id": 1,
                        "columns": [
                            [
                                {
                                    "type": "item",
                                    "id": "1"
                                },
                                {
                                    "type": "item",
                                    "id": "2"
                                }
                            ],
                            [
                                {
                                    "type": "item",
                                    "id": "3"
                                }
                            ]
                        ]
                    },
                    {
                        "type": "item",
                        "id": "4"
                    },
                    {
                        "type": "item",
                        "id": "5"
                    },
                    {
                        "type": "item",
                        "id": "6"
                    }
                ],
                "B": [
                    {
                        "type": "item",
                        "id": 7
                    },
                    {
                        "type": "item",
                        "id": "8"
                    },
                    {
                        "type": "container",
                        "id": "2",
                        "columns": [
                            [
                                {
                                    "type": "item",
                                    "id": "9"
                                },
                                {
                                    "type": "item",
                                    "id": "10"
                                },
                                {
                                    "type": "item",
                                    "id": "11"
                                }
                            ],
                            [
                                {
                                    "type": "item",
                                    "id": "12"
                                },
                                {
                                    "type": "container",
                                    "id": "3",
                                    "columns": [
                                        [
                                            {
                                                "type": "item",
                                                "id": "13"
                                            }
                                        ],
                                        [
                                            {
                                                "type": "item",
                                                "id": "14"
                                            }
                                        ]
                                    ]
                                },
                                {
                                    "type": "item",
                                    "id": "15"
                                },
                                {
                                    "type": "item",
                                    "id": "16"
                                }
                            ]
                        ]
                    },
                    {
                        "type": "item",
                        "id": 16
                    }
                ]
            }
        };

        $scope.$watch('models.dropzones', function(model) {
            $scope.modelAsJson = angular.toJson(model, true);
        }, true);

    }]);
angular.module('assembly.controller', ['dndLists', 'ui.materialize'])
    .controller('assemblyController', ['$scope', function ($scope) {

        $scope.$watch('models.dropzones', function(model) {
            $scope.modelAsJson = angular.toJson(model, true);
        }, true);

        $scope.assembly = {
            "name": "Type assembly name here",
            "items": []
        }

        $scope.subassembly = {
            "name": "Type subassembly name here",
            "type": "subassembly",
            "items": []
        }

        $scope.library = [
            {
                "name": "Materials",
                "items": [
                    {
                        "name": "Metals",
                        "type": "category",
                        "items": [
                            {
                                "name": "Common metals",
                                "type": "category",
                                "items": [
                                    {
                                        "name": "Steel",
                                        "type": "material",
                                        "processes": [],
                                         "quantity": 0,
                                        "units": "kg"
                                    },
                                    {
                                        "name": "Copper",
                                        "type": "material",
                                        "processes": [],
                                        "quantity": 0,
                                        "units": "kg"
                                    },
                                    {
                                        "name": "Tin",
                                        "type": "material",
                                        "processes": [],
                                        "quantity": 0,
                                        "units": "kg"
                                    }
                                ]
                            }
                        ]
                    },

                    {
                        "name": "Acids",
                        "type": "category",
                        "items": []
                    }
                ]
            },

            {
                "name": "Processes",
                "items": [
                    {
                        "name": "Hot Rolling",
                        "type": "process",
                        "quantity": 0,
                        "units": "kg"
                    },
                    {
                        "name": "Cold Rolling",
                        "type": "process",
                        "quantity": 0,
                        "units": "kg"
                    },
                    {
                        "name": "Air Transport",
                        "type": "process",
                        "quantity": 0,
                        "units": "km"
                    }
                ]
            }

        ]

    }]);
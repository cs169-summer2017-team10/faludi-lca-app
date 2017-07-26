angular.module('assembly.controller', ['dndLists', 'ui.materialize'])
    .controller('assemblyController', ['$scope', function ($scope) {

        $scope.models = {
            selected: null,
            lists: {"A": [], "B": []}
        };

        // Generate initial model
        for (var i = 1; i <= 3; ++i) {
            $scope.models.lists.A.push({label: "Item A" + i});
            $scope.models.lists.B.push({label: "Item B" + i});
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

    }]);
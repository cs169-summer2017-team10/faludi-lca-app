(function() {
    angular.module('focusLcaApp')
        .controller('GraphCtrl', GraphCtrl);

    GraphCtrl.$inject = ['$scope', '$mdDialog'];

    function GraphCtrl($scope, $mdDialog) {
        $scope.hello = "Hello World";

        $scope.hide = function() {
            $mdDialog.hide();
        };

        $scope.cancel = function() {
            $mdDialog.cancel();
        };

        $scope.answer = function(answer) {
            $mdDialog.hide(answer);
        };

        $scope.recurse_subassembly = function recursive_subassembly(hash, arr) {
            if (hash instanceof Array) {
                var total = [0, 0, 0];
                hash.forEach(function(entry) {
                    total = recursive_subassembly(entry, total);
                });
                return total;
            } else {
                if (hash.type === "material") {
                    arr[0] += 2 *  hash.quantity ;
                    arr[1] += 0.8;
                    arr[2] += 0.8;
                    return arr
                } else {
                    var temp_total =  recursive_subassembly(hash.columns, arr);
                    arr[0] += temp_total[0];
                    arr[1] += temp_total[1];
                    arr[2] += temp_total[2];
                    return arr
                }
            }
        };

        $scope.analyze = function() {
            var data = {};
            var labels = [];
            var avg = [];
            var low_uncertainty = [];
            var high_uncertainty = [];
            $scope.assembly.content.forEach(function(parts) {
                labels.push(parts.name);
                if (parts.type === "container") {
                    var total = [0, 0, 0];
                    parts.columns.forEach(function(child) {
                        total = $scope.recurse_subassembly(child, total);
                    });
                    avg.push(total[0]);
                    low_uncertainty.push(total[1]);
                    high_uncertainty.push(total[2]);
                } else {
                    var average = 2 * parts.quantity;
                    avg.push(average);
                    var low = 0.8;
                    low_uncertainty.push(low);
                    var high = 0.8;
                    high_uncertainty.push(high);
                }
            });
            data.labels = labels;
            data.average = avg;
            data.low = low_uncertainty;
            data.high = high_uncertainty;
            return data;
        };

        //$scope.graph_data = $scope.analyze();

        //var ctx = document.getElementById('myChart').getContext('2d');
        //console.log(document.getElementById("myChart"));
        // console.log(angular.element(document.querySelector('#myChart')));
        //  var ctx = angular.element("#myChart").getContext('2d');
        // console.log(ctx);
        // var chart = new Chart(ctx, {
        //     // The type of chart we want to create
        //     type: 'line',
        //
        //     // The data for our dataset
        //     data: {
        //         labels: ["January", "February", "March", "April", "May", "June", "July"],
        //         datasets: [{
        //             label: "My First dataset",
        //             backgroundColor: 'rgb(255, 99, 132)',
        //             borderColor: 'rgb(255, 99, 132)',
        //             data: [0, 10, 5, 2, 20, 30, 45],
        //         }]
        //     },
        //
        //     // Configuration options go here
        //     options: {}
        // });

    }
})();
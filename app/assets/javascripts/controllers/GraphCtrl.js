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

        $scope.analyze = function( assembly ) {
            var data = {};
            var labels = [];
            var avg = [];
            var low_uncertainty = [];
            var high_uncertainty = [];

            assembly.forEach(function( parts ) {
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

        // Initialize graph data
        $scope.graph_data = $scope.analyze( $scope.assembly.content );

        // Plot graph function
        $scope.plot_graph = function( _graph_data, _assembly ) {
            var ctx = document.getElementById('myChart').getContext("2d");
            var chart = new Chart(ctx, {
                // The type of chart we want to create
                type: 'bar',

                // The data for our dataset
                data: {
                    labels: _graph_data.labels,
                    datasets: [{
                        label: "Carbon Emissions",
                        backgroundColor: 'rgb(255, 99, 132)',
                        borderColor: 'rgb(255, 99, 132)',
                        data: _graph_data.average
                    }]
                },

                // Configuration options go here
                options: {
                    responsive: false,
                    maintainAspectRatio: true,
                    scales: {
                        yAxes: [{
                            display: false,
                            ticks: {
                                beginAtZero: true   // minimum value will be 0.
                            }
                        }]
                    }
                }
            });

            // Update graph as user click on one of the bar
            document.getElementById("myChart").onclick = function(evt)
            {
                var activePoints = chart.getElementsAtEvent(evt);

                if(activePoints.length > 0)
                {
                    //get the internal index of slice in pie chart
                    var clickedElementindex = activePoints[0]["_index"];

                    if ( typeof( _assembly[clickedElementindex].columns ) === "undefined" ){
                        // This is a material
                        alert( " This is a material ");
                    }else{
                        // This is a container
                        // Update graph data
                        $scope.graph_data = $scope.analyze( _assembly[clickedElementindex].columns[0] );

                        // Update current assembly
                        _assembly = _assembly[clickedElementindex].columns[0];

                        // Update chart data points
                        chart.config.data.datasets[0].data = $scope.graph_data.average;

                        // Update chart labels
                        chart.config.data.labels = $scope.graph_data.labels;

                        // Update chart
                        chart.update();
                    }
                }
            }
        };

        angular.element(document).ready(function(){
            // Plot graph once the page is properly loaded
            $scope.plot_graph( $scope.graph_data, $scope.assembly.content );
        });
    }
})();
(function() {
    angular.module('focusLcaApp')
        .controller('GraphCtrl', GraphCtrl);

    GraphCtrl.$inject = ['$scope', '$mdDialog'];


    function GraphCtrl($scope, $mdDialog) {

        $scope.hello = "Hello World";

        $scope.uncertainty = [0.8, 1.0, 1.2];

        // Helper function
        var roundToOneDecimal = function(x) {
            return Math.round( 10 * x )/10;
        };

        $scope.hide = function() {
            $mdDialog.hide();
        };

        $scope.cancel = function() {
            $mdDialog.cancel();
        };

        $scope.plot_graph = function( option ) {
            // $mdDialog.hide(answer);
            if (option === 'blur-graph'){
                $scope.reset_graph();
                $scope.plot_blur_graph( $scope.graph_data );
            }else if( option === 'bar-graph'){
                $scope.reset_graph();
                $scope.plot_bar_graph( $scope.graph_data, $scope.assembly.content );
            }else if( option === 'step-graph'){
                $scope.reset_graph();
                $scope.plot_step_graph( $scope.graph_data, $scope.assembly.content );
            }else{

            }
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
                    arr[0] += Math.round( 10 * $scope.uncertainty[1] * hash.quantity ) / 10;
                    arr[1] += Math.round( 10 * $scope.uncertainty[0] * hash.quantity ) / 10;
                    arr[2] += Math.round( 10 * $scope.uncertainty[2] * hash.quantity ) / 10;
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
                    var average = Math.round( 10 * $scope.uncertainty[1] * parts.quantity ) /10;
                    avg.push(average);
                    var low = Math.round( 10 * $scope.uncertainty[0] * parts.quantity ) / 10;
                    low_uncertainty.push(low);
                    var high = Math.round( 10 * $scope.uncertainty[2] * parts.quantity ) / 10;
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

        $scope.zoom_in = function( _assembly, chart ){
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

        // Plot graph function
        $scope.plot_bar_graph = function( _graph_data, _assembly ) {
            document.getElementById('myChart').innerHTML = "";
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
            $scope.zoom_in( _assembly, chart );
        };

        // Plot graph function
        $scope.plot_blur_graph = function( _graph_data, _assembly) {

            document.getElementById('myChart').innerHTML = "";
            var ctx = document.getElementById('myChart').getContext("2d");

            var gradient_blue = ctx.createLinearGradient( 0, 0, 0, 500 );
            gradient_blue.addColorStop(1, 'rgba(255, 99, 132, 1.0)');
            gradient_blue.addColorStop(0, 'white');

            var solid = 'rgba(255, 99, 132, 1.0)';

            var chart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: _graph_data.labels,
                    datasets: [
                        {
                            label: 'Certain',
                            data: _graph_data.average,
                            backgroundColor: solid,
                            hoverBackgroundColor: solid,
                            hoverBorderWidth: 2,
                            hoverBorderColor: 'lightgrey'
                        },
                        {
                            label: 'Uncertain',
                            data: _graph_data.high,
                            backgroundColor: gradient_blue ,
                            hoverBackgroundColor: gradient_blue,
                            hoverBorderWidth: 2,
                            hoverBorderColor: 'lightgrey'
                        },
                    ]
                },
                options: {
                    animation: {
                        duration: 10,
                    },
                    tooltips: {
                        mode: 'label',
                        callbacks: {
                            label: function(tooltipItem, data) {
                                return data.datasets[tooltipItem.datasetIndex].label + ": " + roundToOneDecimal(tooltipItem.yLabel);
                            }
                        }
                    },
                    scales: {
                        xAxes: [{
                            stacked: true,
                            gridLines: { display: false },
                        }],
                        yAxes: [{
                            stacked: true,
                            ticks: {
                                callback: function(value) { return roundToOneDecimal(value); },
                            },
                        }],
                    }, // scales
                    legend: {display: true}
                } // options
            });
        };

        // Plot graph function
        $scope.plot_step_graph = function( _graph_data ) {

            // Clone the data
            var graph_data = JSON.parse(JSON.stringify(_graph_data));

            document.getElementById('myChart').innerHTML = "";
            var ctx = document.getElementById('myChart').getContext("2d");

            var gradient_blue = [ 'rgba(255, 99, 132, 1.0)', 'rgba(255, 99, 132, 0.7)', 'rgba(255, 99, 132, 0.2)'];

            for ( var i = 0 ; i < graph_data.average.length ; i++){
                graph_data.high[i] = graph_data.high[i] -  graph_data.average[i];
                graph_data.average[i] = graph_data.average[i] -  graph_data.low[i];
            }

            var chart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: _graph_data.labels,
                    datasets: [
                        {
                            label: 'Low',
                            data: graph_data.low,
                            backgroundColor: gradient_blue[0],
                            hoverBackgroundColor: gradient_blue[0],
                            hoverBorderWidth: 2,
                            hoverBorderColor: 'lightgrey'
                        },
                        {
                            label: 'Average',
                            data: graph_data.average,
                            backgroundColor: gradient_blue[1] ,
                            hoverBackgroundColor: gradient_blue[1],
                            hoverBorderWidth: 2,
                            hoverBorderColor: 'lightgrey'
                        },
                        {
                            label: 'High',
                            data: graph_data.high,
                            backgroundColor: gradient_blue[2] ,
                            hoverBackgroundColor: gradient_blue[2],
                            hoverBorderWidth: 2,
                            hoverBorderColor: 'lightgrey'
                        },
                    ]
                },
                options: {
                    animation: {
                        duration: 10,
                    },
                    tooltips: {
                        mode: 'label',
                        callbacks: {
                            label: function(tooltipItem, data) {
                                return data.datasets[tooltipItem.datasetIndex].label + ": " + roundToOneDecimal(tooltipItem.yLabel);
                            }
                        }
                    },
                    scales: {
                        xAxes: [{
                            stacked: true,
                            gridLines: { display: false },
                        }],
                        yAxes: [{
                            stacked: true,
                            ticks: {
                                callback: function(value) { return roundToOneDecimal(value); },
                            },
                        }],
                    }, // scales
                    legend: {display: true}
                } // options
            });
        };

        // This function remove the graph canvas
        $scope.reset_graph = function(){
            $('#myChart').remove(); // this is my <canvas> element
            $('#myChartParent').append('<canvas id="myChart" width="900px" height="375px"></canvas>');
        };

        angular.element(document).ready(function(){
            // Plot graph once the page is properly loaded
            $scope.plot_bar_graph( $scope.graph_data, $scope.assembly.content );
        });
    }
})();
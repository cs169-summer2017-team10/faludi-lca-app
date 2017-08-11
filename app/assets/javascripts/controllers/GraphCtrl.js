var a = (function() {
    angular.module('focusLcaApp')
        .controller('GraphCtrl', GraphCtrl);

    GraphCtrl.$inject = ['$scope', '$mdDialog'];


    function GraphCtrl($scope, $mdDialog) {

        $scope.hello = "Hello World";

        $scope.uncertainty = [1.0, 0.8, 1.2];

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
            $scope.reset_graph();
            angular.element(document).ready(function() {
                if (option === 'blur-graph'){
                    $scope.plot_blur_graph( $scope.graph_data );
                }else if( option === 'bar-graph'){
                    $scope.plot_bar_graph( $scope.graph_data, $scope.assembly.content );
                }else if( option === 'step-graph'){
                    $scope.plot_step_graph( $scope.graph_data, $scope.assembly.content );
                }
            });
        };

        var recursive_subassembly = function(hash, arr) {
            if (hash instanceof Array) {
                var total = [0, 0, 0];
                hash.forEach(function(entry) {
                    total = recursive_subassembly(entry, total);
                });
                return total;
            } else {
                if (hash.type === "material" || hash.type === "process") {
                    for( var i = 0 ; i < 2 ; i ++){
                        arr[i] += $scope.cal_impact ( $scope.uncertainty[i],  hash );
                    }
                    return arr
                } else {
                    var temp_total = recursive_subassembly(hash.columns, arr);
                    arr[0] += temp_total[0];
                    arr[1] += temp_total[1];
                    arr[2] += temp_total[2];
                    return arr
                }
            }
        };

        $scope.cal_impact = function ( uncertainty, hash ) {
            var val = uncertainty * hash.quantity * hash.impact;
            if ( hash.unit === 'lb' ){
                return Math.round( 100 *  0.45359237 * val ) / 100 ;
            }else if( hash.unit === 'oz' ){
                return Math.round( 100 *  0.0283495231 * val ) / 100;
            }else if( hash.unit === 'kg' ){
                return Math.round( 100 * val ) / 100;
            }else if( hash.unit === 'ton' ){
                return Math.round( 100 * 1000 * val ) / 100;
            }else{
                console.error("Don't know how to convert " + hash.unit + " to kg");
                return Math.round( 100 *  val ) / 100;
            }
        };

        $scope.analyze = function( assembly ) {
            console.log( assembly );
            var data = {};
            var labels = [];
            var avg = [];
            var low_uncertainty = [];
            var high_uncertainty = [];

            assembly.forEach(function( parts ) {
                if ( parts.name.length > 40 ){
                    parts.name = String( parts.name ).substring(0, 15) + "..." + String( parts.name ).substring(parts.name.length-15, parts.name.length)
                }
                labels.push(parts.name);
                if (parts.type === "subassembly") {
                    var total = [0, 0, 0];
                    parts.columns.forEach(function(child) {
                        total = recursive_subassembly(child, total);
                    });
                    avg.push(total[0]);
                    low_uncertainty.push(total[1]);
                    high_uncertainty.push(total[2]);
                } else {
                    var average = $scope.cal_impact( $scope.uncertainty[0], parts );
                    avg.push(average);
                    var low = $scope.cal_impact( $scope.uncertainty[1], parts );
                    low_uncertainty.push(low);
                    var high = $scope.cal_impact( $scope.uncertainty[2], parts );
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

        $scope.zoom_in_subassembly = function(_assembly, chart ){
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
                        // console.log( " This is a material " );
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
            // document.getElementById('myChart').innerHTML = "";
            var ctx = document.getElementById('myChart').getContext("2d");
            var chart = new Chart(ctx, {
                // The type of chart we want to create
                type: 'bar',

                // The data for our dataset
                data: {
                    labels: _graph_data.labels,
                    datasets: [
                        $scope.dataset_template("Carbon Emissions", _graph_data.average,  'rgb(255, 99, 132)' )
                    ]
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
            $scope.zoom_in_subassembly( _assembly, chart );
        };

        $scope.step_and_blur_options = {
            animation: {
                duration: 10
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
                    gridLines: { display: false }
                }],
                    yAxes: [{
                    stacked: true,
                    ticks: {
                        callback: function(value) { return roundToOneDecimal(value); }
                    }
                }]
            }, // scales
            legend: {display: true}
        };

        // Plot graph function
        $scope.plot_blur_graph = function( _graph_data ) {

            // document.getElementById('myChart').innerHTML = "";
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
                        $scope.dataset_template('Certain', _graph_data.average, solid),
                        $scope.dataset_template('Uncertain', _graph_data.high, gradient_blue),
                    ]
                },
                options: $scope.step_and_blur_options
            });
        };

        // Plot graph function
        $scope.plot_step_graph = function( _graph_data ) {

            // document.getElementById('myChart').innerHTML = "";
            // Clone the data
            var graph_data = JSON.parse(JSON.stringify(_graph_data));

            var ctx = document.getElementById('myChart').getContext("2d");

            var gradient_blue = [ 'rgba(255, 99, 132, 0.7)', 'rgba(255, 99, 132, 1.0)', 'rgba(255, 99, 132, 0.2)'];

            for ( var i = 0 ; i < graph_data.average.length ; i++){
                graph_data.high[i] = graph_data.high[i] -  graph_data.average[i];
                graph_data.average[i] = graph_data.average[i] -  graph_data.low[i];
            }

            var chart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: _graph_data.labels,
                    datasets: [
                        $scope.dataset_template('Low', graph_data.low, gradient_blue[1]),
                        $scope.dataset_template('Avg', graph_data.average, gradient_blue[0]),
                        $scope.dataset_template('High', graph_data.high, gradient_blue[2])
                    ]
                },
                options: $scope.step_and_blur_options

            });
        };

        $scope.dataset_template = function(_label, _data, _color){
            return {
                label: _label,
                data: _data,
                backgroundColor: _color ,
                hoverBackgroundColor: _color,
                hoverBorderWidth: 2,
                hoverBorderColor: 'lightgrey'
            }
        };

        // This function remove the graph canvas
        $scope.reset_graph = function(){
            $('#myChart').remove(); // this is my <canvas> element
            $('#myChartParent').append('<canvas id="myChart" width="900px" height="375px"></canvas>');
        };

        angular.element(document).ready(function(){
            // Plot graph once the page is properly loaded
            $scope.plot_graph( 'bar-graph' );
        });
    }
})();
console.log("hello");

var context; 
var data;
var pieData;
var barData;
var variableData;

var chart;
var chartExists = false;


var topNames = ["'Italy', 'UK', 'USA', 'Germany', 'France', 'Japan'"];
var sideNames = ['2010 customers #','2014 customers #'];
var dataTable = [ 	[2500, 1902, 1041, 610, 1245, 952]
					[3104, 1689, 1318, 589, 1199, 1436]	];

function createArray(length) {
    var arr = new Array(length || 0),
        i = length;

    if (arguments.length > 1) {
        var args = Array.prototype.slice.call(arguments, 1);
        while(i--) arr[length-1 - i] = createArray.apply(this, args);
    }

    return arr;
}

function drawPie(){
		data = pieData;
		if (chartExists){
			chart.destroy();
		}
		chart = new Chart(context).Pie(data);
		chartExists = true;
}

function drawBar(){
		data = barData;
		if (chartExists){
			chart.destroy();
		}
		chart = new Chart(context).Bar(data);
		chartExists = true;
}


$(document).on('turbolinks:load', function() {
 
	context = document.getElementById('myCanvas').getContext('2d');	

	pieData = [
	   {
	      value: 25,
	      label: 'Java',
	      color: '#811BD6'
	   },
	   {
	      value: 10,
	      label: 'Scala',
	      color: '#9CBABA'
	   },
	   {
	      value: 30,
	      label: 'PHP',
	      color: '#D18177'
	   },
	   {
	      value : 35,
	      label: 'HTML',
	      color: '#6AE128'
	   }
	];

	barData = {
    labels: ['Italy', 'UK', 'USA', 'Germany', 'France', 'Japan'],
    datasets: [
        {
            label: '2010 customers #',
            fillColor: '#382765',
            data: [2500, 1902, 1041, 610, 1245, 952]
        },
        {
            label: '2014 customers #',
            fillColor: '#7BC225',
            data: [3104, 1689, 1318, 589, 1199, 1436]
        }
    ]


	};

	variableData = [];
    

	$('#pieGraph').click(drawPie);
	$('#barGraph').click(drawBar);

	$('#myCanvas').width(400);
	$('#myCanvas').height(400);

});
	

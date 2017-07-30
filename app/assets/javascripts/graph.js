console.log("hello");

var context; 
var data;
var pieData;
var barData;
var chart;
var chartExists = false;

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

function parseSMP(array){
	data = {};
	labels = [array.length];
	for (i = 0; i < array.length; i++) {
    	labels[i] = array[i].name;
	}
	data.push(labels);
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


	$('#pieGraph').click(drawPie);
	$('#barGraph').click(drawBar);

	$('#myCanvas').width(400);
	$('#myCanvas').height(400);

});

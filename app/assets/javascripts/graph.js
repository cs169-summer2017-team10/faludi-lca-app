/**
 * Created by LuisAlba on 8/5/17.
 */
var context;
//var data;
var pieData;
var barData;
var variableData;

var chart;
var chartExists = false;

var data = gon.data;

function drawBar1() {
    if (chartExists){
        chart.destroy();
    }
    fomated_data = {
        labels: data[0],
        datasets: [
            {
                data: data[1]
            }
        ]

    };
    chart = new Chart(context).bar(formated_data);
}

function drawBlurred(params) {

}


// function drawPie() {
//     data = pieData;
//     if (chartExists){
//         chart.destroy();
//     }
//     chart = new Chart(context).Pie(data);
//     chartExists = true;
// }
//
// function drawBar() {
//     data = barData;
//     if (chartExists){
//         chart.destroy();
//     }
//     chart = new Chart(context).Bar(data);
//     chartExists = true;
// }


$(document).on('turbolinks:load', function() {

    context = document.getElementById('myCanvas').getContext('2d');

    // pieData = [
    //     {
    //         value: 25,
    //         label: 'Java',
    //         color: '#811BD6'
    //     },
    //     {
    //         value: 10,
    //         label: 'Scala',
    //         color: '#9CBABA'
    //     },
    //     {
    //         value: 30,
    //         label: 'PHP',
    //         color: '#D18177'
    //     },
    //     {
    //         value : 35,
    //         label: 'HTML',
    //         color: '#6AE128'
    //     }
    // ];
    //
    // barData = {
    //     labels: ['Italy', 'UK', 'USA', 'Germany', 'France', 'Japan'],
    //     datasets: [
    //         {
    //             label: '2010 customers #',
    //             fillColor: '#382765',
    //             data: [2500, 1902, 1041, 610, 1245, 952]
    //         },
    //         {
    //             label: '2014 customers #',
    //             fillColor: '#7BC225',
    //             data: [3104, 1689, 1318, 589, 1199, 1436]
    //         }
    //     ]
    //
    //
    // };
    //
    // variableData = [];

    drawBar1();


    //$('#pieGraph').click(drawPie);
    $('#barGraph').click(drawBar1);

    $('#myCanvas').width(500);
    $('#myCanvas').height(500);

});
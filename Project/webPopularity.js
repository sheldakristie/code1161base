// GLOBALS
var url = "https://raw.githubusercontent.com/atiredturtle/code1161base/master/Project/Web_Scrapped_websites.csv";
var CSVdata;
var dict = {};


function drawRegionsMap() {
  var data = google.visualization.arrayToDataTable([
    ['Country', 'Popularity', "Test 2"],
    ['Germany', 200, 1],
    ['United States', 300, 1],
    ['Brazil', 400, 1],
    ['Canada', 500, 1],
    ['France', 600, 1],
    ['RU', 700, 1]
  ]);

  var options = {};

  var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));

  chart.draw(data, options);
}


Papa.parse(url, {
    download: true,
    header: true,
    skipEmptyLines: true,
    complete: function(results) {  
        console.log("CSV Loaded!");
        CSVdata = results;
        processData(CSVdata.data);
        //reduceDict(dict, 30);
        //console.log(dict);
        //drawChart(dict);
        google.charts.load('current', {'packages':['geochart']});
        google.charts.setOnLoadCallback(drawRegionsMap);
    }
});


function processData(d){
  for (var i = 0; i < d.length; i++){
    console.log(d.country);
  }
}
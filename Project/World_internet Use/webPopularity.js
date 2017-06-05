// GLOBALS
var url = "https://raw.githubusercontent.com/atiredturtle/code1161base/master/Project/Web_Scrapped_websites.csv";
var CSVdata;
var dict = {};


function drawRegionsMap() {
  var data = google.visualization.arrayToDataTable(generateArray(dict));

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
        //console.log(CSVdata);
        processData(CSVdata.data);
        generateArray(dict);
        //reduceDict(dict, 30);
        //console.log(dict);
        //drawChart(dict);
        // google.charts.load('current', {'packages':['geochart']});
        // google.charts.setOnLoadCallback(drawRegionsMap);
    }
});


function processData(d){
    for (var i = 0; i < d.length; i++){
        var popularWebsites;
        var country = d[i].country;
        if (country in dict){
            dict[country].push(d[i].Website);
        } else {
            dict[country] = []
        }
    }
}

function generateArray(d){
    var arr = [];
    var header = [];
    for (var i = 0; i < 1; i++){
        header.push("Website" + (i+1));
    }
    arr.push(header);
    console.log(typeof header);
    for (var key in d) {
        var subArr = [];
        console.log(key);
        subArr.push(key);
        for (var i = 0; i < 1; i++){
            subArr.push(d[key][i]);
        }
        arr.push(subArr);
    }
    console.log(arr);
    return arr;
}









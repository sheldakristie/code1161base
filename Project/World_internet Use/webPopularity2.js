// GLOBALS
var url = "https://raw.githubusercontent.com/atiredturtle/code1161base/master/Project/Web_Scrapped_websites.csv";
var CSVdata;
var dict = {};
var NUM_FAVS = 5


function drawRegionsMap() {

    var data = google.visualization.arrayToDataTable(generateArray(dict));

    var options = {
        tooltip: {
            isHtml: true
        }
    };

    var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));

    function selectHandler(){
        var selectedItem = chart.getSelection()[0];
        if (selectedItem) {
            var country = data.getValue(selectedItem.row, 0);
            alert('The user selected ' + country);
        }
    } 

    // add EventListener to chart
    google.visualization.events.addListener(chart, 'select', selectHandler);    

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
        //generateArray(dict);
        //reduceDict(dict, 30);
        //console.log(dict);
        //drawChart(dict);
        google.charts.load('current', {'packages':['geochart']});
        google.charts.setOnLoadCallback(drawRegionsMap);
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
    var header = [{id:'Country', type:'string'}, {type:'string', role:'tooltip', p:{html:true}}];

    console.log(header);
    arr.push(header);
    for (var key in d) {
        var subArr = [];
        subArr.push(key);
        var websites = "<ol>";
        for (var i = 0; i < NUM_FAVS; i++){
            websites += "<li>";
            websites += d[key][i];
            websites += "</li>"
        }
        websites += "</ol>";
        subArr.push(websites);
        arr.push(subArr);
    }
    console.log(arr);

    return arr;
}









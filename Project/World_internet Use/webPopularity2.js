// GLOBALS
var url = "https://raw.githubusercontent.com/atiredturtle/code1161base/master/Project/Web_Scrapped_websites.csv";
var CSVdata;
var dict = {};
var NUM_FAVS = 5
var website_to_draw = "www.facebook.com"; // default
var allSites = [];

function drawRegionsMap() {
    // var nameValue = document.getElementById("uniqueID").value;
    // console.log(nameValue);
    var data = google.visualization.arrayToDataTable(generateArray(dict, website_to_draw));

    var options = {
        tooltip: {
            isHtml: true
        },
        sizeAxis:{
            maxValue: 50
        },
        colorAxis: {
            colors: ['#00FF00', '#FF0000']
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

$("#websiteSearch").autocomplete({
    lookup: allSites,
    onSelect: function (suggestion) {
        website_to_draw = $('#websiteSearch').val();
        drawRegionsMap();
    }
});

function processData(d){
    var tempSites = [];
    for (var i = 0; i < d.length; i++){
        var popularWebsites;
        var country = d[i].country;
        var website = d[i].Website;
        if (country in dict){
            dict[country].push(website);
        } else {
            dict[country] = [];
        }
        tempSites.push(website);
    }


    // make tempSites unique
    tempSites = tempSites.filter(function(elem, index, self) {
        return index == self.indexOf(elem);
    });

    // place websites in allSites list as object
    for (var i = 0; i < tempSites.length; i++){
        allSites.push({ value: tempSites[i] });
    }
}
 


function generateArray(d, searchSite){
    var arr = [];
    var header = ['Country', 'Popularity'];
    
    arr.push(header);
    for (var key in d) {
        var subArr = [];
        subArr.push(key);
        var popularity = null; // defaults 
        for (var i = 0; i < d[key].length; i++){
            if (d[key][i] == searchSite){
                popularity = i+1;
                subArr.push(popularity);
                arr.push(subArr);
            }
        }
    }
    return arr;
}

$('#websiteSearch').change(function(){
    website_to_draw = $('#websiteSearch').val();
    drawRegionsMap();
});
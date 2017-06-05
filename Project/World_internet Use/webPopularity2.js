// GLOBALS
var url = "https://raw.githubusercontent.com/atiredturtle/code1161base/master/Project/Web_Scrapped_websites.csv";
var CSVdata;
var dict = {};
var NUM_FAVS = 5
var website_to_draw = "www.facebook.com";

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

new autoComplete({
    selector: 'input[name="websiteSearch"]',
    minChars: 1,
    source: function(term, suggest){
        term = term.toLowerCase();
        var choices = ['ActionScript', 'AppleScript', 'Asp'];
        var matches = [];
        for (i=0; i<choices.length; i++)
            if (~choices[i].toLowerCase().indexOf(term)) matches.push(choices[i]);
        suggest(matches);
    },
    renderItem: function (item, search){
        search = search.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
        var re = new RegExp("(" + search.split(' ').join('|') + ")", "gi");
        return '<div class="autocomplete-suggestion" data-val="' + item + '">' + item.replace(re, "<b>$1</b>") + '</div>';
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
    console.log("www."+ $('#websiteSearch').val()+".com");
    website_to_draw = "www."+ $('#websiteSearch').val()+".com";
    drawRegionsMap()
});

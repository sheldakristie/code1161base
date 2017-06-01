// loads trump's tweets and gives the most common words
var url = "https://raw.githubusercontent.com/atiredturtle/code1161base/master/Project/Donald-Tweets!.csv";

var loaded = false;
var CSVdata;
var dict = {};

Papa.parse(url, {
    download: true,
    header: true,
    skipEmptyLines: true,
    complete: function(results) {  
        console.log("CSV Loaded!");
        CSVdata = results;
        processData(CSVdata.data);
        reduceDict(dict, 30);
        console.log(dict);
        drawChart(dict);
    }
});


function processData(d){
    //console.log(d);
    for (var i = 0; i < 1000/*d.length*/; i++){
    	//console.log("Filtering tweet ("+i+"/"+d.length+")");
        var sentence = d[i].Tweet_Text.split(" ");
        for (var j = 0; j < sentence.length; j++){	
        	var word = sentence[j];
        	word = word.replace(/[\.?!\_(),-]/g, '');
        	word = word.toLowerCase();
        	if (word.indexOf("https:") !== -1 || // remove links
        		word.indexOf("@") !== -1) // remove retweets
        	{ 
        		word = "";
        	}
	        if (word != ""){
		        if (word in dict){
		             dict[word]++;
		        } else {
		            dict[word] = 1;
		        }
		    }
		}
    }
}

function reduceDict(d, size){
	console.log(Object.keys(d).length);
	var currsize = Object.keys(d).length;
	var min = 1;
	while (currsize > size){
		var newDict = {};
		for (var key in d){
			if (d[key] > min){
				newDict[key] = d[key];
			}
		}
		min++;
		currsize = Object.keys(newDict).length;
		console.log(currsize + " " + min);
	}
	dict = newDict;
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomColor(){
    var r = getRandomInt(0, 255);
    var g = getRandomInt(0, 255);
    var b = getRandomInt(0, 255);
    return 'rgba('+r+', '+g+', '+b+', 0.6)';
}

function drawChart(dict){
    var my_keys = [];
    var my_data = [];
    var my_colors = [];
    for (var key in dict) {
        my_keys.push(key);
        my_data.push(dict[key]);
        my_colors.push(getRandomColor());
    }

    var ctx = "myChart";
    var myChart = new Chart(ctx, {
        type: 'bubble',
        data: {
            labels: my_keys,
            datasets: [{
                label: 'Frequency of words in Trump tweets',
                data: my_data,
                backgroundColor: my_colors,
            }]
        },
        options: {
            responsive: false
        }
    });
}
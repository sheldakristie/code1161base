function trumpChart(argument) {
        // loads trump's tweets and gives the most common words
    var url = "https://raw.githubusercontent.com/atiredturtle/code1161base/master/Project/Donald-Tweets!.csv";
    console.log("loading trump");
    var loaded = false;
    var CSVdata;

    var ctx = "myChart";
    console.log(ctx.data);
    if (ctx.data != undefined) removeData(ctx);

    Papa.parse(url, {
        download: true,
        header: true,
        skipEmptyLines: true,
        complete: function(results) {  
            console.log("CSV Loaded!");
            CSVdata = results;
            var dict = trump_processData(CSVdata.data);
            dict = trump_reduceDict(dict, 30);
            trump_drawChart(dict);
        }
    });
}


function trump_processData(d){
    var newdict = {};
    //console.log(d);
    for (var i = 0; i < d.length; i++){
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
		        if (word in newdict){
		             newdict[word]++;
		        } else {
		            newdict[word] = 1;
		        }
		    }
		}
    }
    return newdict;

}

function trump_reduceDict(d, size){
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
		//console.log(currsize + " " + min);
	}
	return newDict;
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

function trump_drawChart(dict){
	// sort dict
    var sortedKeys = Object.keys(dict).sort(function(a, b) {
	  return dict[b] - dict[a];
	});
    var my_keys = [];
    var my_data = [];
    var my_colors = [];
    for (var i = 0; i < sortedKeys.length ; i++) {
    	//console.log(sortedKeys[i]);
        my_keys.push(sortedKeys[i]);
        my_data.push(dict[sortedKeys[i]]);
        my_colors.push(getRandomColor());
    }

    var ctx = "myChart";
    var myChart = new Chart(ctx, {
        type: 'bar',
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

function removeData(chart) {
    chart.data.labels.pop();
    chart.data.datasets.forEach((dataset) => {
        dataset.data.pop();
    });
    chart.update();
}
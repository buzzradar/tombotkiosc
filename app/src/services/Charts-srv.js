/*jslint node: true, unused: true, esnext: true */


const _ = require("lodash");

const DisplayGlobals_SRV = require('./DisplayGlobals-srv'); 
const Utils_SRV = require('./Utils-srv'); 



//--------------------------------------
// CONSTRUCTOR
//--------------------------------------

let _Charts_SRV;
let _arrayColors = ['#404040','#F6921E','#77C0B2','#ff0000'];
let _arrayColorsSentiment = ['#8dd73e','#e44e5c','#acacac'];

function Charts_SRV () {

  _Charts_SRV = this;


}






function _loadBarChart(dataProvider) {

	var barChart = AmCharts.makeChart("chartdiv",
		{
			"type": "serial",
			"categoryField": "date",
			"dataDateFormat": "YYYY-MM-DD",
			"export": {
				"enabled": false
			},
			"categoryAxis": {
				"gridPosition": "start",
			},
			"chartCursor": {
				"enabled": true,
				"oneBalloonOnly": true,
				"balloonPointerOrientation": " vertical"
			},
			"trendLines": [],
			"graphs": [
						{
							"balloonText": "[[value]]",
							"fillAlphas": 1,
							"fillColors": '#77C0B2',
							"lineColor": '#57b1a0',
							"lineThickness": 2,
							"type": "column",
							"valueField": "percent",
						}
					],
			"guides": [],
			"valueAxes": [
				{
					"id": "ValueAxis-1",
				}
			],
			"allLabels": [],
			"balloon": {},
			"fontSize" : 15,

			// "legend": {
			// 	"enabled": true,
			// 	"align": "center",
			//     "autoMargins":false,
			//     "fontSize" : 25,
			//     "markerType" : "square",
			//     "markerSize" : 25,
			//     "markerLabelGap" : 20,

			// },
			"dataProvider": dataProvider
		}
	);

	return barChart;

}



function _fixDataProviderFromMarius(dataProvider) {

	$.each(dataProvider, function( index, item ) {
	  console.log(item);
	  item.date = String(item.date);
	  item.percent = String(item.percent);
	});

	return dataProvider;

}


























































function _loadSerialChart(dataProvider, dateFormat) {

	var serialChart = AmCharts.makeChart("chartdiv",
		{
			"type": "serial",
			"categoryField": "date",
			"dataDateFormat": _getSerialDateFormat(dateFormat),
			"export": {
				"enabled": false
			},
			"categoryAxis": {
				"gridPosition": "start",
        		"minPeriod": "hh",
				"parseDates": true
			},
			"chartCursor": {
				"enabled": true,
				"balloonPointerOrientation": " vertical",
				"oneBalloonOnly": true
			},
			"trendLines": [],
			"graphs": _getSerialGraphsObject(dataProvider),
			"guides": [],
			"valueAxes": [
				{
					"id": "ValueAxis-1",
					"minimum": 0,
					"precision": 2,
					"stackType": "regular",
					"totalTextOffset": -2,
					"unitPosition": "left"
				},
				{
					"id": "ValueAxis-2",
					"minimum": 1,
					"position": "right",
					"precision": 2,
					"unitPosition": "left",
					"gridAlpha": 0,
					"titleRotation": 0
				}
			],
			"allLabels": [],
			"balloon": {},
			"fontSize" : 15,

			// "legend": {
			// 	"enabled": true,
			// 	"align": "center",
			//     "autoMargins":false,
			//     "fontSize" : 25,
			//     "markerType" : "square",
			//     "markerSize" : 25,
			//     "markerLabelGap" : 20,

			// },
			"titles": [],
			"dataProvider": dataProvider
		}
	);

	return serialChart;

}

function _getSerialDateFormat(dateFormat) {

	if(!dateFormat) dateFormat = 'daily';
	var format = (dateFormat == "hourly") ? 'YYYY-MM-DD HH:NN:SS' : 'YYYY-MM-DD';
	return format;

}



function _getSerialGraphsObject(dataProvider) {

	var graphs = [];
	var i = 0;

	for (var property in dataProvider[0]) {

		if ( !property.includes("date") ) {
			//console.log(property);

			var obj = 	{
					//"balloonText": "[[title]]: £[[value]]",
					"bullet": "round",
					"lineColor": _arrayColors[i],
					"title": "XXXXXX",
					"valueField": "XXXXXXX"
				};

			obj.title = _transformTitle(property);
			obj.valueField = property;
			graphs.push(obj);

			i++;

		}


	}

	return graphs;

}



function _transformTitle(valueField) {

	var newName = '';

	$.each(valueField.split("_"), function( index, value ) {
	  newName += ' '+_.capitalize(value);
	});
	return newName;

}










































function _loadPieChart(dataProvider) {

	var pieChart = AmCharts.makeChart("chartdiv",
		{
			"type": "pie",
			"fontFamily" :  'Quicksand, sans-serif',
			"balloonText": "",
			"labelRadius": "-30%",
			"labelText": "[[percents]]%",
			"colorField": "color",
			"hideLabelsPercent": 5,
			"titleField": "category",
			"valueField": "value",
			"color": "#404040",
			"allLabels": [],
			"balloon": {},
			"fontSize" : 15,
			"addClassNames": true,
			"legend": {
			   	"position":"right",
			    "marginRight":100,
			    "autoMargins":false,
			    "fontSize" : 25,
			    "markerType" : "square",
			    "markerSize" : 15,
			    "markerLabelGap" : 20,
			    "verticalGap" : 20,
			},
			"titles": [],
			"dataProvider": _getPieColors(dataProvider)
		}
	);

	return pieChart;

}



function _getPieColors(dataProvider) {


	var i = 0;
	$.each(dataProvider, function( index, value ) {

	  	if (value.category.toLowerCase() === "positive"){
	  		value['color'] = _arrayColorsSentiment[0];
	  	}else if (value.category.toLowerCase() === "negative"){
	  		value['color'] = _arrayColorsSentiment[1];
	  	}else if (value.category.toLowerCase() === "neutral"){
	  		value['color'] = _arrayColorsSentiment[2];
	  	}else{
	  		value['color'] = _arrayColors[i];
	  		i++;
	  	}

	});

	return dataProvider;

}















































Charts_SRV.prototype.loadBarChart = function(dataProvider) {

	return _loadBarChart.call(this,dataProvider);

};


Charts_SRV.prototype.loadSerialChart = function(dataProvider,dateFormat) {

	return _loadSerialChart.call(this,dataProvider, dateFormat);

};


Charts_SRV.prototype.loadPieChart = function(dataProvider) {

	return _loadPieChart.call(this,dataProvider);

};





















module.exports = new Charts_SRV ();

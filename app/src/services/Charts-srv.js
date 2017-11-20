/*jslint node: true, unused: true, esnext: true */


const _ = require("lodash");

const DisplayGlobals_SRV = require('./DisplayGlobals-srv'); 
const Utils_SRV = require('./Utils-srv'); 



//--------------------------------------
// CONSTRUCTOR
//--------------------------------------

let _Charts_SRV;

function Charts_SRV () {

  _Charts_SRV = this;


}






function _loadBarChart(dataProvider) {

	AmCharts.makeChart("chartdiv",
		{
			"type": "serial",
			"categoryField": "date",
			"dataDateFormat": "YYYY-MM-DD",
			"export": {
				"enabled": false
			},
			"categoryAxis": {
				"gridPosition": "start",
				"parseDates": true
			},
			"chartCursor": {
				"enabled": true,
				"oneBalloonOnly": true,
				"balloonPointerOrientation": " vertical"
			},
			"trendLines": [],
			"graphs": [
				{
					"balloonText": "Paid Reach: [[value]]",
					"fillAlphas": 1,
					"fillColors": "#77C0B2",
					"id": "AmGraph-2",
					"lineColor": "#77C0B2",
					"lineThickness": 0,
					"title": "Paid Reach",
					"type": "column",
					"valueField": "paid_reach"
				}
			],
			"guides": [],
			"valueAxes": [
				{
					"id": "ValueAxis-1",
					"stackType": "regular",
				}
			],
			"allLabels": [],
			"balloon": {},
			"legend": {
				"enabled": true,
				"align": "center"
			},
			"dataProvider": dataProvider
		}
	);

}






function _loadSerialChart(dataProvider) {

	AmCharts.makeChart("chartdiv",
		{
			"type": "serial",
			"categoryField": "date",
			"dataDateFormat": "YYYY-MM-DD",
			"export": {
				"enabled": false
			},
			"categoryAxis": {
				"gridPosition": "start",
				"parseDates": true
			},
			"chartCursor": {
				"enabled": true,
				"balloonPointerOrientation": " vertical",
				"oneBalloonOnly": true
			},
			"trendLines": [],
			"graphs": [
				{
					"balloonText": "[[title]]: £[[value]]",
					"bullet": "round",
					"id": "AmGraph-1",
					"lineColor": "#F6921E",
					"title": "CPC",
					"valueField": "CPC"
				},
				{
					"balloonText": "[[title]]: £[[value]]",
					"bullet": "round",
					"id": "AmGraph-3",
					"lineColor": "#77C0B2",
					"title": "CPM",
					"valueField": "CPM"
				},
				{
					"balloonText": "[[title]]: £[[value]]",
					"bullet": "round",
					"id": "AmGraph-6",
					"lineColor": "#404040",
					"title": "Total Spend",
					"valueAxis": "ValueAxis-2",
					"valueField": "Spend"
				}
			],
			"guides": [],
			"valueAxes": [
				{
					"id": "ValueAxis-1",
					"minimum": 0,
					"precision": 2,
					"stackType": "regular",
					"totalTextOffset": -2,
					"unit": "£",
					"unitPosition": "left"
				},
				{
					"id": "ValueAxis-2",
					"minimum": 1,
					"position": "right",
					"precision": 2,
					"unit": "£",
					"unitPosition": "left",
					"gridAlpha": 0,
					"titleRotation": 0
				}
			],
			"allLabels": [],
			"balloon": {},
			"legend": {
				"enabled": true,
				"align": "center"
			},
			"titles": [],
			"dataProvider": dataProvider
		}
	);

}




function _loadPieChart(dataProvider) {

	AmCharts.makeChart("chartdiv",
		{
			"type": "pie",
			"balloonText": "",
			"labelRadius": "-30%",
			"labelText": "[[percents]]%",
			"colorField": "color",
			"hideLabelsPercent": 5,
			"titleField": "category",
			"valueField": "column-1",
			"color": "#FFFFFF",
			"allLabels": [],
			"balloon": {},
			"legend": {
				"enabled": true,
				"align": "center",
				"markerType": "circle"
			},
			"titles": [],
			"dataProvider": dataProvider
		}
	);

}




Charts_SRV.prototype.loadBarChart = function(dataProvider) {

	_loadBarChart.call(this,dataProvider);

};


Charts_SRV.prototype.loadSerialChart = function(dataProvider) {

	_loadSerialChart.call(this,dataProvider);

};


Charts_SRV.prototype.loadPieChart = function(dataProvider) {

	_loadPieChart.call(this,dataProvider);

};


















module.exports = new Charts_SRV ();

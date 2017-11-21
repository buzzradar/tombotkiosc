/*jslint node: true, unused: true, esnext: true */


const HBTemplates_SRV = require('../services/HBTemplates-srv');
const Charts_SRV = require('../services/Charts-srv');

let _nodeUtil = require('util');
let _eventEmitter3 = require('eventemitter3');



// ------------------------------------
// Constructor
// ------------------------------------

function ContentBubble_Ctrl (botIcon) {

	this.bubble_DOM = $('.content-info');
	this.botIcon = botIcon;
	this.content_DOM = null;
	this.introId = 0;
	this.introInTimer = null;
	this.introOutTimer = null;
	this.chart = null;

	this.introMOD_Array = 	[
							{
								type : 'bar',
								title : 'Hi! I am TomBot the AI Social Data Analyst',
								copy : 'Namaste. Do you want to sell a New Age product and/or service? Tired of coming up with meaningless copy for your starry-eyed customers? Want to join the ranks of bestselling self-help authors? We can help.',
								question : 'What are the top trends at CES today?',
								dataProvider: [{"date":"2017-02-11","organic_reach":5918,"paid_reach":6208},{"date":"2017-02-12","organic_reach":14377,"paid_reach":72589},{"date":"2017-02-13","organic_reach":14079,"paid_reach":51783},{"date":"2017-02-14","organic_reach":23749,"paid_reach":106508},{"date":"2017-02-15","organic_reach":24137,"paid_reach":114305},{"date":"2017-02-16","organic_reach":10125,"paid_reach":47634},{"date":"2017-02-17","organic_reach":7982,"paid_reach":17067},{"date":"2017-02-18","organic_reach":2241,"paid_reach":14692},{"date":"2017-02-19","organic_reach":17246,"paid_reach":54426},{"date":"2017-02-20","organic_reach":14706,"paid_reach":74782},{"date":"2017-02-21","organic_reach":21557,"paid_reach":97222},{"date":"2017-02-22","organic_reach":22246,"paid_reach":117480},{"date":"2017-02-23","organic_reach":18460,"paid_reach":71019},{"date":"2017-02-24","organic_reach":8747,"paid_reach":18952},{"date":"2017-02-25","organic_reach":5456,"paid_reach":29563},{"date":"2017-02-26","organic_reach":17430,"paid_reach":40745},{"date":"2017-02-27","organic_reach":15525,"paid_reach":56324},{"date":"2017-02-28","organic_reach":27813,"paid_reach":119911},{"date":"2017-03-01","organic_reach":29418,"paid_reach":84731},{"date":"2017-03-02","organic_reach":17480,"paid_reach":45396},{"date":"2017-03-03","organic_reach":4713,"paid_reach":7466},{"date":"2017-03-04","organic_reach":1450,"paid_reach":27545},{"date":"2017-03-05","organic_reach":16468,"paid_reach":51824},{"date":"2017-03-06","organic_reach":12940,"paid_reach":42163},{"date":"2017-03-07","organic_reach":23687,"paid_reach":93645},{"date":"2017-03-08","organic_reach":29495,"paid_reach":116639},{"date":"2017-03-09","organic_reach":15853,"paid_reach":59688},{"date":"2017-03-10","organic_reach":9530,"paid_reach":12281},{"date":"2017-03-11","organic_reach":4655,"paid_reach":25650},{"date":"2017-03-12","organic_reach":10306,"paid_reach":62717},{"date":"2017-03-13","organic_reach":12054,"paid_reach":41944}],
							},
							{
								type : 'serial',
								title : 'Hi! I am TomBot the AI Social Data Analyst',
								copy : 'Namaste. Do you want to sell a New Age product and/or service? Tired of coming up with meaningless copy for your starry-eyed customers? Want to join the ranks of bestselling self-help authors? We can help.',
								question : 'What is the most talked about industry right now? ',
								dataProvider: [{"date":"2017-02-11","CPC":"3.61","CPM":"8.43","Spend":"38.14"},{"date":"2017-02-12","CPC":"5.95","CPM":"7.71","Spend":"27.05"},{"date":"2017-02-13","CPC":"2.67","CPM":"8.08","Spend":"30.39"},{"date":"2017-02-14","CPC":"4.33","CPM":"8.19","Spend":"20.13"},{"date":"2017-02-15","CPC":"2.26","CPM":"8.99","Spend":"20"},{"date":"2017-02-16","CPC":"2.94","CPM":"7.5","Spend":"33.99"},{"date":"2017-02-17","CPC":"5.71","CPM":"8.08","Spend":"30.77"},{"date":"2017-02-18","CPC":"5.92","CPM":"7.37","Spend":"35.42"},{"date":"2017-02-19","CPC":"1.8","CPM":"8.97","Spend":"37.64"},{"date":"2017-02-20","CPC":"5.08","CPM":"7.91","Spend":"37.34"},{"date":"2017-02-21","CPC":"2.71","CPM":"8.28","Spend":"29.18"},{"date":"2017-02-22","CPC":"4.73","CPM":"7.98","Spend":"23.92"},{"date":"2017-02-23","CPC":"3.47","CPM":"7.52","Spend":"39.55"},{"date":"2017-02-24","CPC":"4.06","CPM":"8.2","Spend":"38.72"},{"date":"2017-02-25","CPC":"5.59","CPM":"8.71","Spend":"25.17"},{"date":"2017-02-26","CPC":"4.75","CPM":"7.67","Spend":"31.79"},{"date":"2017-02-27","CPC":"3.91","CPM":"7.12","Spend":"20.29"},{"date":"2017-02-28","CPC":"3.29","CPM":"8.66","Spend":"27.76"},{"date":"2017-03-01","CPC":"3.87","CPM":"7.01","Spend":"34.17"},{"date":"2017-03-02","CPC":"3.04","CPM":"7.31","Spend":"37.01"},{"date":"2017-03-03","CPC":"2.88","CPM":"8.77","Spend":"31.8"},{"date":"2017-03-04","CPC":"3.97","CPM":"8.35","Spend":"26.87"},{"date":"2017-03-05","CPC":"5.05","CPM":"8.19","Spend":"21.88"},{"date":"2017-03-06","CPC":"2.28","CPM":"7.06","Spend":"25.22"},{"date":"2017-03-07","CPC":"2.14","CPM":"7.2","Spend":"25.06"},{"date":"2017-03-08","CPC":"5.48","CPM":"7.38","Spend":"30.98"},{"date":"2017-03-09","CPC":"5.44","CPM":"8","Spend":"38.47"},{"date":"2017-03-10","CPC":"1.61","CPM":"8.73","Spend":"30.28"},{"date":"2017-03-11","CPC":"5.58","CPM":"8.5","Spend":"24.6"},{"date":"2017-03-12","CPC":"5.62","CPM":"8.9","Spend":"36.4"},{"date":"2017-03-13","CPC":"3.54","CPM":"8.98","Spend":"31.64"}],
							},
							{
								type : 'pie',
								title : 'Hi! I am TomBot the AI Social Data Analyst',
								copy : 'Namaste. Do you want to sell a New Age product and/or service? Tired of coming up with meaningless copy for your starry-eyed customers? Want to join the ranks of bestselling self-help authors? We can help.',
								question : 'How many people are talking about CES this week?',
								dataProvider: [{category:"13-17","column-1":"518",color:"#F6921E"},{category:"18-24","column-1":"1043",color:"#F79E37"},{category:"25-34","column-1":"1630",color:"#F79E37"},{category:"35-44","column-1":"1824",color:"#F9B669"},{category:"45-54","column-1":"1093",color:"#FAC282"},{category:"55-64","column-1":"675",color:"#FBCE9B"},{category:"65+","column-1":"183",color:"#FCDAB4"}],
							},
	];

	_init.call(this);

}
_nodeUtil.inherits(ContentBubble_Ctrl,_eventEmitter3); // extend _eventEmitter3 so we can use the event methods in LocalLib



function _init() {
	
	_initTimer.call(this);
	_startIntro.call(this);

}




function _initTimer() {

	var self = this;

	//Anim In Timer
	this.introInTimer = {
	    handle: 0,
	    start: function() {
	        this.stop();
	        this.handle = setTimeout(_animBubbleOut.bind(self), 5000);
	    },
	    stop: function() {
	        if (this.handle) {
	            clearTimeout(this.handle);
	            this.handle = 0;
	        }
	    }
	};

	//Anim Out Timer
	this.introOutTimer = {
	    handle: 0,
	    start: function() {
	        this.stop();
	        this.handle = setTimeout(_loadNextIntro.bind(self), 1000);
	    },
	    stop: function() {
	        if (this.handle) {
	            clearTimeout(this.handle);
	            this.handle = 0;
	        }
	    }
	};

}




function _loadNextIntro(){

	_destroyChart.call(this);
	_renderContent.call(this, 'intro_content',this.introMOD_Array[this.introId]);		

	//prepare next slideId
	this.introId ++;
	if (this.introId >= this.introMOD_Array.length){
		this.introId = 0;
	}

}


function _renderContent(templateId, content_MOD) {

	console.log("_renderContent....", content_MOD);

	this.content_DOM = HBTemplates_SRV.getTemplate(templateId, content_MOD);

	//Add the layout to the Speechbubble and then update with the MODEL
	this.bubble_DOM.html( this.content_DOM );

	//Content
	switch(content_MOD.type) {
		case 'bar':
			this.chart = Charts_SRV.loadBarChart.call(this,content_MOD.dataProvider);
		break;
		case 'serial':
			this.chart = Charts_SRV.loadSerialChart.call(this,content_MOD.dataProvider);
		break;
		case 'pie':
			this.chart = Charts_SRV.loadPieChart.call(this,content_MOD.dataProvider);
		break;
	}

	this.bubble_DOM.find('.ask-me').click(_stopSlides.bind(this));
	_animBubbleIn.call(this);
	
	if(templateId === "intro_content") this.introInTimer.start();

}


function _animBubbleIn() {

	console.log("anim-in!!!!!!!!!!!!!!!!!!!!!!");
	this.bubble_DOM.removeClass('anim-out').addClass('anim-in');

}


function _animBubbleOut() {

	console.log("anim-out!!!!!!!!!!!!!!!!!!!!!!");
	this.bubble_DOM.removeClass('anim-in').addClass('anim-out');
	this.introOutTimer.start();

}





function _stopSlides() {

	console.log("stop intro....");
	this.bubble_DOM.removeClass('anim-in').addClass('anim-out');
	this.introOutTimer.stop();
	this.introInTimer.stop();

	setTimeout(_dispatchIntroStopped.bind(this),500);

}


function _dispatchIntroStopped() {

	_destroyChart.call(this);
	this.emit.call(this,"intro_slides_stopped");

}


function _startIntro() {

	console.log("start intro....");
	_loadNextIntro.call(this);
	
}

function _destroyChart() {

	if (this.chart) {
		this.chart.clear();
		this.chart = null;
	}

}


























ContentBubble_Ctrl.prototype.loadTomBotAnswer = function(answer_MOD) {

	_renderContent.call(this, 'graph_item',answer_MOD);		

};















module.exports = ContentBubble_Ctrl;
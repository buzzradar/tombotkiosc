/*jslint node: true, unused: true, esnext: true */


const _ = require("lodash");
const DisplayGlobals_SRV = require('../services/DisplayGlobals-srv'); 
const HBTemplates_SRV = require('../services/HBTemplates-srv');
const Charts_SRV = require('../services/Charts-srv');
const AIAgent_SRV = require('../services/AIAgent-srv'); 

let _nodeUtil = require('util');
let _eventEmitter3 = require('eventemitter3');



// ------------------------------------
// Constructor
// ------------------------------------

function ContentBubble_Ctrl (botIcon) {

	this.bubble_DOM = $('.content-info');
	this.botIcon = botIcon;
	this.content_DOM = null;
	this.chart = null;
	this.currentEvent = 0;
	
	_init.call(this);

}
_nodeUtil.inherits(ContentBubble_Ctrl,_eventEmitter3); // extend _eventEmitter3 so we can use the event methods in LocalLib



function _init() {


}




function _setChartHeight() {

	var height = $(window).height();
	var topOffset = this.bubble_DOM.offset().top;
	var footerHeight = 20;
	var chartHeight = Math.round(height-topOffset-footerHeight);

	console.log(height, topOffset, footerHeight, chartHeight);

	$('#chartdiv').css('height', chartHeight);

}



function _renderContent(content_MOD) {

	var self = this;
	this.bubble_DOM.height('auto');
	switch(content_MOD.type) {

		case "help":
			this.content_DOM = HBTemplates_SRV.getTemplate('help_item', content_MOD);
		break;
		case "graph":
			this.content_DOM = HBTemplates_SRV.getTemplate('graph_item', content_MOD);
		break;
		case "photo":
			this.content_DOM = HBTemplates_SRV.getTemplate('photo_item', content_MOD);
		break;
		case "tweet":
			this.content_DOM = HBTemplates_SRV.getTemplate('tweet_item', content_MOD);
		break;
		case "news":
			this.content_DOM = HBTemplates_SRV.getTemplate('news_item', content_MOD);
		break;
		case "ces_events":
			content_MOD = setContent_Module_Events(content_MOD);
			this.content_DOM = HBTemplates_SRV.getTemplate('events_item', content_MOD);
		break;
		case "ces_stats":
			this.content_DOM = HBTemplates_SRV.getTemplate('stats_item', content_MOD);
		break;
		case "unknown":
			this.content_DOM = HBTemplates_SRV.getTemplate('unknown', content_MOD);
		break;

	}

	this.bubble_DOM.html( this.content_DOM );

	//Content
	if(content_MOD.hasOwnProperty("graph")){

		_setChartHeight.call(this);

		switch(content_MOD.graph) {
			case 'bar':
				this.chart = Charts_SRV.loadBarChart.call(this,content_MOD.dataProvider);
			break;
			case 'serial':
				this.chart = Charts_SRV.loadSerialChart.call(this,content_MOD.dataProvider, content_MOD.dateFormat);
			break;
			case 'pie':
				this.chart = Charts_SRV.loadPieChart.call(this,content_MOD.dataProvider);
			break;
		}
	}

	this.bubble_DOM.find('.ask-me').click(_stopSlides.bind(this));
	this.bubble_DOM.find('.suggested-question').click(_suggestedQuestionClicked);
	_animBubbleIn.call(this);

	function _stopSlides() {

		this.bubble_DOM.removeClass('anim-in').addClass('anim-out');
		setTimeout(_dispatchAskNewQuestion.bind(this),500);

	}
	
	function _suggestedQuestionClicked(e) {
		e.preventDefault();
		var question = $(this).attr('data-question');
		self.bubble_DOM.removeClass('anim-in').addClass('anim-out');
		setTimeout(_dispatchSuggestedQuestion.bind(self,question),500);
	}




	//for events only
	if (content_MOD.type == "ces_events") {
		_renderEvent.call(this, content_MOD);
		this.bubble_DOM.find('.previous-events-btn').click(_previousEventClicked.bind(this, content_MOD));
		this.bubble_DOM.find('.next-events-btn').click(_nextEventClicked.bind(this, content_MOD));
	}


}


function setContent_Module_Events(content_MOD) {

	content_MOD["answer"] = "I have found "+content_MOD.dataProvider.length+" Events";

	return content_MOD;

}


function _animBubbleIn() {

	// console.log("anim-in!!!!!!!!!!!!!!!!!!!!!!");
	this.bubble_DOM.removeClass('anim-out').addClass('anim-in');

}


function _animBubbleOut() {

	// console.log("anim-out!!!!!!!!!!!!!!!!!!!!!!");
	this.bubble_DOM.removeClass('anim-in').addClass('anim-out');

}


function _dispatchAskNewQuestion() {

	_destroyChart.call(this);
	this.emit.call(this,"ask_new_question");

}


function _dispatchSuggestedQuestion(question) {

	console.log(question,this);
	this.emit.call(this,"suggested_question",{"question":question,"isHuman":false});

}



function _destroyChart() {

	if (this.chart) {
		this.chart.clear();
		this.chart = null;
	}

}











//----------------------------------------------
//Events


function _renderEvent(content_MOD) {

	console.log(content_MOD.dataProvider[this.currentEvent]);

	var eventHolder_DOM = this.bubble_DOM.find('.keynotes').find('.item');
	content_MOD.dataProvider[this.currentEvent]["numEvent"] = this.currentEvent + 1;
	var event_rendered_DOM = HBTemplates_SRV.getTemplate('event_layout', content_MOD.dataProvider[this.currentEvent]);

	eventHolder_DOM.html(event_rendered_DOM);

}

function _previousEventClicked(content_MOD) {

	this.currentEvent --;
	if (this.currentEvent < 0) {
		this.currentEvent = content_MOD.dataProvider.length - 1;
	}

	_renderEvent.call(this, content_MOD);

	console.log("previous", this.currentEvent);

}

function _nextEventClicked(content_MOD) {

	this.currentEvent ++;
	if (this.currentEvent > content_MOD.dataProvider.length - 1) {
		this.currentEvent = 0;
	}

	_renderEvent.call(this, content_MOD);

	console.log("next", this.currentEvent);

}

































ContentBubble_Ctrl.prototype.renderAnswer = function(content_MOD) {

	_renderContent.call(this, content_MOD);		

};


ContentBubble_Ctrl.prototype.animContentOut = function() {

	_animBubbleOut.call(this);		

};




















module.exports = ContentBubble_Ctrl;
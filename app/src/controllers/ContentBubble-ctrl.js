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
	
	_init.call(this);

}
_nodeUtil.inherits(ContentBubble_Ctrl,_eventEmitter3); // extend _eventEmitter3 so we can use the event methods in LocalLib



function _init() {
	
	// _initTimer.call(this);
	// _startIntro.call(this);

}





function _renderContent(content_MOD) {

	switch(content_MOD.type) {

		case "help":
			this.content_DOM = HBTemplates_SRV.getTemplate('help_item', content_MOD);
		break;
		case "intro":
			this.content_DOM = HBTemplates_SRV.getTemplate('intro_item', content_MOD);
		break;
		case "graph":
			this.content_DOM = HBTemplates_SRV.getTemplate('graph_item', content_MOD);
		break;

	}

	this.bubble_DOM.html( this.content_DOM );

	//Content
	if(content_MOD.hasOwnProperty("graph")){
		switch(content_MOD.graph) {
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
	}

	this.bubble_DOM.find('.ask-me').click(_stopSlides.bind(this));
	_animBubbleIn.call(this);
	


}


function _animBubbleIn() {

	console.log("anim-in!!!!!!!!!!!!!!!!!!!!!!");
	this.bubble_DOM.removeClass('anim-out').addClass('anim-in');

}


function _animBubbleOut() {

	console.log("anim-out!!!!!!!!!!!!!!!!!!!!!!");
	this.bubble_DOM.removeClass('anim-in').addClass('anim-out');

}





function _stopSlides() {

	console.log("stop intro....");
	this.bubble_DOM.removeClass('anim-in').addClass('anim-out');


	setTimeout(_dispatchIntroStopped.bind(this),500);

}


function _dispatchIntroStopped() {

	_destroyChart.call(this);
	this.emit.call(this,"intro_stopped");

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
































ContentBubble_Ctrl.prototype.renderAnswer = function(content_MOD) {

	_renderContent.call(this, content_MOD);		

};


ContentBubble_Ctrl.prototype.animContentOut = function() {

	_animBubbleOut.call(this);		

};




















module.exports = ContentBubble_Ctrl;
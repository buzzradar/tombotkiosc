/*jslint node: true, unused: true, esnext: true */



const HBTemplates_SRV = require('../services/HBTemplates-srv');
const Charts_SRV = require('../services/Charts-srv');

let _nodeUtil = require('util');
let _eventEmitter3 = require('eventemitter3');



// ------------------------------------
// Constructor
// ------------------------------------

function IntroSlides_Ctrl (bubbleDOM,introSlidesMOD_Array) {

	this.bubble_DOM = bubbleDOM;
	this.slidesMOD_Array = introSlidesMOD_Array;
	this.slide_DOM = HBTemplates_SRV.getTemplate('intro_slide');
	this.slideId = 0;
	this.sliderInTimer = null;
	this.sliderOutTimer = null;
	this.chart = null;

	_init.call(this);

}
_nodeUtil.inherits(IntroSlides_Ctrl,_eventEmitter3); // extend _eventEmitter3 so we can use the event methods in LocalLib



function _init() {

	_initTimer.call(this);
	_startSlides.call(this);

}


function _initTimer() {

	var self = this;

	//Anim In Timer
	this.sliderInTimer = {
	    handle: 0,
	    start: function() {
	        this.stop();
	        this.handle = setTimeout(_animSlideOut.bind(self), 5000);
	    },
	    stop: function() {
	        if (this.handle) {
	            clearTimeout(this.handle);
	            this.handle = 0;
	        }
	    }
	};

	//Anim Out Timer
	this.sliderOutTimer = {
	    handle: 0,
	    start: function() {
	        this.stop();
	        this.handle = setTimeout(_loadNextSlide.bind(self), 1000);
	    },
	    stop: function() {
	        if (this.handle) {
	            clearTimeout(this.handle);
	            this.handle = 0;
	        }
	    }
	};

}


function _loadNextSlide(){

	_destroyChart.call(this);
	_renderSlide.call(this);		

	//prepare next slideId
	this.slideId ++;
	if (this.slideId >= this.slidesMOD_Array.length){
		this.slideId = 0;
	}

}


function _renderSlide() {

	var eachSlideMOD = this.slidesMOD_Array[this.slideId];

	console.log("load next slide....", this.slideId, eachSlideMOD);

	//Add the layout to the Speechbubble and then update with the MODEL
	this.bubble_DOM.html( this.slide_DOM );

	//Title
	this.slide_DOM.find('.title').html(eachSlideMOD.title);

	//Copy
	this.slide_DOM.find('p').html(eachSlideMOD.copy);

	//Question
	this.slide_DOM.find('.q').html(eachSlideMOD.question);

	//Content
	switch(eachSlideMOD.type) {
		case 'bar':
			this.chart = Charts_SRV.loadBarChart.call(this,eachSlideMOD.dataProvider);
		break;
		case 'serial':
			this.chart = Charts_SRV.loadSerialChart.call(this,eachSlideMOD.dataProvider);
		break;
		case 'pie':
			this.chart = Charts_SRV.loadPieChart.call(this,eachSlideMOD.dataProvider);
		break;
	}

	this.bubble_DOM.find('.ask-me').click(_stopSlides.bind(this));
	_animSlideIn.call(this);

}


function _animSlideIn() {

	console.log("anim-in!!!!!!!!!!!!!!!!!!!!!!");
	this.bubble_DOM.removeClass('anim-out').addClass('anim-in');
	this.sliderInTimer.start();

}


function _animSlideOut() {

	console.log("anim-out!!!!!!!!!!!!!!!!!!!!!!");
	this.bubble_DOM.removeClass('anim-in').addClass('anim-out');
	this.sliderOutTimer.start();

}





function _stopSlides() {

	console.log("stop slides....");
	this.bubble_DOM.removeClass('anim-in').addClass('anim-out');
	this.sliderOutTimer.stop();
	this.sliderInTimer.stop();

	setTimeout(_dispatchIntroSlidesStopped.bind(this),500);

}


function _dispatchIntroSlidesStopped() {

	_destroyChart.call(this);
	this.emit.call(this,"intro_slides_stopped");

}


function _startSlides() {

	console.log("start slides....");
	_loadNextSlide.call(this);
	
}

function _destroyChart() {

	if (this.chart) {
		this.chart.clear();
		this.chart = null;
	}

}











IntroSlides_Ctrl.prototype.startSlides = function() {

	_startSlides.call(this);

};


IntroSlides_Ctrl.prototype.stopSlides = function() {

	_stopSlides.call(this);

};













module.exports = IntroSlides_Ctrl;
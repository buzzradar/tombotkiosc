/*jslint node: true, unused: true, esnext: true */


const DisplayGlobals_SRV = require('../../services/DisplayGlobals-srv'); 
const HBTemplates_SRV = require('../../services/HBTemplates-srv');
const Charts_SRV = require('../../services/Charts-srv');

let _nodeUtil = require('util');
let _eventEmitter3 = require('eventemitter3');



// ------------------------------------
// Constructor
// ------------------------------------

function IntroSlides_Ctrl (bubbleDOM,introSlidesMOD_Array) {

	this.bubble_DOM = bubbleDOM;
	this.slidesMOD_Array = introSlidesMOD_Array;
	this.slide_DOM = HBTemplates_SRV.getTemplate('intro_slide');
	this.slideId = -1;


	_init.call(this);

}
_nodeUtil.inherits(IntroSlides_Ctrl,_eventEmitter3); // extend _eventEmitter3 so we can use the event methods in LocalLib



function _init() {

	setTimeout(_loadNextSlide.bind(this),100);	

}


function _loadNextSlide(){

	this.slideId ++;

	if (this.slideId < this.slidesMOD_Array.length){
		_renderSlide.call(this);
	}else{
		this.slideId = -1;
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
			Charts_SRV.loadBarChart.call(this,eachSlideMOD.dataProvider);
		break;
		case 'serial':
			Charts_SRV.loadSerialChart.call(this,eachSlideMOD.dataProvider);
		break;
	}

	_dispatchShowSlide.call(this);


}


function _dispatchShowSlide() {

	console.log("slide_show");
	this.bubble_DOM.fadeIn(500);


}































module.exports = IntroSlides_Ctrl;
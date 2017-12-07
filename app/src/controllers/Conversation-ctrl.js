/*jslint node: true, unused: true, esnext: true */


const DisplayGlobals_SRV = require('../services/DisplayGlobals-srv'); 
const APICalls_SRV = require('../services/APICalls-srv'); 
const TomBotIcon_CTRL = require('./TomBotIcon-ctrl');
const InputTalk_CTRL = require('./InputTalk-ctrl');
const ContentBubble_CTRL = require('./ContentBubble-ctrl');
const AIAgent_SRV = require('../services/AIAgent-srv'); 






// ------------------------------------
// Constructor
// ------------------------------------

function Conversation_Ctrl () {

	this.botIcon = null;
	this.inputTalk = null;
	this.contentBubble = null;
	this.state = "waiting";
	this.introQuestions_Array = DisplayGlobals_SRV.getSentencesJSON().sentences.intro_questions;	
	this.introId = 0;
	this.introInTimer = null;
	this.introOutTimer = null;
	this.waitingTimer = null;
	this.waitingTime = 5;
	this.currentWaitingTime = 0;
	this.state = "working";


	_init.call(this);

}





// ------------------------------------
// Init
// ------------------------------------

function _init() {

	this.botIcon = new TomBotIcon_CTRL($('.tomboticon'));
	this.botIcon.on("bot_ready",_addContentAndInput,this);

}




function _addContentAndInput() {

	this.contentBubble = new ContentBubble_CTRL(this.botIcon);
	this.contentBubble.on("intro_stopped",_showInputTalk,this);

	this.inputTalk = new InputTalk_CTRL(this.botIcon);
	this.inputTalk.on("question_ready", _onQuestionReceived, this);
	this.inputTalk.on("show_help", _onHelpReceived, this);


	_startControlTimer.call(this);
	_addMouseMoveEvent.call(this);

}





// ------------------------------------
// Timer
// ------------------------------------

function _startControlTimer() {

	var self = this;
	_printDebugTimer.call(this);
	_checkState.call(this);

	setTimeout(_startControlTimer.bind(self),1000);

}


function _checkState() {

	switch(this.state){
		case "waiting":
			_increaseWaitingTime.call(this);
		break;
		case "working":
		break;
		case "content_displayed":
			_increaseWaitingTime.call(this);
		break;

	}

}


function _increaseWaitingTime() {

	if (this.currentWaitingTime == this.waitingTime){
    	console.log ("%c -> VERSION:", "background:#dc1ad1;", "WARNING: Waiting for too long. Ask a random question." );
		_askIntroQuestion.call(this);
	}
	this.currentWaitingTime ++;

}


function _printDebugTimer() {
	$('.control_timer').find('.state').html('<strong>State: </strong>' + this.state);
	$('.control_timer').find('.time').html(this.currentWaitingTime + ' ' + this.waitingTime);
}



function _addMouseMoveEvent() {

	$(document).on('mousemove', function(event) {
		this.currentWaitingTime = 0;
    }.bind(this));

}















// ------------------------------------
// Intro
// ------------------------------------

function _askIntroQuestion() {

	_setState.call(this,'working');
	this.contentBubble.animContentOut();

	var randomQuestion = this.introQuestions_Array[this.introId];

	this.inputTalk.askRandomQuestion(randomQuestion);

	this.introId ++;
	
}


// function _startIntro() {

// 	_loadNextIntro.call(this);
	
// }



// function _loadNextIntro(){

// 	var question = this.introQuestions_Array[this.introId];
// 	var content_MOD = AIAgent_SRV.getModel(question);

// 	if (!content_MOD) {
// 		APICalls_SRV.callGET('http://testcms.buzzradar.com/apis/cesbot/query.json?access_token=NjkwZTVlNDY4NGM3ZTA0MmUyZWVhYWQ2NTdlOGExNWY4MGU1ZjQ1OWMxMDQ4ZjFhZmNmOWZlN2E0MzhjNmIyYw',{question:question}, _onAnswerReceived.bind(this));
// 	}else{
// 		_onAnswerReceived.call(this,content_MOD);
// 	}

// 	this.introInTimer.start();

// 	//prepare next intro Slide
// 	this.introId ++;
// 	if (this.introId >= this.introQuestions_Array.length){
// 		this.introId = 0;
// 	}

// }



// function _initTimer() {

// 	var self = this;

// 	//Anim In Timer
// 	this.introInTimer = {
// 	    handle: 0,
// 	    start: function() {
// 	        this.stop();
// 	        this.handle = setTimeout(_animContentOut.bind(self), 5000);
// 	    },
// 	    stop: function() {
// 	        if (this.handle) {
// 	            clearTimeout(this.handle);
// 	            this.handle = 0;
// 	        }
// 	    }
// 	};

// 	//Anim Out Timer
// 	this.introOutTimer = {
// 	    handle: 0,
// 	    start: function() {
// 	        this.stop();
// 	        this.handle = setTimeout(_loadNextIntro.bind(self), 1000);
// 	    },
// 	    stop: function() {
// 	        if (this.handle) {
// 	            clearTimeout(this.handle);
// 	            this.handle = 0;
// 	        }
// 	    }
// 	};


// }


// function _animContentOut() {

// 	this.contentBubble.animContentOut();
// 	this.introOutTimer.start();

// }

function _onAnswerReceived(response) {

	this.botIcon.changeState("waiting");

	this.contentBubble.renderAnswer(response);
	_hideInputTalk.call(this);
	_setState.call(this, 'content_displayed');


}



function _onHelpReceived(response) {

	this.contentBubble.renderAnswer(response);
	_hideInputTalk.call(this);

}



function _onQuestionReceived(newQuestion) {
	console.log ("%c ->(Conversation_CTRL) Event question_ready => ", "background:#c3bb35;", newQuestion);
	
	this.setState = 'working';
	this.botIcon.changeState("thinking");
	this.inputTalk.disableInput();
	APICalls_SRV.callGET('http://testcms.buzzradar.com/apis/cesbot/query.json?access_token=NjkwZTVlNDY4NGM3ZTA0MmUyZWVhYWQ2NTdlOGExNWY4MGU1ZjQ1OWMxMDQ4ZjFhZmNmOWZlN2E0MzhjNmIyYw',{question:newQuestion}, _onAnswerReceived.bind(this));

}




















function _hideInputTalk() {
	this.inputTalk.hide();
}

function _showInputTalk() {
	this.inputTalk.show();
}

function _setState(newState){
	
	this.state = newState;
	if (this.state == 'waiting') this.currentWaitingTime = 0;
	_printDebugTimer.call(this);

}








Conversation_Ctrl.prototype.changeState = function(newState) {

	_setState.call(this, newState);

};


Conversation_Ctrl.prototype.getState = function() {

	return this.state;

};













module.exports = Conversation_Ctrl;
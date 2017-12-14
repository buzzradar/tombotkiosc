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
	this.waitingTime = ( DisplayGlobals_SRV.isDevMode() ) ? 5 : 30;
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
	this.contentBubble.on("ask_new_question",_showInputandFocusIt,this);
	this.contentBubble.on("suggested_question",_askSuggestedQuestion,this);

	this.inputTalk = new InputTalk_CTRL(this.botIcon);
	this.inputTalk.on("question_ready", _onQuestionReceived, this);
	this.inputTalk.on("show_help", _onAnswerReceived, this);


	_onEachTickSecond.call(this);
	_addMouseMoveEvent.call(this);

}





// ------------------------------------
// Timer
// ------------------------------------

function _onEachTickSecond() {

	var self = this;
	_printDebugTimer.call(this);
	_checkState.call(this);

	setTimeout(_onEachTickSecond.bind(self),1000);

}


function _checkState() {

	switch(this.state){
		case "calling_api":
			//do nothing
		break;
		case "waiting":
			_increaseWaitingTime.call(this);
		break;
		case "working":
			//do nothing
		break;
		case "content_displayed":
			if ( !DisplayGlobals_SRV.isDevMode() )  _increaseWaitingTime.call(this);
		break;

	}

}


function _increaseWaitingTime() {

	this.currentWaitingTime ++;
	console.log(this.currentWaitingTime, this.waitingTime);
	if (this.currentWaitingTime == (this.waitingTime + 1) ) {
    	console.log ("%c -> VERSION:", "background:#dc1ad1;", "WARNING: Waiting for too long. Ask a random question." );
		this.currentWaitingTime = 0;
		_askIntroQuestion.call(this);
	}


}


function _printDebugTimer() {

	//if ( DisplayGlobals_SRV.isDevMode() ) {
		$('.control_timer').show();
	//}

	$('.control_timer').find('.state').html('<strong>State: </strong>' + this.state);
	$('.control_timer').find('.time').html('<strong>Time: </strong>' +this.currentWaitingTime + ' of ' + this.waitingTime);
}



function _addMouseMoveEvent() {

	$(document).on('mousemove', function(event) {
		this.currentWaitingTime = 0;
    }.bind(this));

}



function _askSuggestedQuestion(suggestedQuestion) {

	_onQuestionReceived.call(this,suggestedQuestion);

}














// ------------------------------------
// Intro
// ------------------------------------

function _askIntroQuestion() {

	_setState.call(this,'working');
	this.contentBubble.animContentOut();

	var randomQuestion = this.introQuestions_Array[this.introId];

	this.inputTalk.askRandomQuestion(randomQuestion);

	//prepare next intro Slide
	this.introId ++;
	if (this.introId >= this.introQuestions_Array.length){
		this.introId = 0;
	}
	
}


function _onAnswerReceived(response) {

	this.botIcon.changeState("waiting");

	this.contentBubble.renderAnswer(response);
	_hideInputTalk.call(this);
	_setState.call(this, 'content_displayed');

}




function _onQuestionReceived(newQuestion) {
	console.log ("%c ->(Conversation_CTRL) Event question_ready => ", "background:#c3bb35;", newQuestion);
	
	this.botIcon.changeState("thinking");
	this.inputTalk.disableInput();




	if ( DisplayGlobals_SRV.isDevMode() ){

		// var content_MOD = {
		// 	"type":"unknown",
		// 	"dataProvider":[
		// 	    "What is the most shared Tweet at CES  today?",
		// 	  	"Where in the world are people talking about CES2018 the most"
		// 	]
		// };
		// _onAnswerReceived.call(this,content_MOD);

		_setState.call(this, 'calling_api');
		APICalls_SRV.callGET('http://testcms.buzzradar.com/apis/cesbot/query.json?access_token=NjkwZTVlNDY4NGM3ZTA0MmUyZWVhYWQ2NTdlOGExNWY4MGU1ZjQ1OWMxMDQ4ZjFhZmNmOWZlN2E0MzhjNmIyYw',{question:newQuestion}, _onAnswerReceived.bind(this));


	}else{

		_setState.call(this, 'calling_api');
		APICalls_SRV.callGET('http://testcms.buzzradar.com/apis/cesbot/query.json?access_token=NjkwZTVlNDY4NGM3ZTA0MmUyZWVhYWQ2NTdlOGExNWY4MGU1ZjQ1OWMxMDQ4ZjFhZmNmOWZlN2E0MzhjNmIyYw',{question:newQuestion}, _onAnswerReceived.bind(this));

	}


}

















function _showInputandFocusIt(){
	this.inputTalk.focusInputUser();
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
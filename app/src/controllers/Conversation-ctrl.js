/*jslint node: true, unused: true, esnext: true */


const DisplayGlobals_SRV = require('../services/DisplayGlobals-srv'); 
const APICalls_SRV = require('../services/APICalls-srv'); 
const TomBotIcon_CTRL = require('./TomBotIcon-ctrl');
const InputTalk_CTRL = require('./InputTalk-ctrl');
const ContentBubble_CTRL = require('./ContentBubble-ctrl');






// ------------------------------------
// Constructor
// ------------------------------------

function Conversation_Ctrl () {

	this.botIcon = null;
	this.inputTalk = null;
	this.contentBubble = null;
	this.state = "listening";

	_init.call(this);

}



function _init() {

	this.botIcon = new TomBotIcon_CTRL($('.tomboticon'));
	//this.botIcon.on("bot_ready",_addContentBubble,this);

	this.contentBubble = new ContentBubble_CTRL(this.botIcon);
	this.contentBubble.on("intro_slides_stopped",_addInputTalk,this);

}







function _addInputTalk() {

	if (!this.inputTalk) {

		this.inputTalk = new InputTalk_CTRL(this.botIcon);

		//Add Input Listeners
		this.inputTalk.on("question_ready", _onNewQuestionReceived, this);

		function _onNewQuestionReceived(newQuestion) {
	    	console.log ("%c ->(Conversation_CTRL) Event question_ready => ", "background:#c3bb35;", newQuestion);
	    	
	    	this.botIcon.changeState("thinking");
	    	this.inputTalk.disableInput();
	    	APICalls_SRV.callPOST('http://testcms.buzzradar.com/apis/cesbot/query.json?access_token=NjkwZTVlNDY4NGM3ZTA0MmUyZWVhYWQ2NTdlOGExNWY4MGU1ZjQ1OWMxMDQ4ZjFhZmNmOWZlN2E0MzhjNmIyYw&question=test',{question:newQuestion}, _onAnswerReceived.bind(this));

		}

		function _onAnswerReceived(response) {
			_hideInputTalk.call(this);
	    	this.botIcon.changeState("waiting");
	    	this.contentBubble.loadTomBotAnswer(response);
		}

	}else{
		this.inputTalk.show();
	}

}


function _hideInputTalk() {

	$('.conversation').hide();

}

function _showInputTalk() {

	$('.conversation').fadeIn(500);

}





























module.exports = Conversation_Ctrl;
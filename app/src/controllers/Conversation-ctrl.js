/*jslint node: true, unused: true, esnext: true */


const DisplayGlobals_SRV = require('../services/DisplayGlobals-srv'); 
const TomBotIcon_CTRL = require('./TomBotIcon-ctrl');
const InputTalk_CTRL = require('./InputTalk-ctrl');
const ContentBubble_CTRL = require('./ContentBubble-ctrl');






// ------------------------------------
// Constructor
// ------------------------------------

function Conversation_Ctrl () {

	this.botIcon = new TomBotIcon_CTRL($('.tomboticon'));
	this.inputTalk = null;
	this.contentBubble = null;
	this.state = "listening";

	_init.call(this);

}



function _init() {

	//When Bot is Ready add Content Bubble
	this.botIcon.on("bot_ready",_addContentBubble,this);

}



function _addContentBubble() {

	this.contentBubble = new ContentBubble_CTRL();

}




function _addInputTalk() {

	this.inputTalk = new InputTalk_CTRL($('.conversation'),this.botIcon);

	//Add Input Listeners
	this.inputTalk.on("question_ready", onNewQuestionReceived, this);

	function onNewQuestionReceived(newQuestion) {
    	console.log ("%c ->(Conversation_CTRL) Event question_ready => ", "background:#c3bb35;", newQuestion);
    	this.botIcon.changeState("thinking");
    	this.inputTalk.disableInput();
	}

}



































module.exports = Conversation_Ctrl;
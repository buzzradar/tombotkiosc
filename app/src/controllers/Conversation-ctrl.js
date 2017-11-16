/*jslint node: true, unused: true, esnext: true */


const DisplayGlobals_SRV = require('../services/DisplayGlobals-srv'); 
const TomBotIcon_CTRL = require('./TomBotIcon-ctrl');
const InputTalk_CTRL = require('./InputTalk-ctrl');






// ------------------------------------
// Constructor
// ------------------------------------

function Conversation_Ctrl () {

	this.botIcon = new TomBotIcon_CTRL($('.tomboticon'));
	this.inputTalk = null;
	this.state = "listening";

	_init.call(this);

}



function _init() {

	//When Bot is Ready
	this.botIcon.on("bot_ready",_addInputTalk,this);

}



function _addInputTalk() {

	this.inputTalk = new InputTalk_CTRL($('.conversation'),this.botIcon);

	//Add Input Listeners
	this.inputTalk.on("question_ready", function(newQuestion) {

    	console.log ("%c -> Event question_ready => ", "background:#c3bb35;", newQuestion);

	}, this);

}






































module.exports = Conversation_Ctrl;
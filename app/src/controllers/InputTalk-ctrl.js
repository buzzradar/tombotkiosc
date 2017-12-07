/*jslint node: true, unused: true, esnext: true */


const _ = require("lodash");


//----------------------------
// REQUIRE 
//----------------------------
const DisplayGlobals_SRV = require('../services/DisplayGlobals-srv'); 
const Utils_SRV = require('../services/Utils-srv'); 
const AIAgent_SRV = require('../services/AIAgent-srv'); 


let _nodeUtil = require('util');
let _eventEmitter3 = require('eventemitter3');


// ------------------------------------
// Constructor
// ------------------------------------

function InputTalk_Ctrl (botIcon) {

	this.botIcon = botIcon;
	this.conversation_DOM = $('.conversation');
	this.label_DOM = this.conversation_DOM.find('label');
	this.input_DOM = this.conversation_DOM.find('input');
	this.owner = "cesbot";   //cesbot or user
	this.question = '';

	_init.call(this);

}
_nodeUtil.inherits(InputTalk_Ctrl,_eventEmitter3); // extend _eventEmitter3 so we can use the event methods in LocalLib




function _init() {

	_setClass.call(this);	//Set question or answer class in the DOM
	_setOwner.call(this);	//Changes the owner copy on top of the input
	_showInput.call(this);

}



function _setClass() {

	var conv_class = 'conversation ';
	this.conversation_DOM.removeClass();
	conv_class += (this.owner === 'cesbot') ? 'question' : 'answer';
	this.conversation_DOM.addClass(conv_class);

}

function _setOwner() {

	var owner_says = 'CESBot says:';
	if(this.owner != 'cesbot') {
		owner_says = 'Ask a question here:';
	}
	this.label_DOM.html(owner_says);

}

function _setCopy(owner, copy, onAnimationFinished) {
	
	_changeOwner.call(this,owner);
	this.input_DOM.val('');
	Utils_SRV.on("copy_animation_finished",onAnimationFinished,this);
	Utils_SRV.animateCopy(this.input_DOM,copy,this.botIcon);
	DisplayGlobals_SRV.getConversationRef().changeState('working');
}


function _changeOwner(newOwner) {

	this.owner = newOwner;
	_setClass.call(this);	//Set question or answer class in the DOM
	_setOwner.call(this);	//Changes the owner copy on top of the input


}


function _addFocusInListener() {

	var self = this;
	this.input_DOM.off('click').on('click', onInputClicked.bind(this));

}


function onInputClicked() {
	console.log ("%c -> NOTE => ", "background:#00ff00;", "on Click ......");

	this.input_DOM.val('');
    _changeOwner.call(this,'user');

}


function _addFocusOutKeyDownListener() {

	this.input_DOM.off('focusout keydown').on('focusout keydown', onFocusOutKeydown.bind(this));

	function onFocusOutKeydown(e) {
		console.log ("%c -> NOTE => ", "background:#ff0000;", "KeyDown Focus Out");
        
        if (e.type == "keydown") {
        	this.botIcon.changeState("listening");
			DisplayGlobals_SRV.getConversationRef().changeState('working');
        }

    	if (e.type == "focusout" || e.which == 13) {
    		this.input_DOM.off('focusout keydown');
	        _checkQuestion.call(this);
			_addFocusOutKeyDownListener.call(this);
    	}
	}

}



function _checkQuestion() {

	this.question = this.input_DOM.val();
	this.input_DOM.val('');
	var content_MOD = AIAgent_SRV.getModel(this.question);

	console.log("AI Agent pre check.....",this.question, content_MOD);

	if (!content_MOD) {
		//Make API Call
		console.log("AI Return FALSE so ask Marius");
		_setCopy.call(this,'cesbot',Utils_SRV.getRandomAcknowledge(),_onAcknowledgeAnimationFinished);
	}else{

		if (content_MOD.type == "input"){
			_setCopy.call(this,'cesbot',content_MOD.answer,_onGreetingAnimationFinished);
		}else if(content_MOD.type == "help") {
			this.emit("show_help", content_MOD);
		}

	}


}



function _onAcknowledgeAnimationFinished() {
	console.log("on acknowledege animation finished!");
	Utils_SRV.removeListener ("copy_animation_finished", _onAcknowledgeAnimationFinished);
	DisplayGlobals_SRV.getConversationRef().changeState('waiting');
	this.emit("question_ready",this.question);
}


function _onGreetingAnimationFinished() {
	console.log("on greeting animation finished!");
	Utils_SRV.removeListener ("copy_animation_finished", _onGreetingAnimationFinished);
	DisplayGlobals_SRV.getConversationRef().changeState('waiting');
}


function _autoQuestionAnimationFinished() {
	console.log("on _auto Question Animation Finished!");
	Utils_SRV.removeListener ("copy_animation_finished", _autoQuestionAnimationFinished);
	_checkQuestion.call(this);
}


function _showInput() {

	this.conversation_DOM.fadeIn(500);
	_setCopy.call(this,'cesbot',Utils_SRV.getRandomGreeting(), _onGreetingAnimationFinished);	//set the copy of the input
	
	_addFocusInListener.call(this);
	_addFocusOutKeyDownListener.call(this);

}



function _hideInput() {

	this.conversation_DOM.hide();
	
}
































InputTalk_Ctrl.prototype.disableInput = function () {
	this.input_DOM.attr("disabled", true);
};


InputTalk_Ctrl.prototype.show = function () {
	_showInput.call(this);
};


InputTalk_Ctrl.prototype.hide = function () {
	_hideInput.call(this);
};


InputTalk_Ctrl.prototype.askRandomQuestion = function (newQuestion) {
	
	console.log(this);
	this.conversation_DOM.fadeIn(500);
	_setCopy.call(this,'user',newQuestion, _autoQuestionAnimationFinished);	//set the copy of the input
	
};















module.exports = InputTalk_Ctrl;
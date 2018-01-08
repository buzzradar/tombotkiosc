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
	this.isHuman = false;

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

function _setCopy(owner, copy, onAnimationFinished, botIconState) {
	
	if (owner == 'user') this.input_DOM.attr("disabled", true);
	_changeOwner.call(this,owner);
	this.input_DOM.val('');
	Utils_SRV.on("copy_animation_finished",onAnimationFinished,this);
	Utils_SRV.animateCopy(this.input_DOM,copy,owner,this.botIcon,botIconState);
	DisplayGlobals_SRV.getConversationRef().changeState('working');
}


function _changeOwner(newOwner) {

	this.owner = newOwner;
	_setClass.call(this);	//Set question or answer class in the DOM
	_setOwner.call(this);	//Changes the owner copy on top of the input


}


function _addClickListener() {

	var self = this;
	this.input_DOM.off('click').on('click', _onInputClicked.bind(this));

}


function _onInputClicked() {
	console.log ("%c -> NOTE => ", "background:#00ff00;", "on Click ......");

	this.input_DOM.attr("disabled", false);
	this.input_DOM.val('');
    _changeOwner.call(this,'user');
	_addFocusOutKeyDownListener.call(this);
}


function _addFocusOutKeyDownListener() {

	this.input_DOM.off('focusout keydown').on('focusout keydown', onFocusOutKeydown.bind(this));

	function onFocusOutKeydown(e) {
		console.log ("%c -> NOTE => ", "background:#ff0000;", "KeyDown Focus Out");
        
        if (e.type == "keydown") {
        	this.botIcon.changeState("listening");
			DisplayGlobals_SRV.getConversationRef().changeState('working');
        }

    	// if (e.type == "focusout" || e.which == 13) {
    	if (e.which == 13) {
    		this.input_DOM.off('focusout keydown');
	        _checkQuestion.call(this,true);
    	}
	}

}



function _checkQuestion(isHuman) {

	this.question = this.input_DOM.val();
	this.input_DOM.val('');
	var content_MOD = AIAgent_SRV.getModel(this.question);
	this.isHuman = isHuman;

	//console.log("AI Agent pre check.....",this.question, content_MOD);

	if (!content_MOD) {
		//Make API Call
		// console.log("AI Return FALSE so ask Marius");
		_setCopy.call(this,'cesbot',Utils_SRV.getRandomAcknowledge(),_onAcknowledgeAnimationFinished, 'talking');
	}else{

		if (content_MOD.type == "input"){
			_setCopy.call(this,'cesbot',content_MOD.answer,_onGreetingAnimationFinished, 'talking');
		}else if(content_MOD.type == "help") {
			this.input_DOM.off('focusout keydown');
			this.emit("show_help", content_MOD);
		}

	}


}



function _onAcknowledgeAnimationFinished() {
	// console.log("on acknowledege animation finished!", this.isHuman);
	Utils_SRV.removeListener ("copy_animation_finished", _onAcknowledgeAnimationFinished);
	DisplayGlobals_SRV.getConversationRef().changeState('waiting');
	this.emit("question_ready",{"question" : this.question, "isHuman" : this.isHuman});
}


function _onGreetingAnimationFinished() {
	// console.log("on greeting animation finished!");
	Utils_SRV.removeListener ("copy_animation_finished", _onGreetingAnimationFinished);
	DisplayGlobals_SRV.getConversationRef().changeState('waiting');
}


function _autoQuestionAnimationFinished() {
	// console.log("on _auto Question Animation Finished!");
	Utils_SRV.removeListener ("copy_animation_finished", _autoQuestionAnimationFinished);
	_checkQuestion.call(this,false);
}


function _showInput() {

	this.conversation_DOM.fadeIn(500);
	_setCopy.call(this,'cesbot',Utils_SRV.getRandomGreeting(), _onGreetingAnimationFinished, 'talking');	//set the copy of the input
	
	_addClickListener.call(this);

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


InputTalk_Ctrl.prototype.focusInputUser = function () {
	this.conversation_DOM.fadeIn(500);
	this.input_DOM.val('');
	this.input_DOM.attr("disabled", false);
    _changeOwner.call(this,'user');
	DisplayGlobals_SRV.getConversationRef().changeState('waiting');
	_addFocusOutKeyDownListener.call(this);
};


InputTalk_Ctrl.prototype.askRandomQuestion = function (newQuestion) {

	this.input_DOM.off('focusout keydown');	
	this.conversation_DOM.fadeIn(500);
	_setCopy.call(this,'user',newQuestion, _autoQuestionAnimationFinished, 'listening');	//set the copy of the input

};


InputTalk_Ctrl.prototype.showErrorFromServer = function () {

	_setCopy.call(this,'cesbot',"Oops sorry! Something went wrong with my brain. Apologies, try again please!",_onGreetingAnimationFinished, 'talking');
	
};













module.exports = InputTalk_Ctrl;
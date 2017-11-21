/*jslint node: true, unused: true, esnext: true */


const _ = require("lodash");


//----------------------------
// REQUIRE 
//----------------------------
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
	this.owner = "tombot";   //tombot or user

	_init.call(this);

}
_nodeUtil.inherits(InputTalk_Ctrl,_eventEmitter3); // extend _eventEmitter3 so we can use the event methods in LocalLib




function _init() {

	_setClass.call(this);	//Set question or answer class in the DOM
	_setOwner.call(this);	//Changes the owner copy on top of the input
	_setCopy.call(this,Utils_SRV.getRandomGreeting());	//set the copy of the input
	this.conversation_DOM.fadeIn(500);

	_addFocusInListener.call(this);

}



function _setClass() {

	var conv_class = 'conversation ';
	this.conversation_DOM.removeClass();
	conv_class += (this.owner === 'tombot') ? 'question' : 'answer';
	this.conversation_DOM.addClass(conv_class);

}

function _setOwner() {

	var owner_says = 'TomBot says:';
	if(this.owner != 'tombot') {
		owner_says = 'User Says:';
	}
	this.label_DOM.html(owner_says);

}

function _setCopy(copy) {
	
	_changeOwner.call(this,'tombot');
	this.input_DOM.val('');
	Utils_SRV.animateCopy(this.input_DOM,copy,this.botIcon);

}


function _changeOwner(newOwner) {

	this.owner = newOwner;
	_setClass.call(this);	//Set question or answer class in the DOM
	_setOwner.call(this);	//Changes the owner copy on top of the input


}


function _addFocusInListener() {

	var self = this;
	this.input_DOM.on('click', onInputClicked);

	function onInputClicked() {
		this.value = '';
	    _changeOwner.call(self,'user');
    	_addFocusOutKeyDownListener.call(self);
	}

}



function _addFocusOutKeyDownListener() {

	this.input_DOM.on('focusout keydown', onFocusOutKeydown.bind(this));

	function onFocusOutKeydown(e) {
		console.log ("%c -> NOTE => ", "background:#ff0000;", "KeyDown Focus Out");
        
        if (e.type == "keydown") this.botIcon.changeState("listening");

    	if (e.type == "focusout" || e.which == 13) {
    		this.input_DOM.off('focusout keydown');
	        _checkQuestion.call(this);
    	}
	}

}



function _checkQuestion() {

	var question = this.input_DOM.val();
	var AIAgent_pre_check_answer = AIAgent_SRV.checkQuestion(question);

	console.log("AI Agent pre check.....",question, AIAgent_pre_check_answer);

	if ( AIAgent_pre_check_answer ){
		console.log("AI Return TRUE so understood the question");

		_changeOwner.call(this,'tombot');
		Utils_SRV.animateCopy(this.input_DOM,AIAgent_pre_check_answer, this.botIcon);

	}else{
		console.log("AI Return FALSE so ask Marius");
		Utils_SRV.on("copy_animation_finished",_onAcknowledgeAnimationFinished,this);
		_setCopy.call(this,Utils_SRV.getRandomAcknowledge());
	}

	function _onAcknowledgeAnimationFinished() {
		this.emit("question_ready",question);
		Utils_SRV.removeListener ("copy_animation_finished", _onAcknowledgeAnimationFinished);
	}

}










function _sayHello() {

	_changeOwner.call(this,'tombot');
	Utils_SRV.animateCopy(this.input_DOM,"Hello!", this.botIcon);

}




































InputTalk_Ctrl.prototype.disableInput = function () {
	this.input_DOM.attr("disabled", true);
};


InputTalk_Ctrl.prototype.show = function () {
	this.conversation_DOM.fadeIn(500);
	_setCopy.call(this,Utils_SRV.getRandomGreeting());	//set the copy of the input
};















module.exports = InputTalk_Ctrl;
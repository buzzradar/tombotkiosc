/*jslint node: true, unused: true, esnext: true */


const _ = require("lodash");


//----------------------------
// REQUIRE 
//----------------------------
const DisplayGlobals_SRV = require('../services/DisplayGlobals-srv'); 
const Utils_SRV = require('../services/Utils-srv'); 

let _nodeUtil = require('util');
let _eventEmitter3 = require('eventemitter3');


// ------------------------------------
// Constructor
// ------------------------------------

function InputTalk_Ctrl (conversationTarget, botIcon) {

	this.botIcon = botIcon;
	this.conversation_DOM = conversationTarget;
	this.label_DOM = conversationTarget.find('label');
	this.input_DOM = conversationTarget.find('input');
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
	this.input_DOM.on('click', function(e) {
	    this.value = '';
	    _changeOwner.call(self,'user');
    	_addFocusOutKeyDownListener.call(self);
	});

}



function _addFocusOutKeyDownListener() {

	this.input_DOM.on('focusout keydown', function(e) {

    	// console.log ("%c -> NOTE => ", "background:#ff0000;", "KeyDown Focus Out");
        this.botIcon.changeState("listening");

    	if (e.type == "focusout" || e.which == 13) {
    		this.input_DOM.off('focusout keydown');
	        _checkQuestion.call(this);
    	}

	}.bind(this));

}



function _checkQuestion() {

	var question = this.input_DOM.val();

	if ($.trim(question) === "") {
		console.log("Question is empty!");
		_changeOwner.call(this,'tombot');
		Utils_SRV.animateCopy(this.input_DOM,Utils_SRV.getRandomShy(), this.botIcon);
	}else{
		Utils_SRV.on("copy_animation_finished",onAcknowledgeAnimationFinished,this);

		_setCopy.call(this,Utils_SRV.getRandomAcknowledge());

	}

	function onAcknowledgeAnimationFinished() {
		this.emit("question_ready",question);
	}

}

































module.exports = InputTalk_Ctrl;
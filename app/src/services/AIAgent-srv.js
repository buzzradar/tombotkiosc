/*jslint node: true, unused: true, esnext: true */


const _ = require("lodash");

const Utils_SRV = require('./Utils-srv'); 



//--------------------------------------
// CONSTRUCTOR
//--------------------------------------

let _AIAgent;

function AIAgent () {

  _AIAgent = this;

}










AIAgent.prototype.getModel = function(question) {

	var answerMOD = false;

	if ($.trim(question) === "") {
		answerMOD = {
			type : 'input',
			answer : Utils_SRV.getRandomShy()
		};
	}else if(_checkHello(question)){
		answerMOD = {
			type : 'input',
			answer : _.capitalize(question)
		};

	}else if(_checkHelp(question)){
		answerMOD = {
			type : 'help',
			answer : 'I sense you may need some help',
			dataProvider : []
		};
	}else if(_checkHowAreYou(question)) {
		answerMOD = {
			type : 'input',
			answer : 'I am very good thanks for asking.'
		};
	}else if(_checkWhoAreYou(question)) {
		answerMOD = {
			type : 'input',
			answer : 'My name is CESBot and I am a AI Social Agent.'
		};
	}
	
	return answerMOD;

};



// function _onAnswerReceived(response) {

// 	console.log("AI AGENT -> Api Call received:", response);

// }



function _checkHello(question) {

	var isHello = false;
	question = question.toLowerCase();
	if ( question == "hello" ) {
		isHello = true;
	}
	return isHello;

}


function _checkHowAreYou(question) {

	var isHowAreYou = false;
	question = question.toLowerCase();
	if ( question.includes("how") && question.includes("are") && question.includes("you") ) {
		isHowAreYou = true;
	}
	return isHowAreYou;

}


function _checkHelp(question) {

	var isHelp = false;
	question = question.toLowerCase();
	if ( question.includes("help") ) {
		isHelp = true;
	}
	return isHelp;

}




function _checkWhoAreYou(question) {

	var isCES = false;
	question = question.toLowerCase();
	if ( question.includes("who") && question.includes("are") && question.includes("you") ) {
		isCES = true;
	}
	return isCES;

}

















module.exports = new AIAgent ();

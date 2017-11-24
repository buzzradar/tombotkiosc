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
		};
	}else if(_checkHowAreYou(question)) {
		answerMOD = {
			type : 'input',
			answer : 'I am very good thanks for asking.'
		};
	}else if(_checkWhatIsCES(question)) {
		answerMOD = {
			type : 'text',
			title : 'CES is The Global Stage for Innovation',
			copy : "CES is the world's gathering place for all who thrive on the business of consumer technologies. It has served as the proving ground for innovators and breakthrough technologies for 50 years — the global stage where next-generation innovations are introduced to the marketplace. As the largest hands-on event of its kind, CES features all aspects of the industry. <br><br>CES, formerly The International Consumer Electronics Show (International CES®), showcases more than 3,900 exhibiting companies, including manufacturers, developers and suppliers of consumer technology hardware, content, technology delivery systems and more; a conference program with more than 300 conference sessions and more than 170K attendees from 150 countries.<br><br>And because it is owned and produced by the Consumer Technology Association (CTA)™ — the technology trade association representing the $292 billion U.S. consumer technology industry — it attracts the world’s business leaders and pioneering thinkers to a forum where the industry’s most relevant issues are addressed.",
			btnCopy : 'ASK MORE QUESTIONS',
		};
	}else if(_checkWhoAreYou(question)) {
		answerMOD = {
			type : 'input',
			answer : 'My name is CESBot and I am a AI Social Agent.'
		};
	}
	
	return answerMOD;

};



function _onAnswerReceived(response) {

	console.log("AI AGENT -> Api Call received:", response);

}



function _checkHello(question) {

	var isHello = false;
	question = question.toLowerCase();
	if ( question.length <= 5 && !question.includes("help") && !question.includes("reach") ) {
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

function _checkWhatIsCES(question) {

	var isCES = false;
	question = question.toLowerCase();
	if ( question.includes("what") && question.includes("is") && question.includes("ces") ) {
		isCES = true;
	}
	return isCES;

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

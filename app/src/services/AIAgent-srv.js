/*jslint node: true, unused: true, esnext: true */


const _ = require("lodash");

const DisplayGlobals_SRV = require('./DisplayGlobals-srv'); 
const Utils_SRV = require('./Utils-srv'); 



//--------------------------------------
// CONSTRUCTOR
//--------------------------------------

let _AIAgent;

function AIAgent () {

  _AIAgent = this;


}










AIAgent.prototype.checkQuestion = function(question) {

	var answer = false;

	if ($.trim(question) === "") {
		console.log("AIAGENT SRV --> Question is empty!");
		answer = Utils_SRV.getRandomShy();
	}else if(question.length < 10){
		console.log("AIAGENT SRV --> User is saying hello!");
		answer = "Hello";
	}else if(_checkHelp(question)){
		answer = "Show help!!!!!!";
	}else if(_checkHowAreYou(question)) {
		answer = "I am very good thanks for asking.";
	}

	return answer;

};



function _checkHowAreYou(question) {

	var isHowAreYou = false;
	if ( question.includes("how") && question.includes("are") && question.includes("you") ) {
		isHowAreYou = true;
	}
	return isHowAreYou;

}


function _checkHelp(question) {

	var isHelp = false;
	if ( question.includes("help") ) {
		isHelp = true;
	}
	return isHelp;

}



















module.exports = new AIAgent ();

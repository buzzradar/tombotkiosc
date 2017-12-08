/*jslint node: true, unused: true, esnext: true */


const DisplayGlobals_SRV = require('../services/DisplayGlobals-srv'); 
const APICalls_SRV = require('../services/APICalls-srv'); 
const TomBotIcon_CTRL = require('./TomBotIcon-ctrl');
const InputTalk_CTRL = require('./InputTalk-ctrl');
const ContentBubble_CTRL = require('./ContentBubble-ctrl');
const AIAgent_SRV = require('../services/AIAgent-srv'); 






// ------------------------------------
// Constructor
// ------------------------------------

function Conversation_Ctrl () {

	this.botIcon = null;
	this.inputTalk = null;
	this.contentBubble = null;
	this.state = "waiting";
	this.introQuestions_Array = DisplayGlobals_SRV.getSentencesJSON().sentences.intro_questions;	
	this.introId = 0;
	this.introInTimer = null;
	this.introOutTimer = null;
	this.waitingTimer = null;
	this.waitingTime = 5;
	this.currentWaitingTime = 0;
	this.state = "working";


	_init.call(this);

}





// ------------------------------------
// Init
// ------------------------------------

function _init() {

	this.botIcon = new TomBotIcon_CTRL($('.tomboticon'));
	this.botIcon.on("bot_ready",_addContentAndInput,this);

}




function _addContentAndInput() {

	this.contentBubble = new ContentBubble_CTRL(this.botIcon);
	this.contentBubble.on("intro_stopped",_showInputTalk,this);

	this.inputTalk = new InputTalk_CTRL(this.botIcon);
	this.inputTalk.on("question_ready", _onQuestionReceived, this);
	this.inputTalk.on("show_help", _onHelpReceived, this);


	_onEachTickSecond.call(this);
	_addMouseMoveEvent.call(this);

}





// ------------------------------------
// Timer
// ------------------------------------

function _onEachTickSecond() {

	var self = this;
	_printDebugTimer.call(this);
	_checkState.call(this);

	setTimeout(_onEachTickSecond.bind(self),1000);

}


function _checkState() {

	switch(this.state){
		case "calling_api":
			//do nothing
		break;
		case "waiting":
			_increaseWaitingTime.call(this);
		break;
		case "working":
			//do nothing
		break;
		case "content_displayed":
			_increaseWaitingTime.call(this);
		break;

	}

}


function _increaseWaitingTime() {

	if (this.currentWaitingTime == this.waitingTime){
    	console.log ("%c -> VERSION:", "background:#dc1ad1;", "WARNING: Waiting for too long. Ask a random question." );
		_askIntroQuestion.call(this);
	}
	this.currentWaitingTime ++;

}


function _printDebugTimer() {
	$('.control_timer').find('.state').html('<strong>State: </strong>' + this.state);
	$('.control_timer').find('.time').html(this.currentWaitingTime + ' ' + this.waitingTime);
}



function _addMouseMoveEvent() {

	$(document).on('mousemove', function(event) {
		this.currentWaitingTime = 0;
    }.bind(this));

}















// ------------------------------------
// Intro
// ------------------------------------

function _askIntroQuestion() {

	_setState.call(this,'working');
	this.contentBubble.animContentOut();

	var randomQuestion = this.introQuestions_Array[this.introId];

	this.inputTalk.askRandomQuestion(randomQuestion);

	//prepare next intro Slide
	this.introId ++;
	if (this.introId >= this.introQuestions_Array.length){
		this.introId = 0;
	}
	
}


// function _startIntro() {

// 	_loadNextIntro.call(this);
	
// }



// function _loadNextIntro(){

// 	var question = this.introQuestions_Array[this.introId];
// 	var content_MOD = AIAgent_SRV.getModel(question);

// 	if (!content_MOD) {
// 		APICalls_SRV.callGET('http://testcms.buzzradar.com/apis/cesbot/query.json?access_token=NjkwZTVlNDY4NGM3ZTA0MmUyZWVhYWQ2NTdlOGExNWY4MGU1ZjQ1OWMxMDQ4ZjFhZmNmOWZlN2E0MzhjNmIyYw',{question:question}, _onAnswerReceived.bind(this));
// 	}else{
// 		_onAnswerReceived.call(this,content_MOD);
// 	}

// 	this.introInTimer.start();

// 	//prepare next intro Slide
// 	this.introId ++;
// 	if (this.introId >= this.introQuestions_Array.length){
// 		this.introId = 0;
// 	}

// }



// function _initTimer() {

// 	var self = this;

// 	//Anim In Timer
// 	this.introInTimer = {
// 	    handle: 0,
// 	    start: function() {
// 	        this.stop();
// 	        this.handle = setTimeout(_animContentOut.bind(self), 5000);
// 	    },
// 	    stop: function() {
// 	        if (this.handle) {
// 	            clearTimeout(this.handle);
// 	            this.handle = 0;
// 	        }
// 	    }
// 	};

// 	//Anim Out Timer
// 	this.introOutTimer = {
// 	    handle: 0,
// 	    start: function() {
// 	        this.stop();
// 	        this.handle = setTimeout(_loadNextIntro.bind(self), 1000);
// 	    },
// 	    stop: function() {
// 	        if (this.handle) {
// 	            clearTimeout(this.handle);
// 	            this.handle = 0;
// 	        }
// 	    }
// 	};


// }


// function _animContentOut() {

// 	this.contentBubble.animContentOut();
// 	this.introOutTimer.start();

// }

function _onAnswerReceived(response) {

	this.botIcon.changeState("waiting");

	this.contentBubble.renderAnswer(response);
	_hideInputTalk.call(this);
	_setState.call(this, 'content_displayed');


}



function _onHelpReceived(response) {

	this.contentBubble.renderAnswer(response);
	_hideInputTalk.call(this);

}



function _onQuestionReceived(newQuestion) {
	console.log ("%c ->(Conversation_CTRL) Event question_ready => ", "background:#c3bb35;", newQuestion);
	
	_setState.call(this, 'calling_api');
	this.botIcon.changeState("thinking");
	this.inputTalk.disableInput();


// var content_MOD = {
// 					"type": "photo",
// 					"question": "What is the most shared Photo at CES today / this week / this hour?",
// 					"title": "Most liked instagram post",
// 					"source": "instagram",
// 					"user": {
// 						"username": "gopro",
// 						"full_name": "GoPro",
// 						"profile_image": "http://testcms.buzzradar.com/api/external/image/instagram-avatar/3790/38357106.jpg",
// 						"profile_image_big": "http://testcms.buzzradar.com/api/external/image/instagram-avatar/3790/38357106.jpg",
// 						"name": "GoPro",
// 						"description": ""
// 					},
// 					"tweet_date": "1512493014",
// 					"tweet_date_ago": "2 days ago",
// 					"group": "",
// 					"image_url": "http://testcms.buzzradar.com/api/external/image/instagram/3790/38357106.jpg",
// 					"followers": 0,
// 					"friends": 0,
// 					"retweets": 0,
// 					"comments": 32,
// 					"likes": 10468,
// 					"content": "Photo of the Day: Feeling #fall. 🍂 Escape to the shoreline of a glassy lake in northern #Italy with a perspective from @albeross_. Enjoying the #outdoors? Share with us at GoPro.com/Awards.\n•\n•\n•\n@GoProIT #GoProIT #HERO5 #Lake #Reflection #LandscapePhotography",
// 					"place": "",
// 					"tags": "reflection,lake,goproit,fall,landscapephotography,outdoors,italy,hero5",
// 					"tweet_id": "1663234416238347508_28902942",
// 					"lang": "",
// 					"sentiment": 0,
// 					"influencer": 0,
// 					"categories": [],
// 						"original_tweet_info": {
// 						"original_twitter_username": "",
// 						"original_tweet_date": "",
// 						"original_profile_image_url": "",
// 						"original_name": "",
// 						"original_followers_count": 0
// 					}
		
// 				};
// console.log(content_MOD);
// _onAnswerReceived.call(this,content_MOD);



	APICalls_SRV.callGET('http://testcms.buzzradar.com/apis/cesbot/query.json?access_token=NjkwZTVlNDY4NGM3ZTA0MmUyZWVhYWQ2NTdlOGExNWY4MGU1ZjQ1OWMxMDQ4ZjFhZmNmOWZlN2E0MzhjNmIyYw',{question:newQuestion}, _onAnswerReceived.bind(this));

}




















function _hideInputTalk() {
	this.inputTalk.hide();
}

function _showInputTalk() {
	this.inputTalk.show();
}

function _setState(newState){
	
	this.state = newState;
	if (this.state == 'waiting') this.currentWaitingTime = 0;
	_printDebugTimer.call(this);

}








Conversation_Ctrl.prototype.changeState = function(newState) {

	_setState.call(this, newState);

};


Conversation_Ctrl.prototype.getState = function() {

	return this.state;

};













module.exports = Conversation_Ctrl;
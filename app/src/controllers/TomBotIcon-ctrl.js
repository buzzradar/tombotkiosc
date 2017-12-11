/*jslint node: true, unused: true, esnext: true */


const _ = require("lodash");


//----------------------------
// REQUIRE 
//----------------------------

const DisplayGlobals_SRV = require('../services/DisplayGlobals-srv'); 

let _nodeUtil = require('util');
let _eventEmitter3 = require('eventemitter3');





// ------------------------------------
// Constructor
// ------------------------------------

function TomBotIcon_Ctrl (target) {

	this.svgContainer = null;
	this.svgWidth = target.width();
	this.svgHeight = target.height();
	this.botColor = '#f6911f';
	this.botTalkingColor = '#77C0B2';
	this.state = "waiting";

	_setSVGDimensions.call(this, target);


}
_nodeUtil.inherits(TomBotIcon_Ctrl,_eventEmitter3); // extend _eventEmitter3 so we can use the event methods in LocalLib




function _setSVGDimensions(target) {

	var windowHeight = $(window).height();
	target.css('width',windowHeight * 0.20);
	target.css('height',windowHeight * 0.20);

	this.svgWidth = target.width();
	this.svgHeight = target.height();

	target.find('.robot').css('height',this.svgWidth - 50);
	target.find('.robot').css('width',this.svgWidth - 50);



	_createSVGTomBot.call(this,target);


}



//--------------------------------------------------------------------//
// ELEMENTS TO CREATE THE BOT
//--------------------------------------------------------------------//


function _createSVGTomBot(target) {

	var targetSelection = d3.select(target.get(0));
		this.svgContainer = targetSelection.append("svg")
		.attr("width", this.svgWidth)
		.attr("height", this.svgHeight);

	_addBotFigure.call(this,target);
	_addAnimationCircles.call(this);
	_addBGBot.call(this);

	// setInterval(_blinkEyes.bind(this),3000);



	// setTimeout(function() {
	// 	_changeState.call(this,"listening");
	// }.bind(this),2000);

	// setTimeout(function() {
	// 	_changeState.call(this,"thinking");
	// }.bind(this),5000);

	// setTimeout(function() {
	// 	_changeState.call(this,"talking");
	// }.bind(this),10000);

	// setTimeout(function() {
	// 	_changeState.call(this,"waiting");
	// }.bind(this),15000);

}


function _addBGBot() {

	var g = this.svgContainer.append("g");

	let dataCircle = [
						{color: this.botColor,r:this.svgWidth/2 - 20, opacity: 1, delay:0}
					  ];

	this.botBG = g.selectAll("circle")
		.data(dataCircle)
		.enter()
		.append("circle")
		.attr("cx", this.svgWidth/2)
		.attr("cy", this.svgHeight/2)
		.attr("opacity", function (d) { return d.opacity; })
		.attr("r", function (d) { return d.r; })
		.attr("fill", function (d) { return d.color; });

}


function _addBotFigure(target) {

	d3.xml("assets/TombotLogoOrangeCircle.svg").mimeType("image/svg+xml").get(function(error, xml) {
	  	if (error) throw error;
	  	target.find('.robot').append(xml.documentElement);

	  	setTimeout(_dispatchBotReady.bind(this),1000);

	}.bind(this));

}


function _dispatchBotReady() {
	this.emit("bot_ready");
}



function _addAnimationCircles() {

	this.circlesGroup = this.svgContainer.append("g");

	let dataCircles = [
						{color: '#fff',r:this.svgWidth/2 - 15, opacity: 0.2, delay:0}, 
						{color: '#fff',r:this.svgWidth/2 - 10, opacity: 0.2,delay:100},
						{color: '#fff',r:this.svgWidth/2, opacity: 0.2,delay:200}
					  ];

	this.circlesGroup.selectAll("circle")
	  .data(dataCircles)
	  .enter()
	  .append("circle")
	  .attr("cx", this.svgWidth/2)
	  .attr("cy", this.svgHeight/2)
	  .attr("opacity", function (d) { return d.opacity; })
	  .attr("r", 0)
	  .attr("fill", function (d) { return d.color; });

}












//--------------------------------------------------------------------//
// DIFFERENT STATES
//--------------------------------------------------------------------//



function _changeState(newState) {


	if (newState != this.state) {

		this.state = newState;

		//console.log("Change State.....", this.state);

		switch(newState) {
			case "waiting":
				_waiting.call(this);
			break;
			case "listening":
				_listening.call(this);
			break;
			case "thinking":
				_thinking.call(this);
			break;
			case "talking":
				_talking.call(this);
			break;
		}


	}

}

function _waiting() {

	this.botBG.transition().duration(500)
		    .attr('fill', this.botColor);

}


function _listening() {

	_pulseFatal.call(this);

}

function _thinking() {

	_pulseLightboltFatal.call(this);

}

function _talking() {

	this.botBG.transition().duration(500)
	    .attr('fill', this.botTalkingColor);

	_pulseMouthFatal.call(this);

}


function _pulseFatal() {

	var self = this;
	var circle = this.circlesGroup.selectAll("circle");

	if (this.state == "listening") {

		circle
		.transition().duration(1000)
		    //.attr('opacity', function(d){ return d.opacity})
		    .attr('r', function (d) { return d.r; })
		    .delay(function (d) { return d.delay; })
		.transition().duration(750)
	   	 	.attr('r', 0)
	   	.on("end", _pulseFatal.bind(self));

	   	this.botBG
		.transition().duration(1000)
	  		.attr("fill", '#cd7715')
		.transition().duration(1000)
	  		.attr("fill", this.botColor);


   }

}



function _pulseLightboltFatal() {

	var self = this;
	var antena = d3.selectAll(".antena");
	var lightbolts = d3.selectAll(".lightbolt");

	if (this.state == "thinking") {

		lightbolts
		.transition().duration(200)
		    .attr('opacity', 0)
		    // .delay(function (d) { return d.delay; })
		.transition().duration(150)
	   	 	.attr('opacity', 1)
	   	.on("end", _pulseLightboltFatal.bind(self));

	   	antena
	   	.transition().duration(200)
	   	 	.attr('r', 60)
			.attr("fill", '#b63e3e')
	   	.transition().duration(150)
	   	 	.attr('r', 35)
			.attr("fill", '#ffffff')
	   	.on("end", _pulseLightboltFatal.bind(self));

   }

}


function _pulseMouthFatal() {

	//Let's pulsate the mouth
	var self = this;
	var mouth = d3.selectAll(".mouth");
	var antena = d3.selectAll(".antena");

	if (this.state == "talking") {

	   	mouth
	   	.transition().duration(200)
			.style("fill", '#837b7b')
	   	.transition().duration(150)
			.style("fill", '#404040')
	   	.on("end", _pulseMouthFatal.bind(self));

	   	antena
	   	.transition().duration(200)
	   	 	.attr('r', 60)
			.attr("fill", '#b63e3e')
	   	.transition().duration(150)
	   	 	.attr('r', 35)
			.attr("fill", '#ffffff')
	   	.on("end", _pulseLightboltFatal.bind(self));

   }

}


function _blinkEyes() {

	var self = this;
	var eyes = d3.selectAll(".eyes");

	eyes
   	.transition().duration(200)
		.attr("ry", 5)
   	.transition().duration(150)
		.attr("ry", 41)
   	.transition().duration(200)
		.attr("ry", 5)
   	.transition().duration(150)
		.attr("ry", 41);

}



function _stopAllTransitions() {

	d3.selectAll("*").transition();

}



























TomBotIcon_Ctrl.prototype.changeState = function(newState) {

	_changeState.call(this,newState);

};



































module.exports = TomBotIcon_Ctrl;
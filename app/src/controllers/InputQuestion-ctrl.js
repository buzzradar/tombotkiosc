/*jslint node: true, unused: true, esnext: true */


const _ = require("lodash");


//----------------------------
// REQUIRE 
//----------------------------

const DisplayGlobals_SRV = require('../services/DisplayGlobals-srv'); 



// ------------------------------------
// Constructor
// ------------------------------------

function InputQuestion_Ctrl (inputTarget,botIcon) {

	this.inputTarget = inputTarget;
	this.botIcon = botIcon;

	_init.call(this);

}




function _init() {

	_addKeyListener.call(this);

}


function _addKeyListener() {

	this.inputTarget.keypress(function(e) {

		if(e.which == 13) {
	    	this.botIcon.changeState('thinking');
	    }else{
	    	this.botIcon.changeState('listening');
	    }

	}.bind(this));


	this.inputTarget.on("click", function () {
	   //$(this).select();
	   $(this).val('');
	});

}








































module.exports = InputQuestion_Ctrl;
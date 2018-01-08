/*jslint node: true, unused: true, esnext: true */


const _ = require("lodash");

const DisplayGlobals_SRV = require('./DisplayGlobals-srv'); 
const AIAgent_SRV = require('../services/AIAgent-srv'); 



//--------------------------------------
// CONSTRUCTOR
//--------------------------------------

let _ApiCalls;

function ApiCalls () {

  _ApiCalls = this;


}










ApiCalls.prototype.callGET = function(urlCall, dataObj, callBack) {

	console.log ("%c -> ", "background:#c5f442;", "APICalls -> question =>" , urlCall, dataObj);

	$.ajax({
		type: 'GET',
		url: urlCall,
		data: dataObj,
		cache : false,
		success: function(json) {
			console.log("Success!", json);
			if(callBack) callBack(json);
		},
		error: function(e) {
			console.log ("%c -> ", "background:#ff0000;", "GET APICalls.ajaxCall() ---> Error", e);
			var error_MOD = AIAgent_SRV.getModel("error");
			if(callBack) callBack(error_MOD);
		}
	});


};




















module.exports = new ApiCalls ();

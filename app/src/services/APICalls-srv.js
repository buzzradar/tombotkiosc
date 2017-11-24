/*jslint node: true, unused: true, esnext: true */


const _ = require("lodash");

const DisplayGlobals_SRV = require('./DisplayGlobals-srv'); 



//--------------------------------------
// CONSTRUCTOR
//--------------------------------------

let _ApiCalls;

function ApiCalls () {

  _ApiCalls = this;


}










ApiCalls.prototype.callGET = function(urlCall, dataObj, callBack) {

	console.log ("%c -> ", "background:#c5f442;", "APICalls-> POST : URL =>" , urlCall, dataObj);


		$.ajax({
			type: 'GET',
			url: urlCall,
			contentType: "application/json",
			data: dataObj,
			success: function(json) {
				console.log("Success!", json);
				if(callBack) callBack(json);
			},
			error: function(e) {
				console.log ("%c -> ", "background:#ff0000;", "GET APICalls.ajaxCall() ---> Error", e);
			}
		});





};




















module.exports = new ApiCalls ();

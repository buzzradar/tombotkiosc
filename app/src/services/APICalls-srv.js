/*jslint node: true, unused: true, esnext: true */


const _ = require("lodash");

const DisplayGlobals_SRV = require('./A01_DisplayGlobals-srv'); 



//--------------------------------------
// CONSTRUCTOR
//--------------------------------------

let _ApiCalls;

function ApiCalls () {

  _ApiCalls = this;


}










ApiCalls.prototype.call = function(type, urlCall, dataObj, callBack) {


	if (type === 'GET') {

		//-------------
		//GET
		//-------------


		console.log ("%c -> ", "background:#87eb9d;", "APICalls-> GET  : URL =>" , urlCall, dataObj);


		$.ajax({
			type: 'GET',
			url: urlCall,
			async: false,
			jsonpCallback: 'jsonCallback',
			contentType: "application/json",
			dataType: 'jsonp',
			success: function(json) {
				if(callBack) callBack(json);
			},
			error: function(e) {
				console.log ("%c -> ", "background:#ff0000;", "GET APICalls.ajaxCall() ---> Error" + e.responseText);
			}
		});

	}else{

		//-------------
		//POST
		//-------------

		console.log ("%c -> ", "background:#c5f442;", "APICalls-> POST : URL =>" , urlCall, dataObj);


		$.post(urlCall, dataObj)
			.done(function( data ) {
					console.log ("%c -> ", "background:#87eb9d;", "APICalls.ajaxCall() ---> ", data);
					if(callBack) callBack(data);
			})
			.fail(function() {
				console.log ("%c -> ", "background:#ff0000;", "POST APICalls.ajaxCall() ---> Error");
			})
			.always(function() {
				
			});

	}




};























module.exports = new ApiCalls ();

/*jslint node: true, unused: true, esnext: true */


const _ = require("lodash");
const DisplayGlobals_SRV = require('./DisplayGlobals-srv'); 




//--------------------------------------
// CONSTRUCTOR
//--------------------------------------

let _JSONHandler;

function JSONHandler () {

  _JSONHandler = this;

}




JSONHandler.prototype.load = function (jsonURL,onSuccess) {

    console.log("JSONHandler -> loadJSON : " + jsonURL);

    $.ajax({
        dataType: "jsonp",
        jsonp: "callback",
        url: jsonURL,
        // data: data,
        success: function(jsonObj) {
            console.log("JSON SUCCESS -->", jsonObj);
            onSuccess(jsonObj);
        },
        error : function(ret) {
            console.log ("%c -> JSON ERROR => ", "background:#ff0000;", ret);
            console.log ("%c -> NOTE => ", "background:#ff0000;", "NOTE:Let's check If It is a local masterConfig. If so take the String and turn it into a JSON object:");

            if(ret.responseText) {
                onSuccess(JSON.parse(ret.responseText));
            }else{
                console.log("FATAL Error! Check the master config from index.html. Should be loaded from http:// not a relative json file.");
            }

        }
    });

};























module.exports = new JSONHandler ();

/*jslint node: true, unused: true, esnext: true */




const _ = require("lodash");


//--------------------------------------
// CONSTRUCTOR
//--------------------------------------


let _DisplayGlobals;

function DisplayGlobals () {

  _DisplayGlobals = this;

}
















//--------------------------------------
// version
//--------------------------------------


let _version = "0.1";

DisplayGlobals.prototype.getVersion = function() {

  return _version;

};









//----------------------------
// App Node Ref
//----------------------------

let _appNode;

DisplayGlobals.prototype.setAppNodeRef = function(appNode) {

  _appNode = appNode;

};


DisplayGlobals.prototype.getAppNodeRef = function() {

    return _appNode;

};


















module.exports = new DisplayGlobals ();

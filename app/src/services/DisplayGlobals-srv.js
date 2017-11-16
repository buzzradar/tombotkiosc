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


let _version = "0.2";

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






//----------------------------
// Sentences JSON
//----------------------------

let _sentencesJSON;

DisplayGlobals.prototype.setSentencesJSON = function(sentencesJSON) {

  _sentencesJSON = sentencesJSON;

};


DisplayGlobals.prototype.getSentencesJSON = function() {

    return _sentencesJSON;

};


















module.exports = new DisplayGlobals ();

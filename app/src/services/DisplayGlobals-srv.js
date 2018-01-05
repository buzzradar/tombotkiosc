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


let _version = "0.3";

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
// Conversation Reference
//----------------------------

let _conversation;

DisplayGlobals.prototype.setConversationRef = function(conversation) {

  _conversation = conversation;

};


DisplayGlobals.prototype.getConversationRef = function() {

    return _conversation;

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





//----------------------------
// Dev Mode
//----------------------------

let _isDevMode;

DisplayGlobals.prototype.setDevMode = function(isDevMode) {

  _isDevMode = isDevMode;

};


DisplayGlobals.prototype.isDevMode = function() {

    return _isDevMode;

};




















module.exports = new DisplayGlobals ();

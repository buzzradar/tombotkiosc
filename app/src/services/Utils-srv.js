/*jslint node: true, unused: true, esnext: true */




const _ = require("lodash");
const DisplayGlobals_SRV = require('./DisplayGlobals-srv'); 

let _nodeUtil = require('util');
let _eventEmitter3 = require('eventemitter3');

//--------------------------------------
// CONSTRUCTOR
//--------------------------------------


let _Utils;

function Utils_SRV () {

  _Utils = this;

}

_nodeUtil.inherits(Utils_SRV,_eventEmitter3); // extend _eventEmitter3 so we can use the event methods in LocalLib





var dispatchCopyAnimationFinished = function(inputDOM) {
    inputDOM.attr("disabled", false);
    _Utils.emit("copy_animation_finished");
};


Utils_SRV.prototype.animateCopy = function (inputDOM,copy,owner,botIcon) {

    inputDOM.attr("disabled", true);
    let copyArray = copy.split('');
    let copyAnim = '';

    botIcon.changeState("talking");
    let copyInterval = setInterval(onEachInterval, _getAnimationTime(owner));

    function onEachInterval() {

        if (copyArray.length != 0) {
            copyAnim += copyArray.shift();
            inputDOM.val(copyAnim);
        }else{
            clearInterval(copyInterval);
            copyInterval = null;
            botIcon.changeState("waiting");
            
            setTimeout(dispatchCopyAnimationFinished.bind(this,inputDOM),500);

            return false;
        }

    }



};



function _getAnimationTime(owner) {

    var t = ( DisplayGlobals_SRV.isDevMode() ) ? 10 : 25;
    if (owner == "user") t = 70;

    return t;

}

 








Utils_SRV.prototype.getRandomGreeting = function () {

    var greetingsArray = DisplayGlobals_SRV.getSentencesJSON().sentences.greetings;
    var randomIndex = _.random(0,greetingsArray.length-1);
    return greetingsArray[randomIndex];

};


Utils_SRV.prototype.getRandomAcknowledge = function () {

    var acknowledgeArray = DisplayGlobals_SRV.getSentencesJSON().sentences.acknowledge;
    var randomIndex = _.random(0,acknowledgeArray.length-1);
    return acknowledgeArray[randomIndex];

};


Utils_SRV.prototype.getRandomShy = function () {

    var shyArray = DisplayGlobals_SRV.getSentencesJSON().sentences.shy;
    var randomIndex = _.random(0,shyArray.length-1);
    return shyArray[randomIndex];

};





























module.exports = new Utils_SRV ();

/*jslint node: true, unused: true, esnext: true */


const DisplayGlobals_SRV = require('./services/DisplayGlobals-srv'); 
const TomBotKioscApp_NODE = require('./TomBotKioscNode-ctrl');


_initApp.call(this);    			


function _initApp() {

	DisplayGlobals_SRV.setAppNodeRef(new TomBotKioscApp_NODE());

}
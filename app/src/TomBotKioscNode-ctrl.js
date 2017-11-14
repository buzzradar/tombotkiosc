/*jslint node: true, unused: true, esnext: true */



//----------------------------
// REQUIRE  
//----------------------------

const DisplayGlobals_SRV = require('./services/DisplayGlobals-srv'); 
const TomBotIcon_CTRL = require('./controllers/TomBotIcon-ctrl');
const InputQuestion_CTRL = require('./controllers/InputQuestion-ctrl');








//----------------------------
//  Constructor
//----------------------------

function App_NODE () {

    console.log ("%c -> -------------------------------------- ", "background:#eee;", '');
    console.log ("%c -> -------------------------------------- ", "background:#eee;", '');
    console.log ("%c -> VERSION:", "background:#eee;", DisplayGlobals_SRV.getVersion() );
    console.log ("%c -> -------------------------------------- ", "background:#eee;", '');
    console.log ("%c -> -------------------------------------- ", "background:#eee;", '');

    
    var botIcon = new TomBotIcon_CTRL($('.tomboticon'));
    var question = new InputQuestion_CTRL($('.tombot-question'),botIcon);

}
















module.exports = App_NODE;




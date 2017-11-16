/*jslint node: true, unused: true, esnext: true */



//----------------------------
// REQUIRE  
//----------------------------

const DisplayGlobals_SRV = require('./services/DisplayGlobals-srv'); 
const JSONHandler_SRV = require('./services/JSONHandler-srv'); 
const Conversation_CTRL = require('./controllers/Conversation-ctrl');








//----------------------------
//  Constructor
//----------------------------

function App_NODE () {

    console.log ("%c -> -------------------------------------- ", "background:#eee;", '');
    console.log ("%c -> -------------------------------------- ", "background:#eee;", '');
    console.log ("%c -> VERSION:", "background:#eee;", DisplayGlobals_SRV.getVersion() );
    console.log ("%c -> -------------------------------------- ", "background:#eee;", '');
    console.log ("%c -> -------------------------------------- ", "background:#eee;", '');


    _loadSentencesJSON();
    

}








function _loadSentencesJSON() {

    let sentencesJSON = 'json/sentences.json';

    JSONHandler_SRV.load(sentencesJSON, function(sentencesConfJSON) {
        
        console.log ("%c -> Master Config Succesfully Loaded => ", "background:#00ff00;", sentencesConfJSON);

        DisplayGlobals_SRV.setSentencesJSON(sentencesConfJSON);

        var conversation = new Conversation_CTRL();

    }.bind(this));

}











module.exports = App_NODE;




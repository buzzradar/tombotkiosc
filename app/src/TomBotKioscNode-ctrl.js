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
    _getURL();

}








function _loadSentencesJSON() {

    let sentencesJSON = 'json/sentences.json';

    JSONHandler_SRV.load(sentencesJSON, function(sentencesConfJSON) {
        
        console.log ("%c -> Master Config Succesfully Loaded => ", "background:#00ff00;", sentencesConfJSON);

        DisplayGlobals_SRV.setSentencesJSON(sentencesConfJSON);
        DisplayGlobals_SRV.setConversationRef(new Conversation_CTRL());

    }.bind(this));

}



function _getURL() {

    var url = window.location.href;
    DisplayGlobals_SRV.setIsLocalhost(url.includes('localhost'));

    console.log ("%c -> Window.location.href ---> ", "background:#4fc7f4;", url);


}









module.exports = App_NODE;




/*jslint node: true, unused: true, esnext: true */



const Handlebars = require('Handlebars');










//----------------------------
// CONSTRUCTOR
//----------------------------

let _HBTemplates;

function HBTemplates () {

    _HBTemplates = this;

    Handlebars.registerHelper("if", function(conditional, options) {
        if (conditional == options.hash.equals) {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }
    });

}


















//----------------------------
// PUBLIC METHODS
//----------------------------


HBTemplates.prototype.getTemplate = function (tplId, data) {

    // console.log("Get Template Id = ", tplId, data);


    switch(tplId) {
        case 'news_item':
            _setSentimentScore(data);
        break;
        case 'unknown':
            _setHelpContent(tplId,data);
            tplId = 'help_item';
        break;
        case 'help_item':
            _setHelpContent(tplId,data);
        break;
    }


    if (!data) {
        return $(templates[tplId]);        
    }else{
        let template = Handlebars.compile(templates[tplId]);
        let result = template(data);
        return $(result);
    }

};



HBTemplates.prototype.loadTemplate = function (tplId, data, targetElem) {

    // console.log("This is handlebars = ", tplId);

    let template = Handlebars.compile(templates[tplId]);
    let result = template(data);
    
    targetElem.html(result);
  
};




function _setSentimentScore(data) {

    data.sentiment = {
        class : (data.sentiment < 0) ? 'negative' : 'positive',
        absValue : Math.abs(data.sentiment),
    };

}


function _setHelpContent(source,data) {

    var suggestionsHTML = '';
    var suggestions = [
                "What are the top trends at CES this hour?",
                "What has been the biggest moment at CES so far?",
                "Where in the world are people talking about CES 2018 the most?",
                "What are the big news stories at CES today?",
                "How many conference sessions are there at CES this year?",
                "How many exhibitors are attending CES this year?",
                "How many people attended CES last year?",
                "How many people have attended CES this week so far?",
                "What events are happening now / today / tomorrow?",
                "How many sq feet is CES?"
            ];
    data.dataProvider = (data.dataProvider.length == 0) ? suggestions : data.dataProvider;
    $.each( data.dataProvider, function( key, value ) {
      suggestionsHTML += '<li><a href="#" class="suggested-question" data-question="'+value+'">'+value+'</a></li>';
    });

    if (source == "unknown") {
        data.answer = 'Is this what you wanted to ask?';        
        data.subheader = '';   
        data.suggestions = suggestionsHTML;     
    }else{
        data.answer = 'I sense you need some help';
        data.subheader = 'Some say I am very good at my job but I am not perfect. Here are some examples of the questions I can answer...';        
        data.suggestions = suggestionsHTML;     
    }

}














module.exports = new HBTemplates ();

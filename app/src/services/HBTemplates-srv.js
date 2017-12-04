var templates = {"intro_item":"           <div class=\"intro-slide\">        <div>          <span class=\"title\">{{question}}</span>          <span class=\"pull-right\">            <button type=\"button\" class=\"btn btn-lg yellow-gold ask-me\">ASK ME QUESTIONS</button>          </span>        </div>        <div id=\"chartdiv\" style=\"width: 100%; height: 450px; background-color: #FFFFFF;\"></div>      </div>          ","graph_item":"           <div class=\"graph-item\">        <div>          <span class=\"title\">{{title}}</span>          <span class=\"pull-right\">            <button type=\"button\" class=\"btn btn-lg yellow-gold ask-me\">ASK MORE QUESTIONS</button>          </span>        </div>        <div id=\"chartdiv\" style=\"width: 100%; height: 450px; background-color: #FFFFFF;\"></div>      </div>          ","copy_item":"               <div class=\"copy-item\">          <div>            <span class=\"title\">{{title}}</span>            <span class=\"pull-right\">              <button type=\"button\" class=\"btn btn-lg yellow-gold ask-me\">{{btnCopy}}</button>            </span>          </div>          <p>{{{copy}}}</p>                 </div>              ","help_item":"               <div class=\"slide\">          <div>            <span class=\"title\">Let me see if I can help you! </span>            <span class=\"pull-right\">              <button type=\"button\" class=\"btn btn-lg yellow-gold ask-me\">GOT IT! ASK A QUESTION</button>            </span>          </div>          <p>Some say I am very good at my job but I am not perfect. Here are some examples of the questions I can answer...</p>          <ul class=\"help-list-questions\">            <li><a href=\"#\">What are the top trends at CES this hour?</a></li>            <li><a href=\"#\">What has been the biggest moment at CES so far?</a></li>            <li><a href=\"#\">Where in the world are people talking about CES 2018 the most?</a></li>            <li><a href=\"#\">What are the big news stories at CES today?</a></li>            <li><a href=\"#\">How many conference sessions are there at CES this year?</a></li>            <li><a href=\"#\">How many exhibitors are attending CES this year? </a></li>            <li><a href=\"#\">How many people attended CES last year?</a></li>          </ul>                 </div>              "}
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



















module.exports = new HBTemplates ();

var templates = {"intro_slide":"           <div class=\"intro-slide\">        <div>          <span class=\"title\"><u>Hello I am TomBot the AI Social Data Analyst</u></span>          <span class=\"pull-right\">            <button type=\"button\" class=\"btn btn-lg yellow-gold ask-me\">ASK ME QUESTIONS</button>          </span>        </div>        <p>Namaste. Do you want to sell a New Age product and/or service? Tired of coming up with meaningless copy for your starry-eyed customers? Want to join the ranks of bestselling self-help authors? We can help.</p>        <div class=\"question\">          <span>Question <i class=\"fa fa-arrow-right\"></i></span> <span class=\"q\">What are the top trends at CES today? </span>         <!--  <span class=\"pull-right\">            <button type=\"button\" class=\"btn btn-lg yellow-gold\">ASK ME QUESTIONS</button>          </span> -->        </div>        <div id=\"chartdiv\" style=\"width: 100%; height: 450px; background-color: #FFFFFF;\"></div>      </div>          "}
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

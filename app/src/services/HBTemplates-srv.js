var templates = {"intro_content":"           <div class=\"intro-slide\">        <div>          <span class=\"title\">{{title}}</span>          <span class=\"pull-right\">            <button type=\"button\" class=\"btn btn-lg yellow-gold ask-me\">ASK ME QUESTIONS</button>          </span>        </div>        <p>{{copy}}</p>        <div class=\"question\">          <span>Question <i class=\"fa fa-arrow-right\"></i></span> <span class=\"q\">{{question}} </span>         <!--  <span class=\"pull-right\">            <button type=\"button\" class=\"btn btn-lg yellow-gold\">ASK ME QUESTIONS</button>          </span> -->        </div>        <div id=\"chartdiv\" style=\"width: 100%; height: 450px; background-color: #FFFFFF;\"></div>      </div>          ","graph_item":"           <div class=\"graph-item\">        <div>          <span class=\"title\">{{title}}</span>          <span class=\"pull-right\">            <button type=\"button\" class=\"btn btn-lg yellow-gold ask-me\">ASK MORE QUESTIONS</button>          </span>        </div>        <div id=\"chartdiv\" style=\"width: 100%; height: 450px; background-color: #FFFFFF;\"></div>      </div>          ","copy_item":"               <div class=\"copy-item\">          <div>            <span class=\"title\">{{title}}</span>            <span class=\"pull-right\">              <button type=\"button\" class=\"btn btn-lg yellow-gold ask-me\">{{btnCopy}}</button>            </span>          </div>          <p>{{{copy}}}</p>                 </div>              "}
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

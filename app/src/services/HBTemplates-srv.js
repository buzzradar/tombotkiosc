var templates = {"help_item":"           <div class=\"slide\">        <div>          <span class=\"title\">            <div class=\"circle\"><i class=\"fa fa-info\"></i></div>            <div class=\"title-copy\">Let me see if I can help you!</div>          </span>          <span class=\"pull-right\">            <button type=\"button\" class=\"btn btn-lg yellow-gold ask-me\">Got It! Ask a question</button>          </span>        </div>        <div class=\"help\">          <p>Some say I am very good at my job but I am not perfect. Here are some examples of the questions I can answer...</p>          <ul class=\"help-list-questions\">            <li><a href=\"#\">What are the top trends at CES this hour?</a></li>            <li><a href=\"#\">What has been the biggest moment at CES so far?</a></li>            <li><a href=\"#\">Where in the world are people talking about CES 2018 the most?</a></li>            <li><a href=\"#\">What are the big news stories at CES today?</a></li>            <li><a href=\"#\">How many conference sessions are there at CES this year?</a></li>            <li><a href=\"#\">How many exhibitors are attending CES this year? </a></li>            <li><a href=\"#\">How many people attended CES last year?</a></li>          </ul>        </div>             </div>          ","graph_item":"           <div class=\"slide\">        <div>          <span class=\"title\">            <!-- <div class=\"circle\"><i class=\"fa fa-lightbulb-o\"></i></div> -->            <div class=\"title-copy\">{{answer}}</div>          </span>          <span class=\"pull-right\">            <button type=\"button\" class=\"btn yellow-gold ask-me\">Ask a new question</button>          </span>        </div>        <div id=\"chartdiv\" style=\"width: 100%; background-color: white;\"></div>      </div>          ","photo_item":"           <div class=\"slide\">        <div>          <span class=\"title\">            <!-- <div class=\"circle\"><i class=\"fa fa-bolt\"></i></div> -->            <div class=\"title-copy\">{{answer}}</div>          </span>          <span class=\"pull-right\">            <button type=\"button\" class=\"btn btn-lg yellow-gold ask-me\">Ask a new question</button>          </span>        </div>        <div class=\"photo\">                    <div class=\"row photo__main\">            <div class=\"col-md-5\">              <img src=\"{{image_url}}\" width=\"100%\">            </div>            <div class=\"col-md-7\">              <div class=\"title\">                <i class=\"fa fa-1x fa-twitter\"></i> {{user.full_name}}               </div>              <span class=\"date\">{{tweet_date_ago}}</span>              <div class=\"description\">                 {{content}}              </div>            </div>          </div>                  </div>      </div>          ","tweet_item":"           <div class=\"slide\">        <div>          <span class=\"title\">            <!-- <div class=\"circle\"><i class=\"fa fa-bolt\"></i></div> -->            <div class=\"title-copy\">{{answer}}</div>          </span>          <span class=\"pull-right\">            <button type=\"button\" class=\"btn btn-lg yellow-gold ask-me\">Ask a new question</button>          </span>        </div>        <div class=\"tweet\">                    <div class=\"tweet__user\">            <span class=\"tw-icon\">              <i class=\"fa fa-2x fa-twitter\"></i>            </span>            <div class=\"name\">{{user.name}} <small>@{{user.username}}</small></div>            <div class=\"date\">{{tweet_date_ago}}</div>          </div>          <div class=\"row tweet__main\">            <div class=\"col-md-3\">              <img src=\"{{user.profile_image_big}}\" width=\"100%\">            </div>            <div class=\"col-md-9\">              {{content}}            </div>          </div>                  </div>      </div>          ","news_item":"           <div class=\"slide\">        <div>          <span class=\"title\">            <!-- <div class=\"circle\"><i class=\"fa fa-bolt\"></i></div> -->            <div class=\"title-copy\">{{answer}}</div>          </span>          <span class=\"pull-right\">            <button type=\"button\" class=\"btn btn-lg yellow-gold ask-me\">Ask a new question</button>          </span>        </div>        <div class=\"news\">                    <div class=\"row news__main\">            <div class=\"col-md-4\">              <img src=\"{{image_url}}\" width=\"100%\">            </div>            <div class=\"col-md-8\">              <div class=\"title\">                <i class=\"fa fa-1x fa-instagram\"></i> {{user.full_name}}               </div>              <span class=\"date\">{{tweet_date_ago}}</span>              <div class=\"description\">                 {{content}}              </div>            </div>          </div>                  </div>      </div>          "}
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

var templates = {"help_item":"           <div class=\"slide\">        <div class=\"title\">          <span><i class=\"fa fa-chevron-right\"></i> {{answer}} </span><a href=\"#\" class=\"pull-right ask-me\">Got It! Ask a Question</a>        </div>        <div class=\"help\">          <p>{{subheader}}</p>          <ul class=\"help-list-questions\">            {{{suggestions}}}          </ul>        </div>             </div>          ","graph_item":"           <div class=\"slide\">        <div class=\"title\">          <span><i class=\"fa fa-chevron-right\"></i> {{answer}} </span><a href=\"#\" class=\"pull-right ask-me\">Ask a New Question</a>        </div>        <div id=\"chartdiv\" style=\"width: 100%; background-color: white;\"></div>      </div>          ","photo_item":"           <div class=\"slide\">        <div class=\"title\">          <span><i class=\"fa fa-chevron-right\"></i> {{answer}} </span><a href=\"#\" class=\"pull-right ask-me\">Ask a New Question</a>        </div>        <div class=\"photo\">                    <div class=\"row photo__main\">            <div class=\"col-md-4\">              <img src=\"{{image_url}}\" width=\"100%\">            </div>            <div class=\"col-md-8\">              <div class=\"title\">                <i class=\"fa fa-1x fa-twitter\"></i> {{user.full_name}}               </div>              <span class=\"date\">{{tweet_date_ago}}</span>              <div class=\"description\">                 {{content}}              </div>            </div>          </div>                  </div>      </div>          ","tweet_item":"           <div class=\"slide\">        <div class=\"title\">          <span><i class=\"fa fa-chevron-right\"></i> {{answer}} </span><a href=\"#\" class=\"pull-right ask-me\">Ask a New Question</a>        </div>        <div class=\"tweet\">                    <div class=\"tweet__user\">            <span class=\"tw-icon\">              <i class=\"fa fa-2x fa-twitter\"></i>            </span>            <div class=\"name\">{{user.name}} <small>@{{user.username}}</small></div>            <div class=\"date\">{{tweet_date_ago}}</div>          </div>          <div class=\"row tweet__main\">            <div class=\"col-md-3\">              <img src=\"{{user.profile_image_big}}\" width=\"100%\">            </div>            <div class=\"col-md-9\">              {{content}}            </div>          </div>                  </div>      </div>          ","news_item":"           <div class=\"slide\">        <div class=\"title\">          <span><i class=\"fa fa-chevron-right\"></i> {{answer}} </span><a href=\"#\" class=\"pull-right ask-me\">Ask a New Question</a>        </div>        <div class=\"news\">                    <div class=\"source\">            <span class=\"sentiment {{sentiment.class}}\">{{sentiment.absValue}}</span> <span class=\"source\">{{source}}</span>            <span class=\"date pull-right\">{{date}}</span>          </div>          <div class=\"title\">            {{title}}          </div>                    <div class=\"row news__main\">            <div class=\"col-md-4\">              <img src=\"{{image}}\" width=\"100%\">            </div>            <div class=\"col-md-8\">              <div class=\"news_copy\">                 {{copy}}              </div>            </div>          </div>                  </div>      </div>          ","keynotes_item":"           <div class=\"slide\">        <div class=\"title\">          <span><i class=\"fa fa-chevron-right\"></i> {{answer}} </span><a href=\"#\" class=\"pull-right ask-me\">Ask a New Question</a>        </div>        <div class=\"keynotes\">          <div class=\"row\">            <div class=\"col-md-6\">              <div class=\"item\">                <div class=\"when now\">NOW</div>                <div class=\"location\"> <i class=\"fa fa-map-marker\"></i> Monte Carlo, Park Theater</div>                <div class=\"time\"> <i class=\"fa fa-clock-o\"></i> 6:30-7:30 PM</div>                <div class=\"keynote\"> Brian Krzanich Chief Executive Officer (CEO) of Intel</div>              </div>            </div>            <div class=\"col-md-6\">              <div class=\"item\">                <div class=\"when next\">NEXT</div>                <div class=\"location\"> <i class=\"fa fa-map-marker\"></i> Monte Carlo, Park Theater</div>                <div class=\"time\"> <i class=\"fa fa-clock-o\"></i> 6:30-7:30 PM</div>                <div class=\"keynote\"> Gary Shapiro President and CEO Consumer Technology Association (CTA)</div>              </div>                          </div>          </div>        </div>      </div>          ","stats_item":"           <div class=\"slide\">        <div class=\"title\">          <span><i class=\"fa fa-chevron-right\"></i> {{answer}} </span><a href=\"#\" class=\"pull-right ask-me\">Ask a New Question</a>        </div>        <div class=\"stats\">          <div class=\"row\">            <div class=\"col-md-12 text-center\">              <span>56</span>            </div>          </div>        </div>      </div>          "}
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

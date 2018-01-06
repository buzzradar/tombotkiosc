var templates = {"help_item":"           <div class=\"slide\">        <div class=\"title\">          <span><i class=\"fa fa-chevron-right\"></i> {{answer}} </span><a href=\"#\" class=\"pull-right ask-me\">Got It! Ask a Question</a>        </div>        <div class=\"help\">          <p>{{subheader}}</p>          <ul class=\"help-list-questions\">            {{{suggestions}}}          </ul>        </div>             </div>          ","graph_item":"           <div class=\"slide\">        <div class=\"title\">          <span><i class=\"fa fa-chevron-right\"></i> {{answer}} </span><a href=\"#\" class=\"pull-right ask-me\">Ask a New Question</a>        </div>        <div id=\"chartdiv\" style=\"width: 100%; background-color: white;\"></div>      </div>          ","photo_item":"           <div class=\"slide\">        <div class=\"title\">          <span><i class=\"fa fa-chevron-right\"></i> {{answer}} </span><a href=\"#\" class=\"pull-right ask-me\">Ask a New Question</a>        </div>        <div class=\"photo\">                    <div class=\"row photo__main\">            <div class=\"col-md-4\">              <img src=\"{{image_url}}\" width=\"100%\">            </div>            <div class=\"col-md-8\">              <div class=\"title\">                <i class=\"fa fa-1x fa-twitter\"></i> {{user.full_name}}               </div>              <span class=\"date\">{{tweet_date_ago}}</span>              <div class=\"description\">                 {{content}}              </div>            </div>          </div>                  </div>      </div>          ","tweet_item":"           <div class=\"slide\">        <div class=\"title\">          <span><i class=\"fa fa-chevron-right\"></i> {{answer}} </span><a href=\"#\" class=\"pull-right ask-me\">Ask a New Question</a>        </div>        <div class=\"tweet\">                    <div class=\"tweet__user\">            <span class=\"tw-icon\">              <i class=\"fa fa-2x fa-twitter\"></i>            </span>            <div class=\"name\">{{user.name}} <small>@{{user.username}}</small></div>            <div class=\"date\">{{tweet_date_ago}}</div>          </div>          <div class=\"row tweet__main\">            <div class=\"col-md-3\">              <img src=\"{{user.profile_image_big}}\" width=\"100%\">            </div>            <div class=\"col-md-9\">              {{content}}            </div>          </div>                  </div>      </div>          ","news_item":"           <div class=\"slide\">        <div class=\"title\">          <span><i class=\"fa fa-chevron-right\"></i> {{answer}} </span><a href=\"#\" class=\"pull-right ask-me\">Ask a New Question</a>        </div>        <div class=\"news\">                    <div class=\"source\">            <span class=\"sentiment {{sentiment.class}}\">{{sentiment.absValue}}</span> <span class=\"source\">{{source}}</span>            <span class=\"date pull-right\">{{date}}</span>          </div>          <div class=\"title\">            {{title}}          </div>                    <div class=\"row news__main\">            <div class=\"col-md-4\">              <img src=\"{{image}}\" width=\"100%\">            </div>            <div class=\"col-md-8\">              <div class=\"news_copy\">                 {{copy}}              </div>            </div>          </div>                  </div>      </div>          ","events_item":"           <div class=\"slide\">        <div class=\"title\">          <span><i class=\"fa fa-chevron-right\"></i> {{answer}} </span><a href=\"#\" class=\"pull-right ask-me\">Ask a New Question</a>        </div>        <div class=\"keynotes\">          <div class=\"row\">            <div class=\"col-md-12\">                            <div class=\"item\">                <!-- This will get rendered dynamically (see template id event_layout) -->              </div>              <div class=\"controls\">                <button type=\"button\" class=\"btn green-dark btn-xs previous-events-btn\">Previous Event</button>                <button type=\"button\" class=\"btn purple-soft btn-xs next-events-btn\">Next Event</button>              </div>            </div>          </div>        </div>      </div>          ","event_layout":"      <div class=\"when now\">        EVENT {{numEvent}}      </div>      <div class=\"keynote\">{{title}}</div>      <div class=\"speaker\"> <i class=\"fa fa-user\"></i>{{speaker}}</div>      <div class=\"location\"> <i class=\"fa fa-map-marker\"></i> {{location}}</div>      <div class=\"time\"> <i class=\"fa fa-clock-o\"></i> {{time}}</div>    ","stats_item":"           <div class=\"slide\">        <div class=\"title\">          <span><i class=\"fa fa-chevron-right\"></i> {{answer}} </span><a href=\"#\" class=\"pull-right ask-me\">Ask a New Question</a>        </div>        <div class=\"stats\">          <div class=\"row\">            <div class=\"col-md-12 text-center\">              <span>{{number}}</span>            </div>          </div>        </div>      </div>          "}
/**
 * Created by Fred.Wu on 2014/11/22.
 */

var PRANCE_JS = {
  javascript_url: 'js/',
  locale: 'zh-cn',
  locale_array: {},
  g: function (k) {
    if (typeof(this.locale_array[k]) == 'undefined')
      return k;
    else return this.locale_array[k];
  },
  get_javascript_path: function (js) {
    return this.javascript_url + js;
  },
  load_component: function (js, fc) {
    require(js, function () {
      if (typeof(fc) == 'function') fc();
    });
  },
  patch_javascript_iframe: function () {
    //$('body').find('iframe').contents().find('body').append("<div>Insert!!</div>");
    //console.log('fe!!!');
  }
};

$(document).ready(function () {
  if (!webix.env.touch && webix.ui.scrollSize)
    webix.CustomScroll.init();

  PRANCE_JS.javascript_url = 'js/';
  PRANCE_JS.load_component([
    PRANCE_JS.get_javascript_path('locale/' + PRANCE_JS.locale),
    PRANCE_JS.get_javascript_path('main/util'),
    PRANCE_JS.get_javascript_path('main/init'),
    //
    PRANCE_JS.get_javascript_path('main/layout'),
    PRANCE_JS.get_javascript_path('main/layout/leafs'),
    PRANCE_JS.get_javascript_path('main/ui')
  ], function () {
    prance_layout.init();
    //
    PRANCE_JS.load_component([
      PRANCE_JS.get_javascript_path('iframe/init'),
      PRANCE_JS.get_javascript_path('iframe/event')
    ], function () {
      prance_iframe.init();
      PRANCE_JS.load_component([
        PRANCE_JS.get_javascript_path('app/iframe_page')
      ])
    });
    //
    PRANCE_JS.load_component([
      PRANCE_JS.get_javascript_path('console/init')
    ], function () {
      prance_console.init();
    });
//
//
//
    PRANCE_JS.load_component([
      PRANCE_JS.get_javascript_path('app/menu')]);

  });


  /*
   require([
   PRANCE_JS.get_javascript_path('main/util.js'),
   PRANCE_JS.get_javascript_path('main/init.js'),
   PRANCE_JS.get_javascript_path('main/ui.js')
   ], function () {
   require([
   PRANCE_JS.get_javascript_path('iframe/init.js'),
   PRANCE_JS.get_javascript_path('iframe/event.js')
   ]);
   require([
   PRANCE_JS.get_javascript_path('console/init.js')
   ]);
   });*/

  /*
   webix.ready(function () {
   prance_ui_object.prance_iframe().attachEvent("onBeforeLoad", function () {
   console.log('onBeforeLoad');
   prance_iframe.init();
   });
   prance_ui_object.prance_iframe().attachEvent('onAfterLoad', function () {
   console.log('onAfterLoad');
   prance_console.init();
   });
   prance_ui_object.prance_iframe().load("data/fda_feed.html");
   });
   */


});
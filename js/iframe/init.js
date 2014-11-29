/**
 * Created by Fred.Wu on 2014/11/22.
 */

var prance_iframe = {
  box: null,
  __debug: prance_layout.__debug,
  init: function () {
    prance_iframe_event.init();
    //
    prance_unit.webix_jquery_object('body-iframe-left-space').css('background-color', '#333');
    prance_unit.webix_jquery_object('body-iframe-right-space').css('background-color', '#333');
  }
};
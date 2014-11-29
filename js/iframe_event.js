/**
 * Created by Fred.Wu on 2014/11/13.
 */

$(document).ready(function () {

  console.log('iframe Loading...');

/*  var PRANCE_IFRAME_TOOLS = {
    add: function (obj, target_obj) {
      obj.add(target_obj);
    }
  };*/

  var prance_iframe_event = window.parent.prance_iframe_event;
  var item_active = null;
  $('body').mouseover(function (event) {
    //
    item_active = $(event.target);
    /*
     window.parent.prance_unit.bar_info(
     'class: ' + item_active.attr('class') +
     ', nodeName: ' + item_active.context.nodeName +
     ', offsetLeft: ' + item_active.offset().left +
     ', offsetTop: ' + item_active.offset().top +
     ', Width: ' + item_active.width() +
     ', Height: ' + item_active.height() +
     ', css_top: ' + item_active.offset().top +
     ', scrollTop: ' + $('body').scrollTop() +
     ', Parent-Top: ' + ($(event.target).offset().top - $(window).scrollTop())
     );*/
    prance_iframe_event.on_mouse_enter(item_active);
  }).click(function (event) {
    prance_iframe_event._iframe_scroll_top = $('body').scrollTop();
    prance_iframe_event.on_click(item_active, 0, $('body').scrollTop());
  });

  $(window).scroll(function (event) {
    prance_iframe_event.on_iframe_scroll($('body').scrollTop());
  });


  console.log('iframe Loading... Over');
  //window.parent.webix.message("over");
});

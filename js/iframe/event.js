/**
 * Created by Fred.Wu on 2014/11/22.
 */

var prance_iframe_event = {
  mouse_enter_object: null,
  selected_object: null,
  _selected_object_top: 0,
  _iframe_scroll_top: 0,
  __debug: prance_iframe_init.debug,
  'init': function () {
    // mouse_enter_object
    $('body').append($('<div id="prance_iframe_event_mouse_enter_object"></div>'));
    $('#prance_iframe_event_mouse_enter_object')
        .addClass('not-edit')
        .css('position', 'absolute')
        .css('border-radius', '3px')
        .css('font-size', '9px')
        .css('font-family', 'Tahoma')
        .css('color', '#333')
        .css('background-color', 'rgb(154, 205, 50)')
        .css('padding', '2')
        .css('margin', '0')
        .css('display', 'none');
    this.mouse_enter_object = $('#prance_iframe_event_mouse_enter_object');
    //
    $('body').append($('<div id="prance_iframe_event_selected_object"></div>'));
    $('#prance_iframe_event_selected_object')
        .addClass('not-edit')
        .css('cursor', 'pointer')
        .css('position', 'absolute')
        .css('border-radius', '3px')
        .css('font-weight', 'bold')
        .css('font-size', '10px')
        .css('font-family', 'Tahoma')
        .css('color', 'white')
        .css('background-color', 'rgb(255, 48, 0)')
        .css('padding', '2')
        .css('margin', '0')
        .css('display', 'none');
    this.selected_object = $('#prance_iframe_event_selected_object');
  },
  debug: function (t) {
    prance_unit.bar_info('<b>Debug' + '(' + t + '): </b>'
        + ' mouse_enter_object: ' + this.mouse_enter_object
        + ' selected_object: ' + this.selected_object
        + ' _selected_object_top: ' + this._selected_object_top
        + ' _iframe_scroll_top: ' + this._iframe_scroll_top
    );
  },
  'on_click': function (item) {
    var left = item.offset().left;
    var top = item.offset().top;
    var _left_fix = prance_ui_object.prance_toolbar().$width
        + prance_ui_object.prance_iframe_left_space().$width;
    var _top_fix = prance_ui_object.prance_top().$height;
    // rem selected_object Top
    this._selected_object_top = top;
    //
    //this.selected_object.html(item.context.nodeName);
    //
    this.selected_object
        .animate({
          display: 'block',
          top: top - this._iframe_scroll_top + 30,
          left: left + _left_fix
        }, 260).fadeIn();
    //do it
    //prance_ui_object.prance_attribute().setHTML(item.context.nodeName);
    this.selected_object.html(item.context.nodeName);
  },
  'on_mouse_enter': function (item) {
    var left = item.offset().left;
    var top = item.offset().top;
    var _left_fix = prance_ui_object.prance_toolbar().$width
        + prance_ui_object.prance_iframe_left_space().$width;
    var _top_fix = prance_ui_object.prance_top().$height;

    this.mouse_enter_object
        .css('left', left + _left_fix)
        .css('top', top + _top_fix - this._iframe_scroll_top)
        .css('display', '');
    var position_sign = (left > (prance_ui_object.prance_iframe().$width / 2)) ? '' : '';
    this.mouse_enter_object.html(item.context.nodeName + position_sign);
    // Debug
    this.debug('on_mouse_enter');
  },
  'on_iframe_scroll': function (scroll_value) {
    //var scroll_move_value = scroll_value - this._iframe_scroll_top;
    this._iframe_scroll_top = scroll_value;
    this.mouse_enter_object.css('display', 'none');
    this.selected_object
        .css('top', this._selected_object_top - this._iframe_scroll_top + 15);
    // Auto Hidden
    if (prance_unit.cssFloat(this.selected_object, 'top') < prance_ui_object.prance_top().config.height) {
      this.selected_object.css('display', 'none');
    } else if (prance_unit.cssFloat(this.selected_object, 'top') > ($(window).height() - prance_ui_object.prance_foot().config.height)) {
      this.selected_object.css('display', 'none');
    } else {
      this.selected_object.css('display', '');
    }
    // Debug
    this.debug('on_iframe_scroll');
  }
};
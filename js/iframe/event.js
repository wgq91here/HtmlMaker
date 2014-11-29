/**
 * Created by Fred.Wu on 2014/11/22.
 */

var prance_iframe_event = {
  mouse_enter_object: null,
  selected_object: null,
  selected_object_menu: null,
  _iframe_all_node: null,
  _iframe_select_object: null,
  _selected_object_top: 0,
  _iframe_scroll_top: 0,
  __debug: prance_iframe.__debug,
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
    //
    $('body').append($('<div id="prance_iframe_event_selected_object_menu"></div>'));
    $('#prance_iframe_event_selected_object_menu')
        .addClass('not-edit')
        .css('cursor', 'pointer')
        .css('position', 'absolute')
        .css('border-radius', '3px')
        .css('font-size', '10px')
        .css('font-family', 'Tahoma')
        .css('color', 'white')
        .css('background-color', 'rgb(255, 148, 0)')
        .css('padding', '2')
        .css('margin', '0')
        .css('display', 'none');
    this.selected_object_menu = $('#prance_iframe_event_selected_object_menu');
    this.selected_object_menu
        .append(function () {
          return $('<span style="text-decoration: none;color:white;">Del</span>').click(function () {
            prance_iframe_event.selected_destroy();
          });
        });
    this.selected_object_menu
        .append('<span> </span>');
    this.selected_object_menu
        .append(function () {
          return $('<span style="text-decoration: none;color:white;">Copy</span>').click(function () {
            prance_iframe_event.selected_copy();
          });
        });
    this.selected_object_menu
        .append('<span> </span>');
    this.selected_object_menu
        .append(function () {
          return $('<span style="text-decoration: none;color:white;" id="iframe_selected_obj_insert">Insert</span>').click(function () {
            prance_iframe_event.selected_insert();
          });
        });

    //this.selected_object_menu.html('<a href="#" style="text-decoration: none;color:white;">Del</a> <a href="#" style="text-decoration: none;color:white;">Copy</a>');
  },
  debug: function (t) {
    if (this.__debug)
      prance_unit.bar_info('<b>Debug' + '(' + t + '): </b>'
          + ' mouse_enter_object: ' + this.mouse_enter_object
          + ' selected_object: ' + this.selected_object
          + ' _selected_object_top: ' + this._selected_object_top
          + ' _iframe_scroll_top: ' + this._iframe_scroll_top
      );
  },
  'get_all_object': function () {
    return prance_unit.webix_jquery_object('body-iframe')
        .find('iframe').contents().find('body *');
  },
  'selected_insert': function () {
    webix.message(prance_iframe_event._iframe_select_object.context.nodeName);
  },
  'selected_append': function (obj) {
    return prance_unit.webix_jquery_object('body-iframe')
        .find('iframe').contents()
        .find(this._iframe_select_object)
        .append(obj);
  },
  'selected_replace': function (obj) {
    return prance_unit.webix_jquery_object('body-iframe')
        .find('iframe').contents()
        .find(this._iframe_select_object)
        .replaceWith(obj);
  },
  'selected_before': function (obj) {
    return prance_unit.webix_jquery_object('body-iframe')
        .find('iframe').contents()
        .find(this._iframe_select_object)
        .before(obj);
  },
  'selected_after': function (obj) {
    return prance_unit.webix_jquery_object('body-iframe')
        .find('iframe').contents()
        .find(this._iframe_select_object)
        .after(obj);
  },
  'selected_destroy': function () {
    var selected_nodeName = this._iframe_select_object.context.nodeName;
    if (selected_nodeName.toLowerCase() == 'body') return;
    this.selected_replace('');
    this.on_selected_destroy();
    return null;
  },
  'selected_copy': function () {
    var selected_nodeName = this._iframe_select_object.context.nodeName;
    if (selected_nodeName.toLowerCase() == 'body') return;
    var clone = this._iframe_select_object.clone();
    return this.selected_after(clone);
  },
  'on_selected_destroy': function () {
    this.selected_object.css('display', 'none');
    this.selected_object_menu.css('display', 'none');
    this._iframe_select_object = null;
  },
  'on_selected_hide': function () {
    this.selected_object.css('display', 'none');
    this.selected_object_menu.css('display', 'none');
  },
  'on_selected_show': function () {
    if (this._iframe_select_object != null) {
      this.selected_object.css('display', '');
      this.selected_object_menu.css('display', '');
    }
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
    this._iframe_select_object = item;
    dDebug(item);
    var selected_nodeName = this._iframe_select_object.context.nodeName;
    this.selected_object.html(selected_nodeName);
    //
    this.selected_object
        .css('top', top - this._iframe_scroll_top + 15)
        .css('left', left + _left_fix)
        .css('opacity', '0.1')
        .animate({
          opacity: '1'
        }, 500).fadeIn();
    //
    switch (selected_nodeName.toLowerCase()) {
      //case 'body':
      //this.selected_object_menu.css('display', 'none');
      //break;
      default:
        this.selected_object_menu
            .css('top', top - this._iframe_scroll_top + 15)
            .css('left', left + _left_fix + this.selected_object.width() + 8)
            .css('opacity', '0.1')
            .animate({
              opacity: '1'
            }, 260).fadeIn();
    }

    //
    setTimeout(this.auto_hide(), 1000);
    this.debug(this.selected_object);
    //do it
    //prance_ui_object.prance_attribute().setHTML(item.context.nodeName);
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
    this.auto_hide();
    // Debug
    this.debug('on_iframe_scroll');
  },
  'auto_hide': function () {
    this.selected_object
        .css('top', this._selected_object_top - this._iframe_scroll_top + 15);
    this.selected_object_menu
        .css('top', this._selected_object_top - this._iframe_scroll_top + 15);
    // Auto Hidden
    if (prance_unit.cssFloat(this.selected_object, 'top') < prance_ui_object.prance_top().config.height) {
      this.on_selected_hide();
    } else if (prance_unit.cssFloat(this.selected_object, 'top') > ($(window).height() - prance_ui_object.prance_foot().config.height)) {
      this.on_selected_hide();
    } else {
      this.on_selected_show();
    }
    // Debug
    this.debug('auto_hide');
  }
};
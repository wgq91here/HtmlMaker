/**
 * Created by Fred.Wu on 2014/11/22.
 */

function dDebug(s) {
  console.log(s);
}

var prance_unit = {
  cssInt: function (obj, prop) {
    return parseInt(obj.css(prop), 10) || 0;
  },
  cssFloat: function (obj, prop) {
    return parseFloat(obj.css(prop)) || 0;
  },
  toFloat: function (num) {
    return parseFloat(num) || 0;
  },
  bar_info: function (string) {
    prance_ui_object.prance_foot().setHTML(string);
  },
  webix_jquery_object: function (view_id) {
    return $('div[view_id="' + view_id + '"') || new Object();
  }
};

var prance_webix_tools = {
  menu_x_template: function (obj) {
    if (obj.iconcss) {
      return "<span class='" + obj.iconcss + "' style='padding:6px' title='" + (obj.value || '') + "'></span>";
    }
    if (obj.value) {
      return "<div style='padding:3px;'>" + obj.value + "</div>";
    }
    return 'Missing...';
  },
  menu_y_template: function (obj) {
    if (obj.iconcss) {
      return "<span class='" + obj.iconcss + "' style='padding-top: 8px' title='" + (obj.value || '') + "'></span>";
    }
    if (obj.value) {
      return "<div style='padding:3px;'>" + obj.value + "</div>";
    }
    return 'M?';
  }
};

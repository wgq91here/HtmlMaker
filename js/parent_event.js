/**
 * Created by Fred.Wu on 2014/11/13.
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

var prance_ui_object = {
  prance_top: function () {
    return $$('body-top');
  },
  prance_toolbar: function () {
    return $$('body-toolbar');
  },
  prance_attribute: function () {
    return $$('body-attribute');
  },
  prance_iframe: function () {
    return $$('body-iframe');
  },
  prance_iframe_left_space: function () {
    return $$('body-iframe-left-space');
  },
  prance_iframe_right_space: function () {
    return $$('body-iframe-right-space');
  },
  prance_foot: function () {
    return $$('body-foot');
  },
  prance_command: function () {
    return $$('body-command');
  }
};

var prance_iframe_init = {
  box: null,
  debug: true,
  init: function () {
    prance_iframe_event.init();
    //
    prance_unit.webix_jquery_object('body-iframe-left-space').css('background-color', '#333');
    prance_unit.webix_jquery_object('body-iframe-right-space').css('background-color', '#333');
  }
};

var prance_pc_console;
var prance_console = {
  //console: null,
  socket_ip: '',
  timeout: 2000,
  id: 'pc_console',
  init: function () {
    prance_ui_object.prance_command().setHTML('<div style="width:100%;height:100%;" id="' + this.id + '"></div>');
    $('#' + this.id)
        .css('background-color', 'black')
        .css('position', 'relative')
        .css('margin', '0 auto')
        .css('background-color', 'black');
    //prance_ui_object.prance_command().setHTML('');
    //var body_command = prance_unit.webix_jquery_object('body-command');
    //this.console_view = body_command.find('.webix_template');
    //this.console_view.attr('id', this.id);
    //
    require([
      "jq-console/jqconsole.min"
    ], function () {
      prance_console.start();
    });
  },
  start: function () {
    var header = 'Welcome to PranceCloud!\n' +
        'Type help to help.\n';
    window.prance_pc_console = $('#pc_console').jqconsole(header, '# ');
    // Abort prompt on Ctrl+Z.
    prance_pc_console.RegisterShortcut('Z', function () {
      prance_pc_console.AbortPrompt();
      handler();
    });
    // Move to line start Ctrl+A.
    prance_pc_console.RegisterShortcut('A', function () {
      prance_pc_console.MoveToStart();
      handler();
    });
    // Move to line end Ctrl+E.
    prance_pc_console.RegisterShortcut('E', function () {
      prance_pc_console.MoveToEnd();
      handler();
    });
    prance_pc_console.RegisterMatching('{', '}', 'brace');
    prance_pc_console.RegisterMatching('(', ')', 'paran');
    prance_pc_console.RegisterMatching('[', ']', 'bracket');
    //
    //
    var handler = function (command) {
      if (command) {
        try {
          prance_pc_console.Write('==> ' + window.eval(command) + '\n');
        } catch (e) {
          prance_pc_console.Write('ERROR: ' + e.message + '\n');
        }
      }
      prance_pc_console.Prompt(true, handler, function (command) {
        // Continue line if can't compile the command.
        try {
          Function(command);
        } catch (e) {
          if (/[\[\{\(]$/.test(command)) {
            return 1;
          } else {
            return 0;
          }
        }
        return false;
      });
    };
    // Initiate the first prompt.
    handler();
  }
};

var prance_code_editor = {
  id: 'pc_command',
  init: function () {
    prance_ui_object.prance_command().setHTML('<textarea style="width:100%;height:100%;" id="' + this.id + '"></textarea>');
    //
    require([
      "cm/lib/codemirror", "cm/mode/javascript/javascript"
    ], function (CodeMirror) {
      CodeMirror.fromTextArea(document.getElementById('pc_command'), {
        lineNumbers: true,
        mode: "javascript",
        theme: "rubyblue"
      });
      $('.CodeMirror').css('font-family', 'Tahoma');
    });
  }
};

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
    var _left_fix = prance_ui_object.prance_toolbar().config.width
        + prance_ui_object.prance_iframe_left_space().config.width;
    // rem selected_object Top
    this._selected_object_top = top;
    //
    this.selected_object.html(item.context.nodeName);
    // Debug
    this.debug('on_click');
    //
    this.selected_object
        .css('left', _left_fix + 2)
        .animate({
          display: 'block',
          top: top - this._iframe_scroll_top + 15
        }, 260).fadeIn();
    //do it
    prance_ui_object.prance_attribute().setHTML(item.context.nodeName);
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

$(document).ready(function () {


  webix.ready(function () {
    prance_ui_object.prance_iframe().attachEvent("onBeforeLoad", function () {
      console.log('onBeforeLoad');
      prance_iframe_init.init();
    });
    prance_ui_object.prance_iframe().attachEvent('onAfterLoad', function () {
      console.log('onAfterLoad');
      prance_console.init();
    });
    prance_ui_object.prance_iframe().load("data/fda_feed.html");

    //enabling CustomScroll
    //if (!webix.env.touch && webix.ui.scrollSize)
    //webix.CustomScroll.init();
    //$("div[view_id='frame-body'] > iframe").attr('id', 'frame-html');
    //
    //prance_console.start();
    //prance_code_editor.init();

  });


});
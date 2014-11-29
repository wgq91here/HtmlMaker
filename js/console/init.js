/**
 * Created by Fred.Wu on 2014/11/22.
 */

var prance_pc_console;
prance_pc_console = null;
//
var prance_console = {
  //console: null,
  socket_ip: '',
  window_ui: null,
  timeout: 2000,
  console_id: 'pc_console',
  id: 'body-command',
  __debug: prance_layout.__debug,
  init: function () {
    this.window_ui = webix.ui({
      view: "window",
      id: 'prance_command_win',
      hidden: true,
      head: 'Terminal',
      top: 400,
      left: 600,
      width: 600,
      move: true,
      body: {
        template: '<div style="width:100%;height:100%;position:relative;margin:0 auto;background-color:black" id="' + this.console_id + '"></div>',
        id: 'prance_command_win_body'
      },
      on: {
        onShow: function () {
          if (!window.prance_pc_console) {
            prance_console.start();
          }
        }
      }
    });

    require([
      "jq-console/jqconsole.min"
    ], function () {
      //prance_console.start();
    });
  },
  start: function () {
    var header = 'Welcome to PranceCloud!\n' +
      'Type help to help.\n';
    window.prance_pc_console = $('#' + this.console_id).jqconsole(header, '# ');

    // Abort prompt on Ctrl+Z.
    window.prance_pc_console.RegisterShortcut('Z', function () {
      window.prance_pc_console.AbortPrompt();
      handler();
    });
    // Move to line start Ctrl+A.
    window.prance_pc_console.RegisterShortcut('A', function () {
      window.prance_pc_console.MoveToStart();
      handler();
    });
    // Move to line end Ctrl+E.
    window.prance_pc_console.RegisterShortcut('E', function () {
      window.prance_pc_console.MoveToEnd();
      handler();
    });
    window.prance_pc_console.RegisterMatching('{', '}', 'brace');
    window.prance_pc_console.RegisterMatching('(', ')', 'paran');
    window.prance_pc_console.RegisterMatching('[', ']', 'bracket');
    //
    //
    var handler = function (command) {
      if (command) {
        try {
          window.prance_pc_console.Write('==> ' + window.eval(command) + '\n');
        } catch (e) {
          window.prance_pc_console.Write('ERROR: ' + e.message + '\n');
        }
      }
      window.prance_pc_console.Prompt(true, handler, function (command) {
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
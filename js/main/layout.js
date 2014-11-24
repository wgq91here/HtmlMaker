/**
 * Created by Fred.Wu on 2014/11/22.
 */

var prance_layout = {
  layout_button_menu: {
    view: "menu",
    id: "layout_button_menu",
    data: [
      {id: "user", iconcss: 'webix_icon fa-terminal', value: 'Terminal'},
      {id: "help1", iconcss: "webix_icon fa-fire", value: 'RunFire'}
    ],
    css: 'pc_menu',
    height: '100%',
    width: '100%',
    template: function (item) {
      return prance_webix_tools.menu_x_template(item);
    },
    on: {
      onMenuItemClick: function (id) {
        if ($$('prance_command_win').isVisible()) {
          $$('prance_command_win').hide();
        } else {
          $$('prance_command_win').show();
          window.prance_pc_console.Focus();
        }
      }
    }
  },
  layout_top_menu: {
    view: "menu",
    id: "layout_top_menu",
    data: [
      {id: "user", iconcss: 'webix_icon fa-user', value: 'value'},
      {id: "eye", iconcss: "webix_icon fa-eye"},
      {
        id: "plugin", value: "Plugins",
        submenu: [{value: "Facebook"}, "Google+", "Twitter"]
      },
      {id: "help2", value: "webix_icon fa-briefcase"}
    ],
    css: 'pc_menu',
    layout: "x",
    template: function (item) {
      return prance_webix_tools.menu_x_template(item);
    },
    on: {
      onMenuItemClick: function (id) {
        //prance_layout.add_top_menu({
        //  id: 'id',
        //  value: 'ADD NEW'
        //}, 0);
      }
    }
  },
  layout_left_menu: {
    view: "menu",
    data: [
      {id: "home", iconcss: "webix_icon fa-home", value: 'Home'},
      {id: "help", iconcss: "webix_icon fa-pagelines", value: 'Pages'}
    ],
    layout: "y",
    autoheight: true,
    css: 'pc_menu-y',
    template: function (item) {
      return prance_webix_tools.menu_y_template(item);
    },
    type: {
      height: 30
    },
    subMenuPos: "right"
  },
  add_top_menu: function (data, position) {
    //$$('layout_top_menu').clearAll();
    $$('layout_top_menu').add(data, position);
    $$('layout_top_menu').refresh();
    dDebug($$('layout_top_menu').config);
    //prance_ui_object.prance_top().reconstruct();
    //dDebug($$('layout_top_menu').config);
  },
  init: function () {
    webix.ui({
      cols: [
        {
          id: "body-toolbar",
          type: 'clean',
          width: 35,
          height: 'auto',
          borderless: true,
          rows: [
            this.layout_left_menu, {template: ' '}
          ]
        },
        {
          rows: [
            {
              id: "body-top",
              type: 'clean',
              height: 30,
              cols: [
                {template: " "}, this.layout_top_menu, {template: ' ', width: 5}
              ]
            },
            {
              cols: [
                {template: "", id: "body-iframe-left-space", width: 1},
                {view: "iframe", id: "body-iframe"},
                {template: "", id: "body-iframe-right-space", width: 1}
              ]
            },
            {
              template: "info", id: "body-foot", height: 30,
              borderless: true
            }
          ]
        },
        {
          width: 220,
          borderless: true,
          rows: [
            {
              template: "col 1", id: 'body-attribute',
              borderless: true
            },
            this.layout_button_menu
          ]
        }
      ]
    });
  }
};


/**
 * Created by Fred.Wu on 2014/11/22.
 */

var prance_layout = {
  window_pages_ui: null,
  __layout_top_submenu: {eye: null, plugin: null, template: null, user: null},
  __debug: true,
  debug: function (t) {
    if (this.__debug)
      prance_unit.bar_info('<b>Debug' + '(' + t + '): </b>');
  },
  layout_button_menu: {
    view: "menu",
    id: "layout_button_menu",
    data: [
      {id: "user", iconcss: 'webix_icon fa-terminal', value: 'Terminal'},
      {id: "help1", iconcss: "webix_icon fa-fire", value: 'RunFire'}
    ],
    type: {
      height: 30
    },
    css: 'pc_menu',
    borderless: true,
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
    gravity: 1,
    type: {
      height: 30
    },
    data: [
      {
        id: "user", iconcss: 'webix_icon fa-user', value: 'User',
        submenu: 'top_menu_user'
      },
      {
        id: "eye", iconcss: 'webix_icon fa-eye', value: 'View',
        submenu: 'top_menu_eye'
      },
      {
        id: "plugin", iconcss: 'webix_icon fa-puzzle-piece', value: 'Plugins',
        submenu: 'top_menu_plugin'
      },
      {
        id: "template",
        iconcss: "webix_icon fa-bookmark-o", value: 'Templates',
        submenu: 'top_menu_template'
      },
      {
        id: "save",
        iconcss: "webix_icon fa-save", value: 'Save'
      }
    ],
    css: 'pc_menu',
    layout: "x",
    template: function (item) {
      return prance_webix_tools.menu_x_template(item);
    },
    on: {
      onMenuItemClick: function (id) {
        prance_layout.debug('CLICK: ' + id);
        /*prance_layout.add_top_menu({
         id: 'id',
         value: 'ADD NEW'
         }, 0);*/
        prance_ui_object.prance_toolbar().resize();
        return true;
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
    subMenuPos: "right",
    on: {
      onMenuItemClick: function (id) {
        prance_layout.debug('layout_left_menu CLICK: ' + id);
        if ($$('prance_leafs_win').isVisible()) {
          $$('prance_leafs_win').hide();
        } else {
          $$('prance_leafs_win').define("height", prance_ui_object.prance_iframe().$height - 30);
          $$('prance_leafs_win').resize();
          $$('prance_leafs_win').show();
        }
      }
    }
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
                {template: ' '}, this.layout_top_menu
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
        {view: "resizer"},
        {
          width: $(window).width() - 50 - 1024,
          minWidth: $(window).width() - 50 - 1024,
          maxWidth: $(window).width() / 3,
          rows: [
            {
              type: 'clean',
              view: "tabview",
              tabbar: {
                popupWidth: 300,
                tabMinWidth: 40
              },
              cells: [
                {
                  header: "Attribute",
                  body: {
                    id: "attribute-node",
                    template: "attribute-node"
                  }
                },
                {
                  header: "NodeTree",
                  body: {
                    view: 'list',
                    id: "attribute-nodetree",
                    select: true,
                    template: "<div style='padding: 4px;'><strong>#nodName#</strong></div>",
                    type: {
                      height: 30
                    },
                    data: [],
                    on: {
                      onItemClick: function (id) {
                        //dDebug($$('attribute-nodetree').getItem(id));
                        dDebug(id);
                        //dDebug(prance_iframe_event._iframe_all_node[id]);
                        //dDebug($(prance_iframe_event._iframe_all_node[id]).context.nodeName);

                        /*var o = prance_unit.webix_jquery_object('body-iframe')
                         .find('iframe').contents()
                         .find(prance_iframe_event._iframe_all_node[id]);*/
                        var item = $$('attribute-nodetree').getItem(id);
                        prance_iframe_event.on_click($(prance_iframe_event._iframe_all_node[item.order_id]));
                      }
                    }
                  }
                }
              ],
              on: {},
              id: 'body-attribute'
            },
            {
              type: 'clean',
              id: 'nothing',
              height: 30,
              cols: [this.layout_button_menu]
            }
          ]
        }
      ]
    });
    //
    this.window_pages_ui = webix.ui({
      view: "window",
      id: 'prance_leafs_win',
      hidden: true,
      head: false,
      top: 35,
      left: 38,
      height: prance_ui_object.prance_iframe().$height - 30,
      width: 300,
      body: {
        id: 'prance_pages_win_body',
        view: "tabview",
        tabbar: {
          popupWidth: 90,
          tabMinWidth: 60
        },
        cells: [
          {
            header: "Pages",
            body: prance_leafs_win_object.pages
          },
          {
            header: "Collections",
            body: prance_leafs_win_object.data_collections
          },
          {
            header: "Components",
            body: {
              id: "plw_tab_data_components",
              template: "Components"
            }
          }
        ]
      },
      on: {
        onShow: function () {
          prance_layout.debug('CLICK pages!');
        },
        onHide: function () {
          prance_leafs_win_object.on_hide();
        }
      }
    });
    $(window).resize(function () {
      $$('prance_leafs_win').define("height", prance_ui_object.prance_iframe().$height - 30);
      $$('prance_leafs_win').resize();
    });
    //
    this.__layout_top_submenu.eye = webix.ui({
      view: "submenu", id: "top_menu_eye",
      data: [
        {id: 'eye-pc', value: "Pc"},
        {id: 'eye-pad', value: "Pad"},
        {id: 'eye-phone', value: "Phone"}
      ],
      template: function (item) {
        return prance_webix_tools.menu_x_template(item);
      }
    });
    //
    this.__layout_top_submenu.plugin = webix.ui({
      view: "submenu", id: "top_menu_plugin",
      data: [
        {id: 'plugin-add', value: "Add Plugin..."},
        {$template: "Separator"}
      ],
      template: function (item) {
        return prance_webix_tools.menu_x_template(item);
      }
    });
    //
    this.__layout_top_submenu.template = webix.ui({
      view: "submenu", id: "top_menu_template",
      data: [
        {id: 'template-add', value: "Add Template..."},
        {$template: "Separator"}
      ],
      template: function (item) {
        return prance_webix_tools.menu_x_template(item);
      }
    });
    //
    this.__layout_top_submenu.user = webix.ui({
      view: "submenu", id: "top_menu_user",
      data: [
        {id: 'user-project', value: "Project"},
        {$template: "Separator"},
        {id: 'user-profile', value: "Profile"}
      ],
      template: function (item) {
        return prance_webix_tools.menu_x_template(item);
      }
    });
  }
};


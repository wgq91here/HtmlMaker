/**
 * Created by Fred.Wu on 2014/11/27.
 */


var leafs_pages = [{
  "id": 'blog',
  "title": "Foundation Blog",
  "url": "fda_blog.html",
  "version": "0.1"
}, {
  "id": 'feed',
  "title": "Foundation Feed",
  "url": "fda_feed.html",
  "version": "0.1"
}, {
  "id": 'gird',
  "title": "Foundation Grid",
  "url": "fda_grid.html",
  "version": "0.1"
}, {
  "id": 'Orbit Home',
  "title": "Foundation Orbit Home",
  "url": "fda_orbit_home.html",
  "version": "0.1"
}, {
  "id": 'Banded',
  "title": "Foundation Banded",
  "url": "fda_banded.html",
  "version": "0.1"
}, {
  "id": 'Banner Home',
  "title": "Foundation Banner Home",
  "url": "fda_banner_home.html",
  "version": "0.1"
}, {
  "id": 'Sidebar',
  "title": "Foundation Sidebar",
  "url": "fda_sidebar.html",
  "version": "0.1"
}, {
  "id": 'Contact',
  "title": "Foundation Contact",
  "url": "fda_contact.html",
  "version": "0.1"
}, {
  "id": 'Marketing',
  "title": "Foundation Marketing",
  "url": "fda_marketing.html",
  "version": "0.1"
}, {
  "id": 'Realty',
  "title": "Foundation Realty",
  "url": "fda_realty.html",
  "version": "0.1"
}, {
  "id": 'So Boxy',
  "title": "Foundation So Boxy",
  "url": "fda_so_boxy.html",
  "version": "0.1"
}];


var leafs_data_collections = [
  {
    'id': 'root', 'title': 'System', isFolder: true,
    data: [
      {
        "id": 'User',
        "title": "User Data Collection User Data Collection User Data Collection User Data Collection",
        "sys_id": "prance_user",
        "version": "0.1"
      }, {
        "id": 'Private',
        "title": "Private Data",
        "sys_id": "prance_private",
        "version": "0.1"
      },
      {
        "id": 'Group',
        "title": "Group Data",
        "sys_id": "prance_group",
        "version": "0.1"
      }
    ]
  }, {
    'id': 'app',
    'title': 'Application',
    data: [{}]
  }, {
    "id": 'Article',
    "title": "Article Data",
    "sys_id": "prance_article",
    "version": "0.1"
  }, {
    "id": 'Commit',
    "title": "Commit Data",
    "sys_id": "prance_commit",
    "version": "0.1"
  }, {
    "id": 'Category',
    "title": "Category Data",
    "sys_id": "prance_category",
    "version": "0.1"
  }];


var prance_leafs_win_object = {
  'on_hide': function () {
    if (data_collection_attribute)
      data_collection_attribute.on_hide();
  },
  'pages': {
    id: 'plw_tab_pages',
    rows: [
      {
        view: "toolbar",
        cols: [
          {
            view: 'menu',
            width: 60,
            type: {
              width: 30
            },
            data: [
              {iconcss: "webix_icon fa-plus-circle", id: 'addItem'},
              {iconcss: "webix_icon fa-folder-o", id: 'addFolder'}
            ],
            template: function (item) {
              return prance_webix_tools.menu_x_template(item);
            },
            on: {
              onItemClick: function (id, state) {
                prance_layout.debug('menu: id -> ' + id + ', state -> ' + state);
                var item = $$('leafs_pages_list').getSelectedItem();
                prance_layout.debug('menu: selected item -> ' + item);
                switch (id) {
                }
                return;
              }
            }
          },
          {},
          {
            view: 'menu',
            width: 90,
            type: {
              width: 30
            },
            disabled: true,
            id: 'leafs_pages_list_menu',
            data: [
              {iconcss: "webix_icon fa-trash-o", id: 'trash'},
              {iconcss: "webix_icon fa-pencil-square-o", id: 'edit'},
              {iconcss: "webix_icon fa-share-square-o", id: 'load'}
            ],
            template: function (item) {
              return prance_webix_tools.menu_x_template(item);
            },
            on: {
              onItemClick: function (id, state) {
                prance_layout.debug('leafs_pages_list_menu: id -> ' + id + ', state -> ' + state);
                var item = $$('leafs_pages_list').getSelectedItem();
                switch (id) {
                  case 'load':
                    pages_attribute.load_page(item);
                }
                return;
              }
            }
          }
        ]
      },
      {
        view: "treetable",
        id: 'leafs_pages_list',
        //template: "<div style='padding: 4px;'><strong>#id# :</strong> #title#</div>",
        //type: {
        //  height: 35
        //},
        header: false,
        rowHeight: 30,
        columns: [
          {
            id: "value", width: 300,
            template: "{common.icon()} #title#"
          }
        ],
        select: true,
        data: leafs_pages,
        on: {
          onSelectChange: function () {
            $$('leafs_pages_list_menu').enable();
          },
          onItemDblClick: function (id) {
            var item = $$('leafs_pages_list').getItem(id);
            dDebug(item);
            // folder
            if ($$('leafs_pages_list').isBranch(id)) {
              if ($$('leafs_pages_list').isBranchOpen(id)) {
                $$('leafs_pages_list').close(id);
              } else {
                $$('leafs_pages_list').open(id);
              }
              return;
            }
            pages_attribute.load_page(item);
          }
        }
      }
    ]
  },
  'data_collections': {
    id: 'plw_tab_data_collections',
    rows: [
      {
        view: "toolbar",
        cols: [
          {
            view: 'menu',
            width: 60,
            type: {
              width: 30
            },
            data: [
              {iconcss: "webix_icon fa-plus-circle", id: 'addItem'},
              {iconcss: "webix_icon fa-folder-o", id: 'addFolder'}
            ],
            template: function (item) {
              return prance_webix_tools.menu_x_template(item);
            },
            on: {
              onItemClick: function (id, state) {
                prance_layout.debug('menu: id -> ' + id + ', state -> ' + state);
                var item = $$('leafs_data_collections_list').getSelectedItem();
                prance_layout.debug('menu: selected item -> ' + item);
                switch (id) {
                }
                return;
              }
            }
          },
          {},
          {
            view: 'menu',
            width: 90,
            type: {
              width: 30
            },
            disabled: true,
            id: 'leafs_data_collections_list_menu',
            data: [
              {iconcss: "webix_icon fa-trash-o", id: 'trash'},
              {iconcss: "webix_icon fa-pencil-square-o", id: 'edit'},
              {iconcss: "webix_icon fa-share-square-o", id: 'load'}
            ],
            template: function (item) {
              return prance_webix_tools.menu_x_template(item);
            },
            on: {
              onItemClick: function (id, state) {
                prance_layout.debug('leafs_data_collections_list_menu: id -> ' + id + ', state -> ' + state);
                var item = $$('leafs_data_collections_list').getSelectedItem();
                // folder
                if ($$('leafs_data_collections_list').isBranch(item.id)) {
                  return;
                }
                switch (id) {
                  case 'load':
                    data_collection_attribute.on_show(item);
                }
                return;
              }
            }
          }
        ]
      },
      {
        view: "treetable",
        id: 'leafs_data_collections_list',
        header: false,
        rowHeight: 30,
        columns: [
          {
            id: "value", header: "Film title", width: 300,
            template: "{common.icon()} #title# <span style='color:yellow'>#id#</span>" //{common.treetable()}
          }
        ],
        select: true,
        data: leafs_data_collections,
        on: {
          onSelectChange: function () {
            $$('leafs_data_collections_list_menu').enable();
          },
          onItemDblClick: function (id) {
            var item = $$('leafs_data_collections_list').getItem(id);
            dDebug(item);
            // folder
            if ($$('leafs_data_collections_list').isBranch(id)) {
              if ($$('leafs_data_collections_list').isBranchOpen(id)) {
                $$('leafs_data_collections_list').close(id);
              } else {
                $$('leafs_data_collections_list').open(id);
              }
              return;
            }
            data_collection_attribute.on_show(item);
          }
        },
        ready: function () {
          PRANCE_JS.load_component([
                PRANCE_JS.get_javascript_path('main/layout/pages_attribute'),
                PRANCE_JS.get_javascript_path('main/layout/data_collection_attribute')],
              function () {
                data_collection_attribute.init();
              }
          );
        }
      }
    ]
  }
};
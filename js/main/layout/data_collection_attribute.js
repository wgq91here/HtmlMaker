/**
 * Created by Admin on 2014/12/1.
 */

var data_collection_attribute = {
      data_collection_attribute_ui: null,
      selector_item: null,
      get_field_body: function () {
        dDebug(data_collection_attribute.selector_item);
        var item = (this.selector_item) ? this.selector_item : {title: ''};
        var currentdate = new Date();
        prance_layout.debug(currentdate.getSeconds());
        return {
          rows: [
            {
              id: 'data_collection_attribute_field',
              view: "form",
              width: 'auto',
              elements: [
                {view: "text", label: item.title},
                {view: "text", type: "password", label: currentdate.getSeconds()},
                {
                  margin: 5, cols: [
                  {view: "button", label: "Login", type: "form"},
                  {view: "button", label: "Cancel"}
                ]
                }
              ]
              //template: '-> ' + currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds()
            },
            {temlate: ''}
          ]
        };
      },
      init: function () {
        this.data_collection_attribute_ui = webix.ui({
              view: "window",
              id: 'data_collection_attribute_win',
              hidden: true,
              head: false,
              top: 35,
              left: 38 + 310,
              height: prance_ui_object.prance_iframe().$height - 30,
              width: 600,
              body: {
                view: "tabview",
                id: 'data_collection_attribute_win_body',
                tabbar: {
                  popupWidth: 90,
                  tabMinWidth: 60
                },
                cells: [
                  {
                    header: PRANCE_JS.g('Fields'),
                    body: this.get_field_body()
                  },
                  {
                    header: "Relation",
                    body: {
                      template: 'prance_leafs_win_object.data_collections'
                    }
                  }
                  ,
                  {
                    header: "Event",
                    body: {
                      template: 'Event'
                    }
                  }
                ]
              },
              on: {
                onShow: function () {
                  webix.message('data_collection_attribute');
                }
              }
            }
        )
        ;
        $(window).resize(function () {
          $$('data_collection_attribute_win').define("height", prance_ui_object.prance_iframe().$height - 30);
          $$('data_collection_attribute_win').resize();
        });
      },
      on_hide: function () {
        this.data_collection_attribute_ui.hide();
      },
      on_show: function (item) {
        this.selector_item = item;
        $$('data_collection_attribute_win').close();
        data_collection_attribute.init();
        $$('data_collection_attribute_win').show();
      }
    }
    ;
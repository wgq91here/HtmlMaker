/**
 * Created by Admin on 2014/11/26.
 */


prance_ui_object.prance_iframe().attachEvent("onBeforeLoad", function () {
  console.log('onBeforeLoad');

  webix.ui({
    view: "window",
    id: 'loading_window',
    height: 30,
    width: 300,
    head: false,
    modal: true,
    position: "center",
    body: {
      template: "<div style='text-align: center;'>Loading...</div>"
    }
  }).show();

});
prance_ui_object.prance_iframe().attachEvent('onAfterLoad', function () {
  console.log('onAfterLoad');
  $$('loading_window').close();
  $$('prance_leafs_win').hide();

  //PRANCE_JS.patch_javascript_iframe();
  PRANCE_JS.load_component([
    PRANCE_JS.get_javascript_path('app/iframe_attribute')]);
});
prance_ui_object.prance_iframe().load("data/empty.html");
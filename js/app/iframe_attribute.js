/**
 * Created by Fred.Wu on 2014/11/26.
 */


//prance_layout.__debug = false;

prance_iframe_event.selected_object.click(function () {
  $$('attribute-node').setHTML('NodeName: ' + prance_iframe_event._iframe_select_object.context.nodeName);
  dDebug(prance_iframe_event._iframe_select_object);
});


prance_ui_object.prance_iframe().attachEvent('onAfterLoad', function () {
  //$$('attribute-nodetree').setHTML('date');
  prance_iframe_event.selected_object.hide();
  prance_iframe_event.selected_object_menu.hide();
  prance_iframe_event.on_iframe_body_change();
});
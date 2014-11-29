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
  prance_iframe_event._iframe_all_node = prance_iframe_event.get_all_object();
  dDebug(prance_iframe_event._iframe_all_node);
  $$('attribute-nodetree').clearAll();
  var node_tree_values = jQuery.map(prance_iframe_event._iframe_all_node, function (n, i) {
    if (n.nodeName == 'SCRIPT') return ;
    return {id: i, nodName: n.nodeName};
  });
  $$('attribute-nodetree').parse(JSON.stringify(node_tree_values));
  $$('attribute-nodetree').refresh();
  dDebug(node_tree_values);
});
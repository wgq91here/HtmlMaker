/**
 * Created by Fred.Wu on 2014/12/3.
 */



var pages_attribute = {
  load_page: function(item) {
    // leaf
    prance_ui_object.prance_iframe().load("data/" + item.url);
  }
};
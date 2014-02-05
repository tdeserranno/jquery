//^^^^HOME.JS^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
//====GLOBALS===================================================================
var customIcons = {
  header: 'ui-icon-circle-arrow-e',
  activeHeader: 'ui-icon-circle-arrow-s'
};
//====DOCUMENT.READY============================================================
$(function() {
  $('#keuzes').accordion({
    //accordion options
    active: false,
    icons: false,
    heightStyle: 'content',
    collapsible: true,
    animate: 'easeInQuad'
  });
});//END DOC.READY
//====FUNCTIONS=================================================================
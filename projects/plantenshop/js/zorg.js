//^^^^ZORG.JS^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
//====GLOBALS===================================================================
//====DOCUMENT.READY============================================================
$(function() {
  //tabs
  var $tabs = $('#verzorging');
  $tabs.tabs({
    active: 1,
    disabled: [3]
  });
  
  //waterplanten checkbox
  $('#toonWaterplanten').on('change',(function() {
    var wpI = $('.ui-tabs-nav a').index($('a[href=#waterplanten]'));
    if(this.checked) {
      $tabs.tabs('enable', wpI).tabs('option', 'active', wpI);
    } else {
      $tabs.tabs('option', 'active', 0).tabs('disable', wpI);
    }
  }));
  
  //toon ziektes
  $('#toonZiektes').on('click', function(event) {
//  $('#toonZiektes').one('click', function(event) {
    event.preventDefault();
    var aantalTabs = $('.ui-tabs-nav a').length;
    var tekst = 'ziektes';
    var eInh = '<div id="' + tekst + '">';
    var eLink = '<li><a href="#' + tekst + '">' + ucfirst(tekst) + '</a></li>';
    var $nieuweTabInhoud = $(eInh).load('inc/ziektes.html');
    $tabs.append($nieuweTabInhoud);
    $tabs.find('ul').append(eLink);
    $tabs.tabs('refresh');
    $tabs.tabs('option', 'active', aantalTabs);
    $(this).remove();
  });
});//END DOC.READY
//====FUNCTIONS=================================================================
function ucfirst (str) {
  // From: http://phpjs.org/functions
  // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   bugfixed by: Onno Marsman
  // +   improved by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: ucfirst('kevin van zonneveld');
  // *     returns 1: 'Kevin van zonneveld'
  str += '';
  var f = str.charAt(0).toUpperCase();
  return f + str.substr(1);
}
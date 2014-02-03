//^^^^SHOP.JS^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
//====DOCUMENT.READY============================================================
$(function() {
  var $advZoeken = $('#adv_zoeken');
  var $advZoekenLink = $('#adv_zoeken_link');
  
  $advZoeken.hide();
  $advZoekenLink.on('click', function(event) {
    event.preventDefault();
    toggleZoeken($(this), $advZoeken);
  });
});//END DOC.READY
//====FUNCTIONS=================================================================
/**
 * 
 * @param {type} $link
 * @param {type} $elem
 * @returns {undefined}
 */
function toggleZoeken($link, $elem) {
  //cursus p.40
}

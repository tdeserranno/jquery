//^^^^SHOP.JS^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
//====DOCUMENT.READY============================================================
$(function() {
  var $advZoeken = $('#adv_zoeken');
  var $advZoekenLink = $('#adv_zoeken_link');
  
  //ZOEKEN SECTION
  //$advZoeken.hide();
  //lees localStorage
  var zoek = localStorage.getItem('advZoeken');
  //als zoek niet 0 of 1 is dan is setting 0, anders is setting = zoek
  //dus setting zal altijd ofwel 0 ofwel 1 zijn
  var setting = (zoek != 0 && zoek != 1) ? 0 : zoek;
  //onmiddelijk toepassen
  toggleZoeken(setting, $advZoekenLink, $advZoeken);
  
  $advZoekenLink.on('click', function(event) {
    event.preventDefault();
    //toggle setting flag
    setting = 1 - setting; //bitwise XOR, setting blijft altijd 0 of 1
    //run toggle function
    toggleZoeken(setting, $(this), $advZoeken);
    //store new setting flag in localstorage
    localStorage.setItem('advZoeken', setting);
  });
  
  //HOOGTE SLIDER
  $('#slider-range-hoogte').slider({
    //slider options
    range: true, //activeert tweede sliderknop
    values: [100, 500], //startwaarden
    min: 0,
    max: 5000,
    step: 10,
    slide: function(event, ui) {
      $('#hoogte_min').val($(this).slider('values',0)); //this = slider div element
      $('#hoogte_max').val($(this).slider('values',1));
    },
    stop: function(event, ui) {
      $('#hoogte_min').val($(this).slider('values',0)); //this = slider div element
      $('#hoogte_max').val($(this).slider('values',1));
    }
  });
  //title voor sliderknoppen
  $('.ui-slider-handle', '#slider-range-hoogte')
          .first()
            .attr({'title':'Minimum hoogte'})
            .end()
          .last().attr({'title':'Maximum hoogte'});
  
  //initialisatie startwaarden
  $('#hoogte_min').val($('#slider-range-hoogte').slider('values', 0));
  $('#hoogte_max').val($('#slider-range-hoogte').slider('values', 1));
});//END DOC.READY
//====FUNCTIONS=================================================================
/**
 * 
 * @param {1|0} toon setting flag die aangeeft als er getoond of verborgen moet worden
 * @param {type} $link link die toggle functie activeert
 * @param {type} $elem element dat getoond/verborgen moet worden
 * @returns {undefined}
 */
function toggleZoeken(toon, $link, $elem) {
  //  EERSTE VERSIE
//  $elem.toggle('slow', function() {
//    var tekst = ($elem.css('display') === 'none') ? 'geavanceerd zoeken' : 'eenvoudig zoeken';
//    $link.text(tekst);
//  });
    var txt_een = 'eenvoudig zoeken';
    var txt_adv = 'geavanceerd zoeken';
    if (toon == 1) {
      $elem.show('slow');
      $link.text(txt_een);
    } else if (toon == 0) {
      $elem.hide('slow');
      $link.text(txt_adv);
    } else {
      throw new Error('argument "toon" verkeerd')
    }
}

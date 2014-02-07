//^^^^JQUERY.THOMAS.UTILS.JS^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
/*
 * JQuery extensions door Thomas
 */
(function($) {
  $.zegDankUTegen = function(wie) {
    alert('Dank U ' + wie + ' !');
  };
  $.vandaag = function() {
    var vandaag = new Date();
    return vandaag.toLocaleDateString();
  };
  $.fn.wordtGroen = function() {
    return this.css('color', 'green');
  };
  /**Vult een SELECT element met gegevens uit een array, optioneel eerste OPTION
   * 
   * @param {array} arrData , 1dim array van tekst, 2dim array van optionvalue|tekst
   * @param {string} strFirstOption optioneel, tekst voor default option
   * @returns {undefined}
   */
  $.fn.vulSelect = function(arrData, strFirstOption) {
    return this.each(function() {
      if (this.tagName === 'SELECT') {
        var eSelect = $(this);
        eSelect.leegSelect();
        if (strFirstOption !== null) {
          eSelect.append('<option value="" selected="selected">' + strFirstOption + '</option>');
        }
        //DETERMINE 1 OR 2 DIM ARRAY
        if (!$.isArray(arrData[0])) {
          /* jQuery API documentation
           * 
           * .each( function(index, Element) )
           * Description: Iterate over a jQuery object, executing a function for each matched element.
           * 
           * De jQuery method .each() returnt de index en bijhorende element/waarde
           * Hier dus voor each element van de array arrData. Voor 1dim array is data
           * dus gewoon tekst maar voor 2dim array is data een 1dim array van
           * [optionvalue, optiontekst].
           */
          $.each(arrData, function(index/*, data*/) {
            eSelect.append('<option value="' + arrData[index] + '">' + arrData[index] + '</option>');
//            eSelect.append('<option value="' + data + '">' + data + '</option>');
          });
        } else {
          $.each(arrData, function(index/*, data*/) {
            eSelect.append('<option value="' + arrData[index][0] + '">' + arrData[index][1] + '</option>');
//            eSelect.append('<option value="' + data[0] + '">' + data[1] + '</option>');
          });
        }
      }
    });
  };
  /**Leeg SELECT element alvorens het te vullen met fn.vulSelect
   * 
   * @returns {undefined}
   */
  $.fn.leegSelect = function() {
    return this.each(function() {
      if (this.tagName === 'SELECT') {
        $(this).empty();
      }
    });
  };
})(jQuery);

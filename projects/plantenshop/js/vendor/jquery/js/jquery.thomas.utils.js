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
})(jQuery);

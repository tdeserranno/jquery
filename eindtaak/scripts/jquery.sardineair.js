//^^^^JQUERY.SARDINEAIR.JS^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
//====DOCUMENT.READY============================================================
$(function() {
  //LOADCHECK
//  console.log((jQuery) ? 'jQuery loaded' : 'jQuery not available');
//  console.log((jQuery().validate) ? 'jQ Validate loaded' : 'jQ Validate not available');
  
  //CREATE CONTENT TAB LAYOUT
  $('#inhoud').tabs();
  //POPULATE SELECT ELEMENTS
  //COUNTRY SELECT
  $.getJSON(
          'php/ajax_json_countries.php',
          function(jsondata) {
            var eOptions = [];
            $.each(jsondata, function(index, data) {
              eOptions.push('<option value="' + data.country_code + '">' + data.country_name + '</option>');
            });
            $('#countries').html(eOptions.join(''));
          });
  //AIRPORT SELECT
  $('#countries').on('change', function() {
    var countryCode = $(this).val();
    $.getJSON(
            'php/ajax_json_airports',
            {country_code: countryCode},
            function(jsondata) {
              var eOptions = [];
              $.each(jsondata, function(index, data) {
                eOptions.push('')
              })
            });
  });
  
});//END DOC.READY
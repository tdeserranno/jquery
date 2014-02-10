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
            $('#countries')
                    .html(eOptions.join(''))
                    .focus();
          });
  //AIRPORT SELECT
//  console.log($('#countries').val());
  $('#countries').on('change focus', function() {
//    console.log($('#countries').val());
    var countryCode = $(this).val();
    $.getJSON(
            'php/ajax_json_airports.php',
            {country_code: countryCode},
            function(jsondata) {
              var eOptions = [];
              $.each(jsondata, function(index, data) {
                eOptions.push('<option value"' + data.airport_code + '">' + data.airport_name + '</option>');
              });
              $('#airports').html(eOptions.join(''));
            });
  });
  
  //DATEPICKERS
    $.datepicker.setDefaults($.datepicker.regional['nl-BE']);
    $('input.datum').datepicker({
      dateFormat: 'yy-mm-dd',
      minDate: new Date(),
      maxDate: '+1y',
      changeMonth: true,
      changeYear: true
    });
    
  //TOGGLE RETOUR
  //determine starting state of checkbox and hide if unchecked
  if ($('#retour')[0].checked === false) {
    $('p:has(#terugdatum)').hide();
  }
  //toggle visibility based on checkbox state
  $('#retour').on('change', function() {
//    console.log(this.checked);
    $('p:has(#terugdatum)').toggle(this.checked);
  });
  
  //ADD SLIDESHOW IMGs
  generateSlideshow();
  
  //VALIDATORS
  if (jQuery().validate) {
    console.log('validator available');
    //add custom method
    $.validator.addMethod(
            'alphanumeric',
            function(value, element) {
              return /^[a-z0-9]+$/i.test(value);
            },
            'Alphanumeric characters only');
    
    $('#frmVlucht').validate({
      rules: {
        vertrekdatum:{
          required: true,
          dateISO: true
        },
        terugdatum:{
          required: '#retour:checked',
          dateISO: true
        },
        tickettype: {
          required: true
        }
      },
      messages: {
        vertrekdatum: {
          required: 'verplicht',
          dateISO: 'ongeldig datumformaat'
        },
        terugdatum: {
          required: 'verplicht',
          dateISO: 'ongeldig datumformaat'
        },
        tickettype: {
          required: 'verplicht'
        }
      },
      submitHandler: function(form) {
        form.submit();
      }
    });//END VLUCHT VALIDATION
    $('#frmCheckin').validate({
      rules: {
        boekingreferentie: {
          required: true,
          minlength: 6,
          maxlength: 6,
          alphanumeric: true
        },
        kredietkaartnummer: {
          required: true,
          creditcard: true
        },
        familienaam: {
          required: true
        }
      },
      messages: {
        boekingreferentie: {
          required: 'verplicht',
          rangeLength: 'exact 6 karakters',
          alphanumeric: 'enkel letters en cijfers'
        },
        kredietkaartnummer: {
          required: 'verplicht',
          creditcard: 'ongeldig kaartnummer'
        },
        familienaam: {
          required: 'verplicht'
        }
      },
      submitHandler: function(form) {
        form.submit();
      }
    });//END CHECKIN VALIDATION
  }//END VALIDATORS
});//END DOC.READY
//====FUNCTIONS=================================================================
/**
 * source: http://jqfaq.com/how-to-load-all-files-from-directory-using-jquery/
 * @returns {undefined}
 */
function generateSlideshow() {
  var directory = 'images';
  var fileExtension = '.jpg';
  //retrieve contents of folder if browsable
  $.ajax({
    url: directory,
    success: function(data) {
      //list all jpg files with sardinesX in the name where X is a number
      var regEx = /(sardines)[0-9]+/;
      $(data)
              .find('a:contains(' + fileExtension + ')')
              .filter(function() {
//                console.log(this.href);
//                console.log('regex match: ' + this.href.match(regEx));
                return this.href.match(regEx);
              })
              .each(function() {
                var fileName = this.href
                .replace(window.location.host, '')
                .replace('jquery/eindtaak', '')
                .replace('http:///','');
                var slide = '<img src="' + directory + fileName + '">';
              $('#prent').cycle('add', slide);
      });
    }
  });
}
//====WINDOW.LOAD===============================================================
//$(window).load(function() {
//  $('#prent').cycle();
//});
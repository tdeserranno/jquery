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
                    /*to initialize correct loading of airport select*/
                    .focus();
          });
  //AIRPORT SELECT
//  console.log($('#countries').val());
/*on focus eventhandler insures that the correct airports are loaded when the page loads
 * on change is not enough as populating the countries element isn't seen as a 'change'
 *  event, and so the airports select would be empty when the page loads*/
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
      minDate: new Date(),/*current date*/
      maxDate: '+1y',/*1 year from mindate*/
      changeMonth: true,
      changeYear: true
    });
    //set minDates for terugdatum when vertrekdatum datepicker is closed
    $('#vertrekdatum').datepicker('option', 'onClose', function() {
//        console.log($(this).val());
        var selectedDate = new Date($(this).val());
        selectedDate.setDate(selectedDate.getDate() + 1);
//        console.log(selectedDate);
        $('#terugdatum').datepicker('option', 'minDate', selectedDate);
      });
    
  //TOGGLE RETOUR
  //determine starting state of checkbox and hide if unchecked
  if ($('#retour')[0].checked === false) {
    $('p:has(#terugdatum)').hide();
  }
  //toggle visibility based on checkbox state
  $('#retour').on('change', function() {
    $('p:has(#terugdatum)').toggle(this.checked);
    console.log(this.checked);
    //empty terugdatum if toggled off
    if (this.checked === false) {
      $('#terugdatum').val('');
    }
  });
  
  //ADD SLIDESHOW IMGs
  var filenameRegex = /(sardines)[0-9]+/;
  generateSlideshow('images', '.jpg', '#prent', filenameRegex);
  
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
        },
        volwassenen: {
          min: 1
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
        },
        volwassenen: {
          min: 'minimum 1 persoon'
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
          minlength: 'exact 6 karakters',
          maxlength: 'exact 6 karakters',
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
/**Retrieves all files in given directory with given file extension and for each
 * file adds a slide to the slideshow container identified by the selector string
 * source: http://jqfaq.com/how-to-load-all-files-from-directory-using-jquery/
 * @param {string} directory folder containing the images files to be added to the slideshow
 * @param {string} fileExtension file extension of the files to be added
 * @param {string} slideshowContainer selector string for thehtml element representing the container for the slideshow
 * @param {regex} regEx regex to match filenames
 * @returns {undefined}
 */
function generateSlideshow(directory, fileExtension, slideshowContainer, regEx) {
  //retrieve contents of folder if browsable
  $.ajax({
    url: directory,
    success: function(data) {
      /*list all files with given extension and filter the collection based on 
       * matching the given regEx
       * after filtering add slide to slideshow for each file in the collection*/
      $(data)
              .find('a:contains(' + fileExtension + ')')
              .filter(function() {
//                console.log(this.href);
//                console.log('regex match: ' + this.href.match(regEx));
                return this.href.match(regEx);
              })
              .each(function() {
                //sanitize filename, needs rewriting to be completely generic
                var fileName = this.href
                .replace(window.location.host, '')
                .replace('jquery/eindtaak', '')
                .replace('http:///','');
                //add slide to slideshow
                var slide = '<img src="' + directory + fileName + '">';
                $('#prent').cycle('add', slide);
      });
    }
  });
}

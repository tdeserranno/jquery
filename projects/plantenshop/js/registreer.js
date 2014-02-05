//^^^^REGISTREER.JS^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
//====GLOBALS===================================================================
//====DOCUMENT.READY============================================================
$(function() {
  //DATEPICKER
  $.datepicker.setDefaults($.datepicker.regional['nl-BE']);
  $('#geboren').datepicker({
    dateFormat: 'yy-mm-dd',
    yearRange: '-80:+00',
    changeMonth: true,
    changeYear: true
  });
  
  //CUSTOM VALIDATOR METHOD wwCheck
  $.validator.addMethod('wwCheck', function(value, elem) {
    return value.match(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$/);
  });
  
  //PROMO EMAIL ENABLE/DISABLE
  $('#promos').on('click', function() {
    if ($(this).is(':checked')) {
      $('#email')
              .removeAttr('disabled')
//              .attr('placeholder', 'email adres')
              [0].focus();//focus is JS method so needs to be executed on a DOM element, not a JQ wrapped set
    } else {
      $('#email')
              .attr('disabled', true)
              .val('');
//              .attr('placeholder', 'disabled');
    }
  });
  
  //ERROR CONTAINER VARIABLE
  var $foutBoksen = $('div.foutBox');
  
  //DIALOG WINDOWS
  $('.dialoogvenster').dialog({
    autoOpen: false,
    buttons: {
      'Ok': function() {
        $(this).dialog('close');
      }
    },
    modal: true,
    width: 600
  });
  
  //DIALOG BUTTON
  $('#dialog_link_username')
          .button({
            icons: {
              secondary: 'ui-icon-help'
            }
          })
          .click(function(event) {
            event.preventDefault();
            $('#dialog_username').dialog('open');
          });
  
  //VALIDATOR
  if (jQuery().validate) {
    console.log('JQ validation geladen');
    //    prevent default submit behavior to allow debugging
//    $('#regform').submit(function(event) {
//      event.preventDefault();
//    });
    $('#regForm').validate({
//      debug: true,
      rules: {
        vnaam: 'required',
        fnaam: 'required',
        postnr: {
          required: true,
          digits: true,
          minlength: 4,
          maxlength: 4
        },
        geboren: {
          required: true,
          dateISO:true
        },
        sexe: 'required',
        'ruimte[]': 'required',
        'soort_id[]': {
          required: true,
          rangelength: [1,4]
        },
        username: {
          required: true,
          minlength: 8
        },
        ww1: {
          wwCheck: true
        },
        ww2: {
          equalTo: '#ww1'
        },
        email: {
          required: '#promos:checked',
          email: true
        }
      },//END RULES
      messages: {
        vnaam: 'voornaam is verplicht',
        postnr: {
          required: 'postcode is verplicht',
          digits: 'postcode bestaat enkel uit getallen',
          minlength: 'postcode bestaat uit exact 4 getallen',
          maxlength: 'postcode bestaat uit exact 4 getallen'
        },
        geboren: {
          required: 'Geef uw geboortedatum in',
          dateISO: 'de datum moet het formaat YYYY-MM-DD hebben'
        },
        sexe: 'Kies uw geslacht',
        'ruimte[]': 'kies minstens &eacute;&eacute;n optie',
        'soort_id[]': 'kies minstens &eacute;&eacute;n soort maar niet meer dan 4',
        username: {
          required: 'gebruikersnaam is verplicht',
          minlength: 'gebruikersnaam moet minimum 8 karakters lang zijn'
        },
        ww1: 'het wachtwoord moet min 8 karakters lang zijn en moet minstens\n\
 1 kleine letter, 1 hoofdletter, 1 getal en 1 speciaal karakter(@#$%^&+=) bevatten',
        ww2: 'wachtwoorden niet identiek',
        email: {
          required: "email adres is verplicht",
          email: 'geen geldig email adres'
        }
      },//END MESSAGES
      //      ERROR PLACEMENT, NOW USING errorContainer foutBox
//      errorPlacement: function(error, elem) {
//        var $ctrlbx = elem.parents('div.controlbox');
//        if ($ctrlbx.length !== 0) {
//          error.insertAfter($ctrlbx);
//        } else {
//          error.insertAfter(elem);
//        }
//      },//END ERRORPLACEMENT
      //ERROR CONTAINER
      errorContainer: $foutBoksen,
      errorLabelContainer: $('ul', $foutBoksen),
      wrapper: 'li',
      //END ERROR CONTAINER
      submitHandler: function(form) {
        form.submit();
      }
    });//END VALIDATOR
  } else {
    console.log('JQ validation NIET geladen');
  }
});//END DOC.READY
//====FUNCTIONS=================================================================
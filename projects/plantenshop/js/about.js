// JavaScript Document
// JS bestand voor About pagina
//alert ('dom tree nog niet geladen: onmiddelijke uitvoering');
//$(document).ready(function() {
//$() = $(document).ready()
//====DOCUMENT.READY============================================================
$(function() {
//  alert(
//  $('a')
//          .addClass('rood')
//          .filter('a[target]')
//            .addClass('groen')
//            .end()
//          .addClass('onderlijnd').length
//          );
//----OPMAAK TABELLEN-----------------------------------------------------------
$('tbody tr:odd').addClass('oneven');
$('tbody tr:even').addClass('even');

//----EVENTHANDLER EXTERNE LINKS------------------------------------------------
//$('a[href^="http"').click(
//voordelen .on() zie cursus p.24
$('a[href^="http"').on('click',
        function() {
          alert('U staat op het punt deze pagina te verlaten');
        }
        );//end a[http].click
//----AANMAKEN NAAR BOVEN BUTTONS VOOR IEDERE H TAG-----------------------------
$('<a href="#about" title="terug naar boven">terug naar boven</a>')
        .insertBefore(':header:gt(1)')
        .button({icons:{secondary: 'ui-icon-circle-triangle-n'}});

//----DYNAMISCH OPVULLEN VAN TEAM SECTION---------------------------------------
//$('<ul>').insertAfter('#team h3');
//$('#team h3')
//        .after('<ul>')
//        .append('<li>eerste</li>')
//        .append('<li>tweede</li>');
//LI elementen worden op verkeerde plaats ingevoegd, zie cursus p.26-28

//UL
//var $uul = $('<ul>');
//$.each(lijst, function(n, value) {
//  $('<li>').text(value).appendTo($uul);
//});
//$('#team h3').after($uul);

//----SELECT w/ JSON data-------------------------------------------------------
var $container = $('<div id="teamboks">');
var $detailDiv = $('<div id="teamgegevens">');
var $keuzelijst = $('<select id="teamkeuzelijst">');
var strDeOptions = '<option value="">--- het team ---</option>';
$.each(lijst, function(n, value) {
  strDeOptions += '<option>' + value + '</option>';
});
$keuzelijst.html(strDeOptions);
$container.append($keuzelijst).prepend($detailDiv);
$('#team h3').after($container);

//----EVENTHANDLER SELECT CHANGE - AJAX CALL JSON DATA TEAM---------------------
$('#teamkeuzelijst')
        .on('change', function() {
          var waarde = $(this).val();
//          console.log(waarde + ' gekozen');
//          $.getJSON(url, data, success);//syntax, zie p.97
          $.getJSON(
                  'services/ajax_json_team.php',
                  {teamlid: waarde},
                  function(jsondata) {
                    var strHTML = '';
                    if (jsondata.naam) {
                      strHTML += '<img src="images/' + jsondata.foto + '" />';
                      strHTML += '<h3>' + jsondata.naam + '</h3>';
                      strHTML += '<p>leeftijd: ' + jsondata.leeftijd + '</p>';
                      strHTML += '<p>functie: ' + jsondata.functie + '</p>';
                    }
                    $('#teamgegevens').html(strHTML);
                  }
          );//END GETJSON TEAM
});

//----AANMAKEN VAN TABLE OF CONTENTS--------------------------------------------
var root = $('article')[0];
var $list = $('<ol>');
$('#toc').empty().append(walkTree(root, $list, enterNode, exitNode));
});//end doc.ready

//====FUNCTIONS=================================================================
var walkTree = function (root, $list, enter, exit) 
{
  var node = root;
  start: while (node) {
	 
	$list = enter(node,$list);
	if (node.firstChild) {
	  node = node.firstChild;
	  continue start;
	}
	while (node) {
	  $list = exit(node,$list);
	  if (node.nextSibling) {
		node = node.nextSibling;
		continue start;
	  }
	  if (node == root)
		node = null;
	  else
		node = node.parentNode;
	}
  }
  return $list;
};
/**Controleert als gespecifieerde node in aanmerking komt voor table of contents
 * Enkel als node een element is, in de arrSections lijst zit en geen no-toc flag heeft.
 * @param {type} node
 * @returns {boolean}
 */
function checkNode(node) {
  var strNotoc = 'no-toc';
  
  return (node.nodeType ===1 && arrSections.indexOf(node.tagName.toLowerCase()) >= 0 && node.className.indexOf(strNotoc) === -1);
}
/**Bouwt $list op bij het binnengaan van een node
 * 
 * @param {type} node
 * @param {type} $list
 * @returns {undefined}
 */
function enterNode(node, $list) {
  if (checkNode(node)) {
    var $nieuw = $('<li>').attr('tabindex', getal.toString());
    var $a = $('<a>').attr({
      'href': '#' + getal.toString(),
      'id': 'o' + getal.toString()
    });
    node.setAttribute('id', getal.toString());
    getal++;
    
    $a.text(zoekKoppen(node));
    $nieuw.append($a);
    
    if ($list[0].tagName === 'LI') {
      var $nieuweLijst = $('<ol>').append($nieuw);
      $list.append($nieuweLijst);
      $list = $nieuw;
    } else {
      $list.append($nieuw);
      $list = $nieuw;
    }
  }
  return $list;
}
/**Bij verlaten van de node
 * 
 * @param {type} node
 * @param {type} $list
 * @returns {undefined}
 */
function exitNode(node, $list) {
  if (checkNode(node)) {
    if ($list[0].tagName === 'OL') {
      $list = $list.parent();
    }
    $list = $list.parent();
  }
  return $list;
}
function zoekKoppen(node) {
  var $node = $(node);
  var kopTekst = '';
  //zoek hoogste kop, return zijn tekst
  $.each(arrKoppen, function(i, v) {
    var $kop = $(v, $node);
    if ($kop.length > 0) {
      kopTekst = $kop.first().text();
      return false;
    }
  });
  return kopTekst;
}
//====GLOBALS===================================================================
var lijst = ['roger', 'evelyn', 'hilde', 'jan'];
var arrKoppen = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
var arrSections = ['article', 'section', 'aside', 'nav'];
var getal = 1;
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta http-equiv="CACHE-CONTROL" content="NO-CACHE" />
<meta name="Description" content="dit is de oefening voor de vdab opleidingsmodule jQuery. 'Sardine Airways' is een fictieve maatschappij. Indien u een  sardine bent, wend u tot een ander bedrijf" />
<title>Sardine Airways: jQuery eindtaak</title>
<link rel='stylesheet' type="text/css"  href="css/eindtaak.css"/>
<!--jQuery-->
<link rel="stylesheet" type="text/css" href="jquery/css/blitzer/jquery-ui-1.10.4.custom.min.css"/>
<script type="text/javascript" src="jquery/js/jquery-1.10.2.js"></script>
<script type="text/javascript" src="jquery/js/jquery-ui-1.10.4.custom.min.js"></script>
<!--jQuery Validation-->
<script type="text/javascript" src="jquery/jquery-validation-1.11.1/dist/jquery.validate.min.js"></script>
<!--jQuery Datepicker localization-->
<script type="text/javascript" src="jquery/jquery-validation-1.11.1/localization/jquery.ui.datepicker-nl-BE.js"></script>

<!--custom-->
<script type="text/javascript" src="scripts/jquery.sardineair.js"></script>
<!--jQuery plugin Cylce2-->
<script type="text/javascript" src="jquery/js/jquery-cycle2.js"></script>
</head>
<body>
<div id="container">
  <div id="kop">
    <img id= "koptitel" src="images/sardineskop.png" alt="sardines airways"  /> </div>
  <div id="buik">
    <div id="links">&nbsp;</div>
    <div id="tester" style="display:none">tester element</div>
    <div id="midden">
        <div id="prent" class="cycle-slideshow"></div><!--class added for Cycle2 plugin-->
      <div id="inhoud">
          <!--Navigation UL-->
          <ul>
              <li><a href="#vlucht">Vlucht boeken</a></li>
              <li><a href="#checkin">Online check-in</a></li>
              <li><a href="#hotel">Zoek een hotel</a></li>
              <li><a href="#wagen">Wagen boeken</a></li>
          </ul>
          <!--Navigation UL END-->
        <div id="vlucht">
          <h1>Vlucht boeken</h1>
          <form name="frmVlucht" id ="frmVlucht" action="reflect_data.php" method="get">
            <p>
              <label>Land van vertrek:</label>
              <select name="countries" id="countries">
              </select>
            </p>
            <p>
              <label>Luchthaven</label>
              <select name="airports" id="airports" >
              </select>
            </p>
            <p>
              <label>naar (luchthavencode)</label>
              <input type="text" name="destinationairport" id="destinationairport" />
            </p>
            <p>
              
               <label>heen (datum)</label>
              <input  class="datum" type="text" name="vertrekdatum" id="vertrekdatum" /><label class="inline" > retour<input type="checkbox" name="retour" id="retour" /></label>
             
            </p>
            <p>
              <label>terug (datum)</label>
              <input class="datum" type="text" name="terugdatum" id="terugdatum" />
            </p>
            <p>
              <label>ticket type</label>
              goedkoopst
              <input type="radio" name="tickettype" id="ticketgoedkoop" value="goedkoop" />
              flexibel
              <input type="radio" name="tickettype" id="ticketflexibel" value="flexibel" />
            </p>
            <p>
              <label>aantal</label>
              volwassenen
              <select name="volwassenen" id="volwassenen" >
                <option>0</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
                <option>7</option>
                <option>8</option>
                <option>9</option>
              </select>
              kinderen
              <select name="kinderen" id="kinderen" >
                <option>0</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
                <option>7</option>
                <option>8</option>
                <option>9</option>
              </select>
              babies
              <select name="babies" id="babies" >
                <option>0</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
                <option>7</option>
                <option>8</option>
                <option>9</option>
              </select>
            </p>
            <p>
              <input type="submit" value="ga verder" />
            </p>
          </form>
        </div>
        <div id="checkin">
          <h1>Online check-in</h1>
          <p>Welkom op Sardine Airways online check-in systeem.</p>
          <p>U kunt vanaf 15 dagen tot ten laatste 4 uur v&oacute;&oacute;r uw vlucht inchecken. Eenmaal ingecheckt kunt u ten allen tijde uw boarding paas (opnieuw) uitprinten tot 40 minuten  v&oacute;&oacute;r vertrektijd.</p>
          <p>Om online in te checken:</p>
          <ul>
            <li>vul eerst uw reservatienummer in</li>
            <li>vul het kredietkaartnummer in waarmee de boeking gebeurde</li>
          </ul>
          <form name="frmCheckin" id ="frmCheckin" action="reflect_data.php" method="get">
            <p>
              <label>boekingreferentie</label>
              <input type="text" name="boekingreferentie" id="boekingreferentie" />
            </p>
            <p>
              <label>kredietkaartnummer</label>
              <input type="text" name="kredietkaartnummer" id="kredietkaartnummer" />
            </p>
            <p>
              <label>familienaam</label>
              <input type="text" name="familienaam" id="familienaam" />
            </p>
            <p>
              <input type="submit" value="checkin" />
            </p>
          </form>
        </div>
        <div id="hotel">
          <h1>Zoek een hotel</h1>
          <form name="frmHotel" id ="frmHotel" action="reflect_data.php" method="get">
            <p>
              <label>waar wil u logeren?</label>
              <input type="text" name="city" id="city" />
            </p>
            <p>
              <label>checkin datum</label>
              <input  class="datum" type="text" name="checkindatum" id="checkindatum" />
            </p>
            <p>
              <label>checkout datum</label>
              <input  class="datum" type="text" name="checkoutdatum" id="checkoutdatum" />
            </p>
            <p>
              <input type="submit" value="zoek hotels" />
            </p>
          </form>
        </div>
        <div id="wagen">
          <h1>Wagen boeken</h1>
          <form name="frmCar" id ="frmCar" action="reflect_data.php" method="get">
            <p>
              <label>pick up locatie</label>
              <input type="text" name="pickuplocatie" id="pickuplocatie" />
            </p>
            <p>
              <label>pick up datum</label>
              <input  class="datum" type="text" name="pickupdatum" id="pickupdatum" />
            </p>
            <p>
              <label>drop off locatie</label>
              <input type="text" name="dropofflocatie" id="dropofflocatie" />
            </p>
            <p>
              <label>drop off datum</label>
              <input  class="datum" type="text" name="dropoffdatum" id="dropoffdatum" />
            </p>
            <p>
              <input type="submit" value="boek wagen" />
            </p>
          </form>
        </div>
      </div>
      <!--einde inhoud-->
    </div>
    <!--einde midden-->
    <div id="rechts">&nbsp;</div>
  </div>
  <!--einde buik-->
  <div id="voet"> &copy; Sardine Airways | About | Contact </div>
</div>
</body>
</html>
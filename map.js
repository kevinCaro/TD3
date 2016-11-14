$(document).ready(function(){
	// Ecrivez ici tout le code qui doit s'éxecuter lorsque
	// la page est complètement chargée
	initMap(45.633331,-72.550003);
    
    	var objects = {};
	var availableTags = [];

	$.getJSON( "villes.json", function( data ) {
		$.each(data, function (key, value) {
			objects[key]=value; //push values here
			availableTags.push(key);
		});
		
		$( "#tags" ).autocomplete({
			source: availableTags
		});
		console.log(ville)
	});
    
	// $ est un raccourci pour jQuery
	// A l'aide de $, vous pouvez chercher n'importe quel
	// element de la page. Si celui-ci contient un identifiant
	// unique #identifiant vous permet de le retrouver d'un 
	// seul coup
	
	// La methode .click attache une fonction de rappel à tous 
	// les objets selectionnés avec $("#monBouton"), donc dans 
	// ce cas, le seul bouton sur la page, mais notez que vous
	// pouvez appliquer une fonction de rappel sur plusieurs 
	// éléments en même temps.
	$("#btnfrancais").click(function(){
		$('h1').html("Retrouve une ville du Quebec!");
		$("p").html("Entrez une ville pour la retrouver sur la carte Google Maps!");
		alert(object[$("#txtarea").val()].lon);	
		//initMap($("#txtarea").val()),object);
		// Ceci cache tous les paragraphes sur la page
		$("p").hide();
	});

	$("#btnanglais").click(function(){
		 $('h1').html("Find a city in Quebec!");
		 $("p").html("Enter a city to find it on Google maps");
		// Ceci cache tous les paragraphes sur la page
	});
});

function loadJSON(file, callback) {   

   	 var xobj = new XMLHttpRequest();
   	 xobj.overrideMimeType("application/json");
    	 xobj.open('GET', file, true);
    	 xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            callback(xobj.responseText);
          }
   	 };
    	xobj.send(null); 
}
 

var map;
function initMap(ville, obj) {
       alert(obj[ville].lon);
       initMap(obj[ville].lat,obj[ville].lon);
}

function initMap(lat,lng) {
       map = new google.maps.Map(document.getElementById('map'), {
       center: {lat: lat, lng: lng},
       zoom: 10
       });
}




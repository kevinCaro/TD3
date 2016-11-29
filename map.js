$(document).ready(function(){

	initMap(45.5,-73.550003); //Initisalise la carte a la position de Montreal (Par defaut)
    
    var objects = {}; // le tableau contenant les longeurs et les longitudes de chaque ville du Quebec
	var availableTags = [];	// le tableau contenant les noms des villes pour l'autocomplete

	$.getJSON( "villes.json", function( data , objects ) {	//lie le fichier JSON fournit 
		var o = {};	
		var a= [];	
		$.each(data, function (key, value) {
			o[key]=value; 
			a.push(key); 
		});
		envoieData(o,a);
	});

	function envoieData(o,a) { // un espece de contournement de la methode asynchrone $.getJSON()
		objects = o;
		availableTags = a;
		$( "#txtarea" ).autocomplete( { //creer l'autocomplete dans le champ de recherche
			minLength: 3, //longueur minimul de la valeur entrer afin d'activer l'autocomplete
      		source: availableTags, //la liste des villes du Quebec
      		select : function( event, ui ) { //fonction qui sera enclencher quand l'utilisateur aura selectionner un element
        		changerVille(ui.item.value);
     	    }
    	});
      }
    
	$("#btnfrancais").click(function(){ //changer le texte en francais
		$('h1').html("La Carte du Québec");
		$("p").html("Entrez une ville pour la retrouver sur la carte Google Maps!");
		$("#btnfrancais").html("Francais");
		$("#btnanglais").html("Anglais");
	});

	$("#btnanglais").click(function(){ //changer le texte en anglais
		 $('h1').html("Map of Quebec");
		 $("p").html("Enter a city to find it on Google maps");
		 $("#btnfrancais").html("French");
		$("#btnanglais").html("English");
	});

	function changerVille(ville){ //permet de changer de ville.	
		initMap(objects[ville].lat,objects[ville].lon);
	}
});

var map, marker;
function initMap(lat,lng){
   	 	map = new google.maps.Map(document.getElementById('map'), { //permet de creer la map et de placer le focus au point desirer
       		center: {lat: lat, lng: lng},
       		zoom: 10,
       		});
   	 	var marker = new google.maps.Marker({ // placer un marqueur sur la carte
  		position: {lat: lat, lng: lng},
  		map: map
		});
}




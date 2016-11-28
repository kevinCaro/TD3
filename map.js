$(document).ready(function(){

	initMap(45.5,-73.550003); //Initisalise la carte a la position de Montreal (Par defaut)
    
    var objects = {};
	var availableTags = [];	

	$.getJSON( "villes.json", function( data , objects ) {	//lie le document JSON fournit 
		var o = {};	
		var a= [];	
		$.each(data, function (key, value) {
			o[key]=value; // le tableau contenant les longeurs et les longitudes de chaque ville du Quebec
			a.push(key); // le tableau contenant les noms des villes pour l'autocomplete
		});
		envoieData(o,a);
	});

	function envoieData(o,a) { // un espece de contournement de la methode asynchrone $.getJSON()
		objects = o;
		availableTags = a;
	}
    
	$("#btnfrancais").click(function(){ //changer le texte en francais
		$('h1').html("Retrouve une ville du Quebec!");
		$("p").html("Entrez une ville pour la retrouver sur la carte Google Maps!");
	});

	$("#btnanglais").click(function(){ //changer le texte en anglais
		 $('h1').html("Find a city in Quebec!");
		 $("p").html("Enter a city to find it on Google maps");
	});

	$( "#txtarea" ).on('change',function() { //change de ville lorsqu'on a fini d'entrer une ville
  		changerVille();
	});

	 $(document).on('click', '#autoComplete tr', function(){ //lorsqu'on choisit une case du autocomplete.
        document.getElementById("txtarea").value = $(this).text();
        $("#autoComplete tr").remove(); 
        changerVille();
    });

	$('#txtarea').on('input', function() { //actualise la liste des possibilites pour faire l'autocompletion
    	var valActuelle = $(this).val();
    	var table = document.getElementById("autoComplete");
    	$("#autoComplete tr").remove(); 
    	var nbColonne = 0;
    	for(i = 0; i < availableTags.length ; i++){ //parcours inverse pour pouvoir trier l'autocomplete en ordre alphabethique sachant qu'on a creer le tableau dans le sens inverse.
    		if(availableTags[i].startsWith(valActuelle)){
    			if(nbColonne < 20){ //limie de 20
    				table.insertRow().innerHTML = availableTags[i];
    				nbColonne++;
    			}else{
    				break;
    			}
    		}
    	}
	});
	
	function changerVille(){ //permet de changer de ville.
		var ville = $("#txtarea").val();	
		initMap(objects[ville].lat,objects[ville].lon);
		$("p").hide();
	}
});

var map, marker;
function initMap(lat,lng){
   	 	map = new google.maps.Map(document.getElementById('map'), { //permet de creer la map et de la placer au point desirer
       		center: {lat: lat, lng: lng},
       		zoom: 10,
       		});
   	 	var marker = new google.maps.Marker({ // placer un marqueur sur la carte
  		position: {lat: lat, lng: lng},
  		map: map
		});
}




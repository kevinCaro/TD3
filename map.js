$(document).ready(function(){
	// Ecrivez ici tout le code qui doit s'éxecuter lorsque
	// la page est complètement chargée
	initMap(45.633331,-72.550003);
    
    	var objects = {};
	var availableTags = [];	

	$.getJSON( "villes.json", function( data , objects ) {			
		var o = {};	
		var a= [];	
		$.each(data, function (key, value) {
			o[key]=value; 
			a.push(key);
		});
		envoieData(o,a);
	});

	function envoieData(o,a) {
		objects = o;
		availableTags = a;
	}
    
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
	});

	$("#btnanglais").click(function(){
		 $('h1').html("Find a city in Quebec!");
		 $("p").html("Enter a city to find it on Google maps");
	});

	$( "#txtarea" ).on('change',function() {
  		changerVille();
	});

	 $(document).on('click', '#autoComplete tr', function(){
        document.getElementById("txtarea").value = $(this).text();
        $("#autoComplete tr").remove(); 
        changerVille();
    });

	$('#txtarea').on('input', function() { 
    	var valActuelle = $(this).val();
    	var table = document.getElementById("autoComplete");
    	$("#autoComplete tr").remove(); 
    	for(i =0; i < availableTags.length; i++){
    		if(availableTags[i].startsWith(valActuelle)){
    			table.insertRow(0).innerHTML = availableTags[i];
    		}
    	}
	});
	
	function changerVille(){
		var ville = $("#txtarea").val();
		try{		
			initMap(objects[ville].lat,objects[ville].lon);
			$("p").hide();
		}catch(err){
			alert("Cette ville n'existe pas");
		}
	}

	function selection(){
		alert("click");
	}
});

var map, marker;
function initMap(lat,lng){
	try {
   	 	map = new google.maps.Map(document.getElementById('map'), {
       		center: {lat: lat, lng: lng},
       		zoom: 10,
       		});
   	 	var marker = new google.maps.Marker({
  		position: {lat: lat, lng: lng},
  		map: map
		});
	}
	catch(err) {
    		throw "Cette ville n'existe pas";
	}
       
}




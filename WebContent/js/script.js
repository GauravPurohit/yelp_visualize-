
var markers = [];
var myMap;
var infoWindow = new google.maps.InfoWindow({maxHeight:350, autoScroll:false, disableAutoPan: false});
$(document).ready(function() {
	google.maps.event.addDomListener(window, 'load', initialize);
	$("#mytrigger").click(function(){
		$("#mypanel").toggle("fast");
		$(this).toggleClass("active");
		return false;
	});
	
	$("#pcuisineSelect").hide();
	$("#typeSelect").change(function(){
		uncheckboxes();
		var value = $('#typeSelect').find(":selected").text();
		$('#cuisineSelect').empty();
		if(value == "Patisserie"){     
			$('#cuisineSelect').append( new Option("","") );
			$('#cuisineSelect').append( new Option("Dessert","DESSERT") );
			$('#cuisineSelect').append( new Option("Beverages","BEVERAGES") );
			$('#cuisineSelect').append( new Option("Bakeries","BAKERIES") );
		} else{
			$('#cuisineSelect').append( new Option("","") );
			$('#cuisineSelect').append( new Option("American","AMERICAN") );
			$('#cuisineSelect').append( new Option("Chinese","CHINESE") );
			$('#cuisineSelect').append( new Option("Indian","INDIAN") );
			$('#cuisineSelect').append( new Option("AsianFusion","ASIANFUSION") );
			$('#cuisineSelect').append( new Option("Barbeque","BARBEQUE") );
			$('#cuisineSelect').append( new Option("Brazilian","BRAZILIAN") );
			$('#cuisineSelect').append( new Option("Japanese","JAPANESE") );
			$('#cuisineSelect').append( new Option("Korean","KOREAN") );
			$('#cuisineSelect').append( new Option("Italian","ITALIAN") );
			$('#cuisineSelect').append( new Option("Latin American","LATINAMERICAN") );
			$('#cuisineSelect').append( new Option("Mediterranian","MEDITERRANIAN") );
			$('#cuisineSelect').append( new Option("Mexican","MEXICAN") );
			$('#cuisineSelect').append( new Option("MiddleEastern","MIDDLEEASTERN") );
			$('#cuisineSelect').append( new Option("Pizza","PIZZA") );
			$('#cuisineSelect').append( new Option("Seafood","SEAFOOD") );
			$('#cuisineSelect').append( new Option("Thai","THAI") );
			$('#cuisineSelect').append( new Option("Turkish","TURKISH") );
			$('#cuisineSelect').append( new Option("Vietnamese","Vietnamese") );
		}
		$("#pcuisineSelect").show();
	});
	$("#cuisineSelect").change(function(){
		uncheckboxes();
		clearMarkers();
		var category = $('#typeSelect').find(":selected").text();
		var subcategory = $('#cuisineSelect').find(":selected").text();
		if(category == "" || subcategory == "" || category==null || subcategory ==null){
			alert("Please select a category and subcategory.");
		}else{
			$.ajax({
				type: "GET",
				url: "getRestOfType/"+ category + "/" + subcategory,
				dataType: 'json',
				error: function (request,status,errorThrown){alert("Error:" + errorThrown);},
				success: function(data) {processData(data);}
			});
		}
	});
	
	$("#submitFilter").click(function(){
		/*clearMarkers();*/
		alert("filtering results");
		/*var category = $('#typeSelect').find(":selected").text();
		var subcategory = $('#cuisineSelect').find(":selected").text();
		
		var ambience =  $('input[name="ambience"]').is(':checked');
		var food = $('input[name="food"]').is(':checked');
		var price = $('input[name="price"]').is(':checked');
		var service = $('input[name="service"]').is(':checked');
		if(ambience == true) {
			ambience = 1;
		} else{
			ambience = 0;
		}
		if(food == true) {
			food = 1;
		} else{
			food = 0;
		}
		if(price == true) {
			price = 1;
		} else{
			price = 0;
		}
		if(service == true) {
			service = 1;
		} else{
			service = 0;
		}*/
		$.ajax({
			/*type: "GET",
			url: "getFilterRestOfType/" + category +"," + subcategory +"," + ambience +"," + food + "," + price + "," + service,
			dataType: 'json',
			error: function (request,status,errorThrown){alert("Error:" + errorThrown);},*/
			success: function(data) {processData(data);}
		});
	});
});

function uncheckboxes(){
	$('input[name="ambience"]').attr('checked', false); 
	$('input[name="food"]').attr('checked', false); 
	$('input[name="price"]').attr('checked', false); 
	$('input[name="service"]').attr('checked', false); 
	
}

function clearMarkers(){
	for (var j=0; j<markers.length; j++) {
		markers[j].setMap(null);
	}
	markers=[];
}

function initialize(){
	var myOptions = {
			zoom: 8,
			panControl: false,
			zoomControl: true,
			mapTypeControl: true,
			scaleControl: true,
			streetViewControl: false,
			overviewMapControl: false,
			mapTypeId: google.maps.MapTypeId.ROADMAP
	};

	var e=document.getElementById("mapPresentationCanvas");
	myMap = new google.maps.Map(e, myOptions);


	myMap.setCenter( new google.maps.LatLng(41.881832,-87.623177));  //Default is CA : 34.089061,-116.889896. play it safe and set automatically
	
	generateAndPlaceMarkers();
}

function createMarker(anAlert) {
	var alertLocation = new google.maps.LatLng(anAlert.latitude,anAlert.longitude);//37.09024,-95.712891);//new google.maps.LatLng(anAlert.latitude,anAlert.longitude),	alertMessage = "my msg",icon = "img/icon_circle_red.png";
	
	var myicon;
	/*if(anAlert.stars<=2.5){
		myicon= "img/icon_circle_red.png";
	} else if(anAlert.stars>=3 && anAlert.stars <4){
		myicon= "img/icon_circle_yellow.png";
	}else{*/
		myicon= "img/icon_circle_green.png";
	/*}*/
	var marker = new google.maps.Marker({
		position: alertLocation,
		map: myMap,
		icon:myicon,
		title: anAlert.category +"," + anAlert.subcategory});
	//marker.alertID = anAlert.id;	
	return marker;
}

function generateAndPlaceMarkers()	{
	
	var anAlert=new Object();  
	anAlert.latitude=41.881832;
	anAlert.longitude=-87.623177;
//	$.ajax({
//        type: "GET",
//        url: "resources/CA_Data.csv",
//        dataType: "text",
//        success: function(data) {processData(data);}
//     });
	$.ajax({
		type: "GET",
		url: "getRest",
		dataType: 'json',
		error: function (request,status,errorThrown){alert("error:" + errorThrown);},
		success: function(data) {processData(data);}
	});
}

/*function processData(allText) {
    var allTextLines = allText.split(/\r\n|\n/);
    var headers = allTextLines[0].split(',');
    var lines = [];

    for (var i=1; i<allTextLines.length; i++) {
        var data = allTextLines[i].split(',');
        if (data.length == headers.length) {
        	var anAlert=new Object();
            var tarr = [];
            //business_id,name,schools,open,category,subcategory,is_vegetarian,
            //review_count,stars,neighborhoods,url,photo_url,city,state,latitude,longitude
            for (var j=0; j<headers.length; j++) {
                tarr.push(headers[j]+":"+data[j]);
               
                if(j==1){
                	anAlert.name = data[j];
                }else if(j==2){
                	anAlert.school = data[j];
                }else if(j==3){
                	anAlert.open = data[j];
                }else if(j==4){
                	anAlert.category = data[j];
                }else if(j==5){
                	anAlert.subcategory = data[j];
                }else if(j==6){
                	anAlert.is_veg = data[j];
                }else if(j==8){
                	anAlert.stars = data[j];
                }else if(j==10){
                	anAlert.url = data[j];
                }else if(j==14){
                	anAlert.latitude = data[j];
                }else if(j==15){
                	anAlert.longitude = data[j];
                }else if(j==16){
                	anAlert.popular = data[j];
                }
            }
            lines.push(tarr);
           
        	
        	//anAlert.popular = 1;
            marker = createMarker(anAlert);
    		//markers[anAlert.id] = marker;
    		google.maps.event.addListener(marker,'click', markerClickHandler.bind(anAlert,marker));
    		marker.setMap(myMap);
        }
    }
    // alert(lines);
}*/

function processData(allText) {
    var lines = [];

    for (var i = 0; i < allText.restaurant.length; i++) {
        	var arest= allText.restaurant[i];
            marker = createMarker(arest);
            markers.push(marker);
    		google.maps.event.addListener(marker,'click', markerClickHandler.bind(arest,marker));
    		marker.setMap(myMap);
    }
}
    // alert(lines);


function markerClickHandler(marker,event)  {
	//infoWindow.close(myMap);
	//regionWindow.close(myMap);
	var selectedMarker = this;
	table="<table border='1'><th> Ambience </th><th> Food </th><th> Value </th><th> Service </th>"+
	"<tr> " ;
	
	if(selectedMarker.isAmbienceGood == 1){
		table += "<td> <img src='img/greenstar1.jpg'>  </td>";
	}else{
		table += "<td> <img src='img/redstar1.jpg'>  </td>";
	}
	
	if(selectedMarker.isFoodGood == 1){
		table += "<td align='center' valign='middle'> <img src='img/greenstar1.jpg'>  </td>";
	}else{
		table += "<td align='center' valign='middle'> <img src='img/redstar1.jpg'>  </td>";
	}
	
	if(selectedMarker.isPriceGood == 1){
		table += "<td align='center' valign='middle'> <img src='img/greenstar1.jpg'>  </td>";
	}else{
		table += "<td align='center' valign='middle'> <img src='img/redstar1.jpg'>  </td>";
	}
	
	if(selectedMarker.isServiceGood == 1){
		table += "<td align='center' valign='middle'> <img src='img/greenstar1.jpg'>  </td>";
	}else{
		table += "<td align='center' valign='middle'> <img src='img/redstar1.jpg'>  </td>";
	}
	table += "</tr></table>";
	infoWindow.setContent("<div style='width: 310px; height:200px; font-size: 11px;'><b>Name: </b>" + selectedMarker.name  +
			//" <br/><b>Country: </b>" + selectedAlert.country.countryName +
			" <br/><b>Coordinates: </b> (" + selectedMarker.latitude + ", " + selectedMarker.longitude + ")" +
			" <br/><b>School: </b>" + selectedMarker.schools +
			" <br/><b>Open: </b>" + selectedMarker.open +
			" <br/><b>URL: </b>" + selectedMarker.url + 
			" <br/><b>Category: </b>" + selectedMarker.category +
			"<br/><b>Subcategory: </b>" + selectedMarker.subcategory +
			"<br/><b>Is Vegetarian: </b>" + selectedMarker.is_vegetarian +
			"<br/><b>Stars: </b>" + selectedMarker.stars +
			//"<br/><b>ambience: </b>" + selectedMarker.isAmbienceGood +
			//"<br/><b>food: </b>" + selectedMarker.isFoodGood +
			//"<br/><b>value for money: </b>" + selectedMarker.isPriceGood +
			//"<br/><b>service: </b>" + selectedMarker.isServiceGood + 
			"<br/>" + table + "</div>");
	//infoWindow.setContent("category:" + selectedAlert.category + " subc:" + selectedAlert.subcategory + " latitude:" + selectedAlert.latitude +" longitude:" + selectedAlert.longitude);
	infoWindow.open(myMap,marker);
}
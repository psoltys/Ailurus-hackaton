// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">
import { faSquareParking, faBus } from "@fortawesome/free-solid-svg-icons";

let markers: google.maps.Marker[] = [];
let map : google.maps.Map
let place :google.maps.places.PlaceResult;
let placeFinish:google.maps.places.PlaceResult;
let time = 0 
let directionsService :google.maps.DirectionsService
let directionsRenderer :google.maps.DirectionsRenderer
let spalanie
function initMap(): void {
  
  directionsService = new google.maps.DirectionsService();
  directionsRenderer = new google.maps.DirectionsRenderer();
  map = new google.maps.Map(
    document.getElementById("map") as HTMLElement,
    {
      center: { lat: 50.03712, lng: 22.00743 },
      zoom: 13,
      mapTypeControl: false,
    },
  );
  directionsRenderer.setMap(map);

  const card = document.getElementById("pac-card") as HTMLElement;
  const input = document.getElementById("pac-input") as HTMLInputElement;
  const inputEnd = document.getElementById("pac-input-end") as HTMLInputElement;
  const info = document.getElementById('info') as HTMLElement; 
info.style.display = 'none';
  const options = {
    fields: ["formatted_address", "geometry", "name"],
    strictBounds: false,
  };

  map.controls[google.maps.ControlPosition.TOP_LEFT].push(card);

  const autocomplete = new google.maps.places.Autocomplete(input, options);
  const autocompleteEnd = new google.maps.places.Autocomplete(inputEnd, options);
  
  // Bind the map's bounds (viewport) property to the autocomplete object,
  // so that the autocomplete requests use the current map bounds for the
  // bounds option in the request.
  autocomplete.bindTo("bounds", map);

  const infowindow = new google.maps.InfoWindow();
  const infowindowContent = document.getElementById(
    "infowindow-content",
  ) as HTMLElement;

  infowindow.setContent(infowindowContent);

  const marker = new google.maps.Marker({
    map,
    anchorPoint: new google.maps.Point(0, -29),
  });
  const markerFinish = new google.maps.Marker({
    map,
    anchorPoint: new google.maps.Point(0, -29),
  });

  autocomplete.addListener("place_changed", () => {
    infowindow.close();
    marker.setVisible(false);
    place = autocomplete.getPlace();

    if (!place.geometry || !place.geometry.location) {
      window.alert("No details available for input: '" + place.name + "'");
      return;
    }

    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);
    } else {
      map.setCenter(place.geometry.location);
      map.setZoom(17);
    }

    marker.setPosition(place.geometry.location);
    marker.setVisible(true);

    infowindowContent.children["place-name"].textContent = place.name;
    infowindowContent.children["place-address"].textContent =
      place.formatted_address;
    infowindow.open(map, marker);
  });

  autocompleteEnd.addListener("place_changed", () => {
    markerFinish.setVisible(false);
    placeFinish = autocompleteEnd.getPlace();

    if (!placeFinish.geometry || !placeFinish.geometry.location) {
      window.alert("No details available for input: '" + placeFinish.name + "'");
      return;
    }

    markerFinish.setPosition(placeFinish.geometry.location);
    markerFinish.setVisible(true);

   fetchClosestParkometers(map, placeFinish.geometry.location.lat(), placeFinish.geometry.location.lng());
    

  });
  

  // Sets a listener on a radio button to change the filter type on Places
  // Autocomplete.
  function setupClickListener(id, types) {
    const radioButton = document.getElementById(id) as HTMLInputElement;

    radioButton.addEventListener("click", () => {
      autocomplete.setTypes(types);
      input.value = "";
    });
  }

  document
  .getElementById("show-markers")!
  .addEventListener("click", showMarkers);
document
  .getElementById("hide-markers")!
  .addEventListener("click", hideMarkers);

  fetchParkometers(map)
  }

  async function fetchClosestParkometers(map: google.maps.Map, finishPlaceX, finishPlaceY){
    console.log(finishPlaceX)  
    console.log(finishPlaceY)  
    const response = await fetch('http://localhost:8090/occupancy?xCordinate='+finishPlaceX+ '&yCordinate='+finishPlaceY)
    
    const json = await response.json()
      if (response.ok) {
        console.log(json)
      }
      const parkometer = JSON.parse(JSON.stringify(json))

    hideMarkers()
   
    var marker = new google.maps.Marker({
      position: { lat: parkometer[0].xCordinate, lng: parkometer[0].yCordinate},
      map,
      icon: {
        path: faSquareParking.icon[4] as string,
        fillColor: "#fffff",
        fillOpacity: 1,
        anchor: new google.maps.Point(
          faSquareParking.icon[0] / 2, // width
          faSquareParking.icon[1], // height
        ),
        strokeWeight: 1,
        strokeColor: "#ffffff",
        scale: 0.075,
      },
      title: "Material Icon Font Marker",
    });
    markers.push(marker)
    var parokmetr = new google.maps.LatLng(parkometer[0].xCordinate, parkometer[0].yCordinate);

    calculateAndDisplayRoute(directionsService,directionsRenderer, place.name, placeFinish.name, parokmetr, parkometer[0].parkingTimeAddition,
      parkometer[0].zone.firstHourPrice +   parkometer[0].zone.secondHourPrice);

    console.log(parokmetr.toString())

  }


async function fetchParkometers(map: google.maps.Map) {

  const response = await fetch('http://localhost:8090/parkingMeters')
const json = await response.json()
  if (response.ok) {
    console.log(json)
  }
var coordsRed: google.maps.LatLngLiteral[] =[]
var coordsBlue: google.maps.LatLngLiteral[]=[]
var coordsOrange: google.maps.LatLngLiteral[]=[]
var coordsGreen: google.maps.LatLngLiteral[]=[]
  const parkometers = JSON.parse(JSON.stringify(json))
  for(var park of parkometers){
    var marker = new google.maps.Marker({
      position: { lat: park.xCordinate, lng: park.yCordinate},
      map,
      icon: {
        path: faSquareParking.icon[4] as string,
        fillColor: "#fffff",
        fillOpacity: 1,
        anchor: new google.maps.Point(
          faSquareParking.icon[0] / 2, // width
          faSquareParking.icon[1], // height
        ),
        strokeWeight: 1,
        strokeColor: "#ffffff",
        scale: 0.075,
      },
      title: "Material Icon Font Marker",
    });
//  if(park.zone.name === "ZIELONA"){
//   coordsGreen.push({lat: park.xCordinate, lng: park.yCordinate})
//  }
//  if(park.zone.name === "POMARAŃCZOWA"){
//   coordsOrange.push({lat: park.xCordinate, lng: park.yCordinate})
//  }
//  if(park.zone.name === "NIEBIESKA"){
//   coordsBlue.push({lat: park.xCordinate, lng: park.yCordinate})
//  }
//  if(park.zone.name === "CZERWONA"){
//   coordsRed.push({lat: park.xCordinate, lng: park.yCordinate})
//  }

 markers.push(marker);
}

var green = new google.maps.Polygon({
  paths: coordsGreen,
  strokeColor: "#14FF1C",
  strokeOpacity: 0.8,
  strokeWeight: 3,
  fillColor: "#14FF1C",
  fillOpacity: 0.35,
});
var orange = new google.maps.Polygon({
  paths: coordsOrange,
  strokeColor: "#FF0000",
  strokeOpacity: 0.8,
  strokeWeight: 3,
  fillColor: "#FFB114",
  fillOpacity: 0.35,
});
var blue = new google.maps.Polygon({
  paths: coordsBlue,
  strokeColor: "#FF0000",
  strokeOpacity: 0.8,
  strokeWeight: 3,
  fillColor: "#1433FF",
  fillOpacity: 0.35,
});
var red = new google.maps.Polygon({
  paths: coordsRed,
  strokeColor: "#FF0000",
  strokeOpacity: 0.8,
  strokeWeight: 3,
  fillColor: "#FF0000",
  fillOpacity: 0.35,
});
green.setMap(map)
orange.setMap(map)
blue.setMap(map)
red.setMap(map)
return json
}



// Sets the map on all markers in the array.
function setMapOnAll(map: google.maps.Map | null) {
  for (let i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}

// Removes the markers from the map, but keeps them in the array.
function hideMarkers(): void {
  setMapOnAll(null);
}

// Shows any markers currently in the array.
function showMarkers(): void {
  setMapOnAll(map);
}


function calculateAndDisplayRoute(
  directionsService: google.maps.DirectionsService,
  directionsRenderer: google.maps.DirectionsRenderer,
  start,finish,closestParkometer, timeAddition, parkingPrice
) {
  console.log(closestParkometer.lat())
  console.log(parkingPrice)
  var kilometers
  var kilometersValue
  directionsService
    .route({
      origin:  start,
      destination: closestParkometer,
      waypoints:[{location: finish, stopover: false}],
      optimizeWaypoints: true,
      travelMode: google.maps.TravelMode.DRIVING,
    })
    .then((response) => {
      time = 0
      directionsRenderer.setDirections(response);
      var route = response.routes[0]
      var legs = route?.legs;
      for(var leg of legs) {
        time += Math.round(leg?.duration?.value/60);
        console.log(leg?.duration?.value)
        console.log(leg?.distance?.value)
        
        console.log(leg?.distance)
        kilometers = leg?.distance?.text
        kilometersValue = leg?.distance?.value
      }  
var e = document.getElementById("cars") as HTMLSelectElement;
var text = e.options[e.selectedIndex].text;
console.log(text)
console.log(kilometersValue)

if(text === "Mini"){
  spalanie = Math.round((kilometersValue/1000) * (0.06630 * 6.5))
}
if(text === "Compact"){
  spalanie = Math.round((kilometersValue/1000) * (0.07100 * 6.5))
}
if(text === "SUV"){
  spalanie = Math.round((kilometersValue/1000) * (0.10000 * 6.5))
}
var calosc = parkingPrice + spalanie;
(document as Document)!.getElementById("cena")!.innerHTML = "Koszt: " + calosc+ " (Parking 2h: " + parkingPrice + " zł" + " Paliwo: " + spalanie + " zł)";

e.addEventListener("change",function (t){
  var text = e.options[e.selectedIndex].text;
  console.log(text)
  console.log(kilometersValue)
  
  if(text === "Mini"){
    spalanie = Math.round((kilometersValue/1000) * (0.06630 * 6.5))
  }
  if(text === "Compact"){
    spalanie = Math.round((kilometersValue/1000) * (0.07100 * 6.5))
  }
  if(text === "SUV"){
    spalanie = Math.round((kilometersValue/1000) * (0.10000 * 6.5))
  }
  var calosc = parkingPrice + spalanie;
  (document as Document)!.getElementById("cena")!.innerHTML = "Koszt: " + calosc+ " (Parking 2h: " + parkingPrice + " zł" + " Paliwo: " + spalanie + " zł)";

});
document.getElementById('info')!.style.display = 'block';

      (document as Document)!.getElementById("czas")!.innerHTML ="Czas:<b> " + Math.round(time + (timeAddition/60)).toString() + " minut </b>(Przejazd "+ time.toString() + "minut; Parking " + Math.round(timeAddition/60).toString()+" minut)";
      (document as Document)!.getElementById("autobus")!.innerHTML = "<b>Autobus:</b> <br> Czas: <b>" + (time).toString() + " minut,</b>";
      (document as Document)!.getElementById("blinky")!.innerHTML ="<b>Blinkee:</b><br>Czas:<b> " + Math.round((time + (time*0.05))).toString() + " minut</b></br> Koszt:"+ Math.round((2.5 + 0.69 *( time + (time*0.05)))) + "zl";
      (document as Document)!.getElementById("cenaBiletu")!.innerHTML ="Koszt: Normalny: 5zl, Ulgowy: 2.50zł";
      (document as Document)!.getElementById("kilometr")!.innerHTML ="Odleglosc: "+kilometers;

    })
    .catch((e) => window.alert("Directions request failed due to " + status + e));
}


declare global {
  interface Window {
    initMap: () => void;
  }
}
window.initMap = initMap;
export {};

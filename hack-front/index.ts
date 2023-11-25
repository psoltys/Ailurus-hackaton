// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">
import { faSquareParking } from "@fortawesome/free-solid-svg-icons";

let markers: google.maps.Marker[] = [];
let map : google.maps.Map
let place :google.maps.places.PlaceResult;
let placeFinish:google.maps.places.PlaceResult;
function initMap(): void {
  const directionsService = new google.maps.DirectionsService();
  const directionsRenderer = new google.maps.DirectionsRenderer();
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
  const biasInputElement = document.getElementById(
    "use-location-bias",
  ) as HTMLInputElement;
  const strictBoundsInputElement = document.getElementById(
    "use-strict-bounds",
  ) as HTMLInputElement;
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

    infowindowContent.children["place-name"].textContent = placeFinish.name;
    infowindowContent.children["place-address"].textContent =
    placeFinish.formatted_address;
    infowindow.open(map, marker);
    
    calculateAndDisplayRoute(directionsService,directionsRenderer, place.name, placeFinish.name)
    fetchClosestParkometers(map, placeFinish.geometry.location.lat, placeFinish.geometry.location.lng)
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

  setupClickListener("changetype-all", []);
  setupClickListener("changetype-address", ["address"]);
  setupClickListener("changetype-establishment", ["establishment"]);
  setupClickListener("changetype-geocode", ["geocode"]);
  setupClickListener("changetype-cities", ["(cities)"]);
  setupClickListener("changetype-regions", ["(regions)"]);

  document
  .getElementById("show-markers")!
  .addEventListener("click", showMarkers);
document
  .getElementById("hide-markers")!
  .addEventListener("click", hideMarkers);


  biasInputElement.addEventListener("change", () => {
    if (biasInputElement.checked) {
      autocomplete.bindTo("bounds", map);
    } else {
      // User wants to turn off location bias, so three things need to happen:
      // 1. Unbind from map
      // 2. Reset the bounds to whole world
      // 3. Uncheck the strict bounds checkbox UI (which also disables strict bounds)
      autocomplete.unbind("bounds");
      autocomplete.setBounds({ east: 180, west: -180, north: 90, south: -90 });
      strictBoundsInputElement.checked = biasInputElement.checked;
    }

    input.value = "";
  });

  strictBoundsInputElement.addEventListener("change", () => {
    autocomplete.setOptions({
      strictBounds: strictBoundsInputElement.checked,
    });

    if (strictBoundsInputElement.checked) {
      biasInputElement.checked = strictBoundsInputElement.checked;
      autocomplete.bindTo("bounds", map);
    }

    input.value = "";
  });
  fetchParkometers(map)
  }

  async function fetchClosestParkometers(map: google.maps.Map, finishPlaceX, finishPlaceY){
    const response = await fetch('http://localhost:8090/occupancy?xCordinate=' +finishPlaceX+'&yCordinate=' + finishPlaceY)
    const json = await response.json()
      if (response.ok) {
        console.log(json)
      }
    hideMarkers

    new google.maps.Marker({
      position: { lat: json[0].xCordinate, lng: json[0].yCordinate},
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
 if(park.zone.name === "ZIELONA"){
  coordsGreen.push({lat: park.xCordinate, lng: park.yCordinate})
 }
 if(park.zone.name === "POMARAŃCZOWA"){
  coordsOrange.push({lat: park.xCordinate, lng: park.yCordinate})
 }
 if(park.zone.name === "NIEBIESKA"){
  coordsBlue.push({lat: park.xCordinate, lng: park.yCordinate})
 }
 if(park.zone.name === "CZERWONA"){
  coordsRed.push({lat: park.xCordinate, lng: park.yCordinate})
 }

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
  start,finish
) {
  directionsService
    .route({
      origin: {
        query: start,
      },
      destination: {
        query: finish,
      },
      travelMode: google.maps.TravelMode.DRIVING,
    })
    .then((response) => {
      directionsRenderer.setDirections(response);
    })
    .catch((e) => window.alert("Directions request failed due to " + status));
}


declare global {
  interface Window {
    initMap: () => void;
  }
}
window.initMap = initMap;
export {};

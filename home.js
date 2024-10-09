// Mapbox Access Token
mapboxgl.accessToken = 'pk.eyJ1IjoiZ2F1cmF2bmciLCJhIjoiY20xdGx3ODhuMDNzNTJ0cHI2YWphY2p1ZCJ9.DCncOYgA91GXOkejz0CilQ';

// Initialize the map
const map = new mapboxgl.Map({
    container: "map", // ID of the container for the map
    style: "mapbox://styles/mapbox/streets-v11", // Initial map style
    center: [78.96, 20.59], // Initial center (India)
    zoom: 5 // Initial zoom level
});

// Add Navigation Controls
map.addControl(new mapboxgl.NavigationControl());

// Add Geolocation Control
map.addControl(new mapboxgl.GeolocateControl({
    positionOptions: {
        enableHighAccuracy: true
    },
    trackUserLocation: true
}));

// Add Fullscreen Control
map.addControl(new mapboxgl.FullscreenControl());

// Add Scale Control
map.addControl(new mapboxgl.ScaleControl({
    maxWidth: 80,
    unit: 'metric'
}));

// Style Switcher for changing map style
document.getElementById('style-switcher').addEventListener('change', function() {
    map.setStyle(this.value); // Change the style based on selected option
});

// Load Mapbox Directions Control
var directions = new MapboxDirections({
    accessToken: mapboxgl.accessToken,
    unit: 'metric',
    profile: 'driving'
});
map.addControl(directions, "top-left");

// Set route from user location to Delhi
function setRoute(startCoords, endCoords) {
    directions.setOrigin(startCoords); // Set the starting location
    directions.setDestination(endCoords); // Set the destination to Delhi
}

// Get the user's current location
navigator.geolocation.getCurrentPosition(successLocation, errorLocation, {
    enableHighAccuracy: true
});

// function successLocation(position) {
//     const userCoords = [position.coords.longitude, position.coords.latitude];
//     const delhiCoords = [77.1025, 28.7041]; // Coordinates for Delhi

//     // Set the route from the user's location to Delhi
//     setRoute(userCoords, delhiCoords);

//     // Optional: Fly to the user's location (if you want)
//     map.flyTo({ center: userCoords, zoom: 10 });
// }

// function errorLocation() {
//     console.error("Unable to retrieve your location. Defaulting to India.");
//     const defaultCoords = [78.96, 20.59];
//     const delhiCoords = [77.1025, 28.7041];

//     // Set the route from the default location to Delhi
//     setRoute(defaultCoords, delhiCoords);

//     // Optional: Fly to the default location (if you want)
//     map.flyTo({ center: defaultCoords, zoom: 5 });
// }

// Load custom image for destination (point B)
map.on('load', function () {
    map.loadImage('your-destination-image-url.png', function (error, image) {
        if (error) {
            console.error("Error loading image: ", error);
            return; // Early exit if there's an error
        }

        map.addImage('destination-icon', image); // Add the image to the map

        // Add a destination marker at Delhi
        new mapboxgl.Marker({
            element: createMarkerElement(), // Create a marker element
            anchor: 'bottom'
        })
        .setLngLat([77.1025, 28.7041]) // Set to Delhi coordinates
        .addTo(map);
    });
});

// Function to create a custom marker element
function createMarkerElement() {
    const el = document.createElement('div');
    el.className = 'marker'; // Add a class for styling
    el.style.backgroundImage = 'url(your-destination-image-url.png)'; // Use the image URL
    el.style.width = '50px'; // Set desired width
    el.style.height = '50px'; // Set desired height
    el.style.backgroundSize = '100%'; // Scale background image
    return el;
}

// Initialize the map centered on a default location (e.g., world view)
const map = L.map('map').setView([0, 0], 2);

// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

const locateBtn = document.getElementById('locate-btn');

locateBtn.addEventListener('click', () => {
    // Check if Geolocation is supported
    if (!navigator.geolocation) {
        alert("Geolocation is not supported by your browser");
        return;
    }

    const options = {
        enableHighAccuracy: true, // Forces precise location (GPS)
        timeout: 10000,           // Wait up to 10 seconds
        maximumAge: 0             // Do not use cached location
    };

    navigator.geolocation.getCurrentPosition(success, error, options);
});

function success(position) {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;

    // Center map on user location and zoom in
    map.setView([lat, lng], 15);

    // Add a marker (pin) at the location
    L.marker([lat, lng]).addTo(map)
        .bindPopup("You are here!")
        .openPopup();
}

function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
    alert("Unable to retrieve your location. Please ensure location permissions are enabled.");
}

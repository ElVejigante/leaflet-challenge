// Seismic data url, significant earthquakes in the last month
var queryURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson"

d3.json(queryURL).then(function (seismicData, err) {
    // Base Map
    var myMap = L.map("map", {
        center: [37, -95],
        zoom: 5
    });

    //Title Layer
    L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
        tileSize: 512,
        maxZoom: 18,
        zoomOffset: -1,
        id: "mapbox/streets-v11",
        accessToken: API_KEY
        }).addTo(myMap);
    
        
})

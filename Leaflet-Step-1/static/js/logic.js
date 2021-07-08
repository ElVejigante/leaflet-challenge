// Seismic data url, significant earthquakes in the last month
var queryURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson"

d3.json(queryURL, function(seismicData) {
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
        });
    
    function markerSize(mag) {
        return mag*5
    };
    function colors(d) {
        switch(true) {
            case d>90:
                return "darkgreen";
            case d>70:
                return "green";
            case d>50:
                return "lightgreen";
            case d>30:
                return "orange";
            case d>10:
                return "yellow";
        }
    }
    seismicData.features.forEach(function (feature) {
        L.circle([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], {
            fillOpacity: 0.8,
            color: "red",
            fillColor: colors(feature.geometry.coordinates[2]),
            radius: markerSize(feature.properties.mag)
        }).addTo(myMap).bindPopup("<h3>" + feature.properties.place +
            "</h3><hr><p>" + new Date(feature.properties.time) + "</p><p>"  
            +"Magnitude: "+ feature.properties.mag + "</p><p>" 
            +"Depth: "+ feature.geometry.coordinates[2] + "</p>")

    })
})

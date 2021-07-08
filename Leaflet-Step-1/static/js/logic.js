// Seismic data url, significant earthquakes in the last month
var queryURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson"

d3.json(queryURL, function(seismicData) {
    
    var quakes = L.layerGroup();
    //Title Layer
    var backMap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
        tileSize: 512,
        maxZoom: 18,
        zoomOffset: -1,
        id: "mapbox/streets-v11",
        accessToken: API_KEY
    });
    var baseMap = {"Light Map": backMap};
    var overlayMap = {"Earthquakes": quakes}
    
    // Base Map
    var myMap = L.map("map", {
        center: [37, -95],
        zoom: 5,
        layers: [backMap, quakes]
    });
    L.control.layers(baseMap, overlayMap, {collapsed:false}).addTo(myMap);
    function markerSize(mag) {
        return mag*5
    };
    function colors(d) {
        switch(true) {
            case d>9:
                return "darkgreen";
            case d>7:
                return "green";
            case d>5:
                return "lightgreen";
            case d>3:
                return "orange";
            case d>1:
                return "yellow";
        }
    }
    L.geoJSON(seismicData, {
        pointToLayer: function(feature, location) {
          return L.circleMarker(location, {
            radius: markerSize(feature.properties.mag),
            fillColor: colors(feature.geometry.coordinates[2]),
            fillOpacity: 0.7,
            color: "black",
            stroke: true,
            weight: 0.5
          });
        },
    
        onEachFeature: function(feature, layer) {
          layer.bindPopup("<h3>Location: "+ feature.properties.place + "</h3><hr><p>Date: " + new Date(feature.properties.time) 
                          + "</p><hr><p>" + "Magnitude: " + feature.properties.mag + "</p>");
        }
      }).addTo(quakes);
    
      quakes.addTo(myMap);
})

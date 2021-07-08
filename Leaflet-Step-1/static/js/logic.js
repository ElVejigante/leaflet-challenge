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
        }).addTo(myMap);
    
    function markerSize(mag) {
        return mag*3
    };

    function colors(d) {
        if (d < 1){
            return "#ED4311"
          } else if ( d < 2){
            return "#ED7211"
          } else if (d < 3){
            return "#EDB411"
          } else if (d < 4){
            return "#EDD911"
          } else if (d < 5 ){
            return "#DCED11"
          } else {
            return "#B7DF5F"
          }   
    };
    seismicData.features.forEach(function (feature) {
        L.circle([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], {
            fillOpacity: 0.8,
            color: "black",
            fillColor: colors(feature.properties.mag),
            radius: markerSize(feature.properties.mag)
        }).addTo(myMap).bindPopup("<h3>" + feature.properties.place +
            "</h3><hr><p>" + new Date(feature.properties.time) + "</p><p>"  
            +"Magnitude: "+ feature.properties.mag + "</p><p>" 
            +"Depth: "+ feature.geometry.coordinates[2] + "</p>")

    })
})

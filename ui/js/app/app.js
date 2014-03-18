var map;
$(document).ready(function() {
    map = new GMaps({
        div: '#mapHolder',
        zoom: 12,
        lat: 51.379444,
        lng: -2.365556,
    });


    // On click grab the values & geoCode 
    $('#submit-options').click(function() {
        var start = $('#start').val();
        var dest = $('#destination').val();

        GMaps.geocode({
            address: start,
            callback: function(results, status) {
                if (status == 'OK') {
                    var start_pnt = results[0].geometry.location;
                    console.log(start_pnt);
                    GMaps.geocode({
                        address: dest,
                        callback: function(results, status) {
                            if (status == 'OK') {
                                var dest_pnt = results[0].geometry.location;
                                map.drawRoute({
                                    origin: [start_pnt['k'], start_pnt['A']],
                                    destination: [dest_pnt['k'], dest_pnt['A']],
                                    strokeColor: '#131540',
                                    travelMode: 'bicycling',
                                    strokeOpacity: 0.5,
                                    strokeWeight: 3
                                });
                            }
                        }
                    })
                }
            }
        });
    });



});
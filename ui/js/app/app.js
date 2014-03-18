var map;
$(document).ready(function() {
    map = new GMaps({
        div: '#mapHolder',
        zoom: 12,
        lat: 51.379444,
        lng: -2.365556,
    });

    // Given a route, display it as an option to the user
    function show_route_option(route) {
        display_route(route)

    }

    function display_route(route) {
        map.drawRoute({
            origin: route.origin,
            destination: route.destination,
            travelMode: 'bicycling',
            strokeColor: '#131540',
            strokeOpacity: 0.3,
            strokeWeight: 3
        })
    }


    // On click grab the values & geoCode
    $('#submit-options').click(function() {
        $('.home-copy').fadeOut();
        var start = "bs57xt" //$('#start').val();
        var dest = "bs14nd" //$('#destination').val();

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
                                map.getRoutes({
                                    origin: [start_pnt['k'], start_pnt['A']],
                                    destination: [dest_pnt['k'], dest_pnt['A']],
                                    travelMode: 'bicycling',
                                    waypoints: [{
                                        'location': "BS4 5LR"
                                    }],
                                    callback: function(results, status) {
                                        show_route_option(results);
                                    }
                                });
                            }
                        }
                    })
                }
            }
        });
    });



});

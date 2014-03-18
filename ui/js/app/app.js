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

        var parking = (function() {
            var json = null;
            $.ajax({
                'async': false,
                'global': false,
                'url': "/parking.json",
                'dataType': "json",
                'success': function(data) {
                    json = data;
                }
            });
            return json;
        })();
        console.log(parking['car_parks']);
        for (var i = parking['car_parks'].length - 1; i >= 0; i--) {
            console.log(i);
            var wp_postcode = parking["car_parks"][i].postcode;
            GMaps.geocode({
                address: start,
                callback: function(results, status) {
                    if (status == 'OK') {
                        var start_pnt = results[0].geometry.location;
                        GMaps.geocode({
                            address: dest,
                            callback: function(results, status) {
                                if (status == 'OK') {
                                    var dest_pnt = results[0].geometry.location;
                                    var options = {
                                        origin: [start_pnt['k'], start_pnt['A']],
                                        destination: [dest_pnt['k'], dest_pnt['A']],
                                        travelMode: 'bicycling',
                                        waypoints: [{
                                            'location': wp_postcode

                                        }],
                                    }


                                    map.getRoutes({
                                        origin: [start_pnt['k'], start_pnt['A']],
                                        destination: [dest_pnt['k'], dest_pnt['A']],
                                        travelMode: 'bicycling',
                                        waypoints: [{
                                            'location': wp_postcode
                                        }],
                                        callback: function(results, status) {
                                            show_route_option(options);
                                        }
                                    });
                                }
                            }
                        })
                    }
                }
            });
        } //END FOR LOOP.
    });



});
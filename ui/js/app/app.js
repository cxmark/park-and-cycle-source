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
        display_route(route);
        console.log(route.carparkName[0].name);

        console.log(route);


    }

    function display_route(route) {
        map.drawRoute({
            origin: route.origin,
            destination: route.destination,
            waypoints: [{
                "location": route.waypoints[0].location
            }],
            travelMode: 'bicycling',
            strokeColor: '#131540',
            strokeOpacity: 0.3,
            strokeWeight: 3
        })
    }


    // On click grab the values & geoCode
    $('#submit-options').click(function() {
        $('.wr__nav').hide();
        $('.wr__results').show();
        $('.home-copy').fadeOut();
        var start = "bs57xt"; //$('#start').val();
        var dest = "bs14nd"; //$('#destination').val();

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
                                        "location": parking["car_parks"][0].postcode
                                    }],
                                    carparkName: [{
                                        "name": parking["car_parks"][0].name
                                    }]
                                };

                                map.getRoutes({
                                    origin: [start_pnt['k'], start_pnt['A']],
                                    destination: [dest_pnt['k'], dest_pnt['A']],
                                    travelMode: 'bicycling',
                                    waypoints: [{
                                        "location": parking["car_parks"][0].postcode
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
                                        "location": parking["car_parks"][1].postcode

                                    }]
                                };

                                map.getRoutes({
                                    origin: [start_pnt['k'], start_pnt['A']],
                                    destination: [dest_pnt['k'], dest_pnt['A']],
                                    travelMode: 'bicycling',
                                    waypoints: [{
                                        "location": parking["car_parks"][1].postcode
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
                                        'location': parking["car_parks"][2].postcode

                                    }]
                                };

                                map.getRoutes({
                                    origin: [start_pnt['k'], start_pnt['A']],
                                    destination: [dest_pnt['k'], dest_pnt['A']],
                                    travelMode: 'bicycling',
                                    waypoints: [{
                                        'location': parking["car_parks"][2].postcode
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

    });

    $('.quick-nav a').on('click', function() {
        $('.home-copy').hide();
        $(document.getElementById($(this).data('id'))).show();
    });


});

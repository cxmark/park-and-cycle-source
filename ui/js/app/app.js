var map;

$(document).ready(function() {
    map = new GMaps({
        div: '#mapHolder',
        zoom: 12,
        lat: 51.4500,
        lng: -2.5833,
    });

    $('.result__wrapper').on("click", ".magic-happen", function(e) {
        display_route($(this).data());
    });


    function makeid() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < 5; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }


    // Given a route, display it as an option to the user

    function show_route_option(route, legs) {
        // Legs is an array of the two legs, given a single waypoint.
        // distance: Object
        //				text: "8.1 km"
        // 				value: 8061
        //				__proto__: Object
        //duration: Object
        //				text: "28 mins"
        //				value: 1683
        //				__proto__: Object
        //end_address: "Bristol, City of Bristol BS4 5LR, UK"
        //end_location: O
        //start_address: "27 Atlas Close, Bristol, City of Bristol BS5 7XT, UK"
        //start_location: O
        //steps: Array[20]
        //via_waypoint: Array[0]
        //via_waypoints: Array[0]
        //
        //carpark name: route.carparkName[0].name
        var route_id = makeid();

        $('.result__wrapper').append('<div class="result">' +
            '<p class="result__title">' + route.carparkName[0].name + '</p>' +
            '<p class="result__address">' + route.waypoints[0].location + '</p>' +
            '<p class="result__more"><a href="#result-' + route.waypoints[0].location + '" class="result__more-link js-overlay-open js-overlay-open-dialog">More carpark information</a></p>' +
            '<div id="result-' + route.waypoints[0].location + '" class="overlay overlay--dialog mfp-hide"><div class="overlay__content"><p>You could save £201.40 in a year in fuel alone</p><p>You could save 103Kg of CO2 in a year</p><p>You could save 103,203 calories in a year</p><p>(or 52 Mars Bars)</p><p>You could save 98,030 calories in a year</p><p>(or 50 Mars Bars)</p></div></div>' +
            '<p class="result__address"><img src="/ui/images/car.png"> ' + legs[0].distance.text + '</p>' +
            '<p class="result__address"><img src="/ui/images/bike.png"> ' + legs[1].distance.text + '</p>' +
            '<p class="result__choose"><a href="#" id="route-' + route_id + '" class="magic-happen choose-result btn--secondary btn">Show this route</a></p>' +
            '');
        $('#route-' + route_id).data(route);

    }

    function display_route(route) {
        // Clean all existing routes.
        map.removePolylines();
        // Draw our new route.
        map.drawRoute({
            origin: route.origin,
            destination: route.destination,
            waypoints: [{
                "location": route.waypoints[0].location
            }],
            travelMode: 'bicycling',
            strokeColor: '#131540',
            strokeOpacity: 0.4,
            strokeWeight: 3
        })

    }


    // On click grab the values & geoCode
    $('#submit-options').click(function() {
        $('.wr__nav').hide();
        $('.wr__results').show();
        $('.home-copy').fadeOut();
        var start = $('#start').val();
        var dest = $('#destination').val();

        var parking = (function() {
            var json = null;
            $.ajax({
                'async': false,
                'global': false,
                'url': "parking.json",
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
                                        show_route_option(options, results[0]["legs"]);
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

                                    }],
                                    carparkName: [{
                                        "name": parking["car_parks"][1].name
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
                                        show_route_option(options, results[1]["legs"]);
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

                                    }],
                                    carparkName: [{
                                        "name": parking["car_parks"][2].name
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
                                        show_route_option(options, results[2]["legs"]);
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

    $('.wr__results').on('click', '.js-overlay-open', function(e) {

        e.preventDefault();
        $(($(this).attr('href'))).removeClass('mfp-hide');
    });

});

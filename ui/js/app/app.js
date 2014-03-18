var map;

$(document).ready(function() {
    map = new GMaps({
        div: '#mapHolder',
        zoom: 12,
        lat: 51.4500,
        lng: -2.5833,
    });

    $('a.magic-happen').on("click", function(e) {


        console.log("hola");
        //display_route(this)
    })



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

        var data = JSON.stringify(route)

        $('.result__wrapper').append('<div class="result">' +
            '<p class="result__title">' + route.carparkName[0].name + '</p>' +
            '<p class="result__address">' + route.waypoints[0].location + '</p>' +
            '<p class="result__more"><a href="#result-' + route.waypoints[0].location + '" class="result__more-link js-overlay-open js-overlay-open-dialog">More carpark information</a></p>' +
            '<p class="result__choose"><a href="#" data-route="' + data + '" class="magic-happen choose-result btn--secondary btn">Show this route</a></p>' +
            '<div id="result-' + route.waypoints[0].location + '" class="overlay overlay--dialog mfp-hide"><p class="overlay__title">Information about this route</p><div class="overlay__content"><p>You could save £201.40 in a year in fuel alone</p><p>You could save 103Kg of CO2 in a year</p><p>You could save 103,203 calories in a year</p><p>(or 52 Mars Bars)</p><p>You could save 98,030 calories in a year</p><p>(or 50 Mars Bars)</p></div></div>' +
            '</div>' +
            '');
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
                                        show_route_option(options, results[0]["legs"]);
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
/**
 * @see https://developers.google.com/maps/documentation/javascript/mysql-to-maps
 */
(function ($) {
    'use strict';

    var API_KEY = 'AIzaSyBYGEtn-zAItcQi72nY7vD0mnLUTla4o-Y';
    var tag = document.createElement('script');
    var firstScriptTag = document.getElementsByTagName('script')[0];

    var locationMarkerId = -1, markers = [];


    tag.src = 'https://maps.googleapis.com/maps/api/js?key='+ API_KEY +'&callback=initMap&libraries=places';
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    function setMapMarkers (map) {

        var cities = [{
            coordinates: [22.6776965, 48.4408968],
            name: 'Мукачево'
        }, {
            coordinates: [22.7457769, 48.5129067],
            name: 'Клиновець'
        }, {
            coordinates: [22.7926493, 48.4037552],
            name: 'Лалово'
        }];

        var infoWindow = new google.maps.InfoWindow();

        for (var i = 0; i < cities.length; i += 1) {
            var city = cities[i];

            markers[i] = new google.maps.Marker({
                position: {lat: city.coordinates[1], lng: city.coordinates[0]},
                map: map,
                title: city.name,
                zIndex: i
            });

            google.maps.event.addListener(markers[i], 'click', (function(marker, i) {
                return function() {
                    infoWindow.setContent('thisIsInfoTooltip: ' + i);
                    infoWindow.open(map, marker);
                }
            })(markers[i], i));
        }
    }

    function initMap () {

        var centerUkraine = {lat: 48.3847191, lng: 31.1703258};

        // Create a map object and specify the DOM element for display.
        var map = new google.maps.Map(document.getElementById('googleMaps'), {
            center: centerUkraine,
            scrollwheel: false,
            zoom: 6,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        });

        setMapMarkers(map);
        geoAutocomplete(map);
    }

    function geoAutocomplete (map) {
        $('#geoSearch').placepicker({
            placeChanged: function(place) {
                var location = this.getLocation(),
                    coordinates = {lat: location.latitude, lng: location.longitude};
                map.setCenter(coordinates);
                map.setZoom(14);

                if (locationMarkerId === -1) {
                    locationMarkerId = markers.length;
                    markers[locationMarkerId] = new google.maps.Marker({
                        position: coordinates,
                        map: map,
                        draggable: true
                    });

                } else {
                    markers[locationMarkerId].setPosition(coordinates);
                }
            }
        });
    }

    window.initMap = initMap;
}(jQuery));

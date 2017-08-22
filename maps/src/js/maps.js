/**
 * @see https://developers.google.com/maps/documentation/javascript/mysql-to-maps
 */
(function ($) {
    'use strict';

    const API_KEY = 'AIzaSyBYGEtn-zAItcQi72nY7vD0mnLUTla4o-Y';
    var tag = document.createElement('script');
    var firstScriptTag = document.getElementsByTagName('script')[0];


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

        for (var i = 0; i < cities.length; i += 1) {
            var city = cities[i];
            var marker = new google.maps.Marker({
                position: {lat: city.coordinates[1], lng: city.coordinates[0]},
                map: map,
                title: city.name,
                zIndex: i
            });
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

    function geoAutocomplete () {
        $('#geoSearch').placepicker({
            placeChanged: function(place) {
                var map = this;
                console.log(place.formatted_address);
                console.log('location:', map.getLocation());
            }
        });
    }

    window.initMap = initMap;
}(jQuery));

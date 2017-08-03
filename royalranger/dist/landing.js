(function () {
    'use strict';

    var API_KEY = 'AIzaSyCWEmDm4GoFSV2sglSMsWRTVSU-wI_CPaQ',
        tag = document.createElement('script'),
        firstScriptTag = document.getElementsByTagName('script')[0];

    tag.src = 'https://maps.googleapis.com/maps/api/js?key='+ API_KEY +'&callback=initMap';
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
        }, {
            coordinates: [28.6036776, 50.2678654],
            name: 'Житомир'
        }, {
            coordinates: [29.024175, 50.3186287],
            name: 'Коростишів'
        }, {
            coordinates: [30.2525067, 50.401699],
            name: 'Київ'
        }, {
            coordinates: [31.9787416, 49.4310824],
            name: 'Черкаси'
        }, {
            coordinates: [28.3995939, 49.2347946],
            name: 'Вінниця'
        }, {
            coordinates: [32.145623, 48.5187443],
            name: 'Кропивницький'
        }, {
            coordinates: [33.3262711, 46.7506371],
            name: 'Нова Коховка'
        }, {
            coordinates: [30.5717029, 46.4598895],
            name: 'Одеса'
        }, {
            coordinates: [28.7751864, 45.3505316],
            name: 'Ізмаїл'
        }, {
            coordinates: [29.1790629, 45.467213],
            name: 'Кілія'
        }, {
            coordinates: [37.441878, 47.1225096],
            name: 'Маріуполь'
        }, {
            coordinates: [37.192532, 48.3531052],
            name: 'Родінське'
        }, {
            coordinates: [37.4926345, 48.6203542],
            name: 'Дружківка'
        }, {
            coordinates: [37.4844015, 48.7294323],
            name: 'Краматорськ'
        }, {
            coordinates: [37.5444009, 48.8539607],
            name: 'Слов\'янськ'
        }, {
            coordinates: [36.1457407, 49.994507],
            name: 'Харків'
        }, {
            coordinates: [34.4871986, 49.6020233],
            name: 'Полтава'
        }];

        var markerIcon = 'images/marker.png';

        for (var i = 0; i < cities.length; i += 1) {
            var city = cities[i],
                marker = new google.maps.Marker({
                    position: {lat: city.coordinates[1], lng: city.coordinates[0]},
                    map: map,
                    icon: markerIcon,
                    title: city.name,
                    zIndex: i
                });
        }
    }

    function initMap () {

        var centerUkraine = {lat: 48.3847191, lng: 31.1703258};

        // Create a map object and specify the DOM element for display.
        var map = new google.maps.Map(document.querySelector('.google-map'), {
            center: centerUkraine,
            scrollwheel: false,
            zoom: 6
        });

        setMapMarkers(map);
    }

    window.initMap = initMap;
}());

(function (window) {
    'use strict';

    window.addEventListener('scroll', function (e) {
        var depth, i, layer, layers, len, movement, topDistance, translate3d;

        topDistance = this.pageYOffset;
        layers = document.querySelectorAll('[data-type="parallax"]');

        for (i = 0, len = layers.length; i < len; i++) {
            layer = layers[i];
            depth = layer.getAttribute('data-depth');
            movement = -(topDistance * depth);
            translate3d = 'translate3d(0, ' + movement + 'px, 0)';
            layer.style['-webkit-transform'] = translate3d;
            layer.style['-moz-transform'] = translate3d;
            layer.style['-ms-transform'] = translate3d;
            layer.style['-o-transform'] = translate3d;
            layer.style.transform = translate3d;
        }
    });
}(window));
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdvb2dsZS1tYXBzLmpzIiwicGFyYWxsYXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDeEdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImxhbmRpbmcuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gKCkge1xuICAgICd1c2Ugc3RyaWN0JztcblxuICAgIHZhciBBUElfS0VZID0gJ0FJemFTeUNXRW1EbTRHb0ZTVjJzZ2xTTXNXUlRWU1Utd0lfQ1BhUScsXG4gICAgICAgIHRhZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpLFxuICAgICAgICBmaXJzdFNjcmlwdFRhZyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdzY3JpcHQnKVswXTtcblxuICAgIHRhZy5zcmMgPSAnaHR0cHM6Ly9tYXBzLmdvb2dsZWFwaXMuY29tL21hcHMvYXBpL2pzP2tleT0nKyBBUElfS0VZICsnJmNhbGxiYWNrPWluaXRNYXAnO1xuICAgIGZpcnN0U2NyaXB0VGFnLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHRhZywgZmlyc3RTY3JpcHRUYWcpO1xuXG4gICAgZnVuY3Rpb24gc2V0TWFwTWFya2VycyAobWFwKSB7XG5cbiAgICAgICAgdmFyIGNpdGllcyA9IFt7XG4gICAgICAgICAgICBjb29yZGluYXRlczogWzIyLjY3NzY5NjUsIDQ4LjQ0MDg5NjhdLFxuICAgICAgICAgICAgbmFtZTogJ9Cc0YPQutCw0YfQtdCy0L4nXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGNvb3JkaW5hdGVzOiBbMjIuNzQ1Nzc2OSwgNDguNTEyOTA2N10sXG4gICAgICAgICAgICBuYW1lOiAn0JrQu9C40L3QvtCy0LXRhtGMJ1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICBjb29yZGluYXRlczogWzIyLjc5MjY0OTMsIDQ4LjQwMzc1NTJdLFxuICAgICAgICAgICAgbmFtZTogJ9Cb0LDQu9C+0LLQvidcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgY29vcmRpbmF0ZXM6IFsyOC42MDM2Nzc2LCA1MC4yNjc4NjU0XSxcbiAgICAgICAgICAgIG5hbWU6ICfQltC40YLQvtC80LjRgCdcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgY29vcmRpbmF0ZXM6IFsyOS4wMjQxNzUsIDUwLjMxODYyODddLFxuICAgICAgICAgICAgbmFtZTogJ9Ca0L7RgNC+0YHRgtC40YjRltCyJ1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICBjb29yZGluYXRlczogWzMwLjI1MjUwNjcsIDUwLjQwMTY5OV0sXG4gICAgICAgICAgICBuYW1lOiAn0JrQuNGX0LInXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGNvb3JkaW5hdGVzOiBbMzEuOTc4NzQxNiwgNDkuNDMxMDgyNF0sXG4gICAgICAgICAgICBuYW1lOiAn0KfQtdGA0LrQsNGB0LgnXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGNvb3JkaW5hdGVzOiBbMjguMzk5NTkzOSwgNDkuMjM0Nzk0Nl0sXG4gICAgICAgICAgICBuYW1lOiAn0JLRltC90L3QuNGG0Y8nXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGNvb3JkaW5hdGVzOiBbMzIuMTQ1NjIzLCA0OC41MTg3NDQzXSxcbiAgICAgICAgICAgIG5hbWU6ICfQmtGA0L7Qv9C40LLQvdC40YbRjNC60LjQuSdcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgY29vcmRpbmF0ZXM6IFszMy4zMjYyNzExLCA0Ni43NTA2MzcxXSxcbiAgICAgICAgICAgIG5hbWU6ICfQndC+0LLQsCDQmtC+0YXQvtCy0LrQsCdcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgY29vcmRpbmF0ZXM6IFszMC41NzE3MDI5LCA0Ni40NTk4ODk1XSxcbiAgICAgICAgICAgIG5hbWU6ICfQntC00LXRgdCwJ1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICBjb29yZGluYXRlczogWzI4Ljc3NTE4NjQsIDQ1LjM1MDUzMTZdLFxuICAgICAgICAgICAgbmFtZTogJ9CG0LfQvNCw0ZfQuydcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgY29vcmRpbmF0ZXM6IFsyOS4xNzkwNjI5LCA0NS40NjcyMTNdLFxuICAgICAgICAgICAgbmFtZTogJ9Ca0ZbQu9GW0Y8nXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGNvb3JkaW5hdGVzOiBbMzcuNDQxODc4LCA0Ny4xMjI1MDk2XSxcbiAgICAgICAgICAgIG5hbWU6ICfQnNCw0YDRltGD0L/QvtC70YwnXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGNvb3JkaW5hdGVzOiBbMzcuMTkyNTMyLCA0OC4zNTMxMDUyXSxcbiAgICAgICAgICAgIG5hbWU6ICfQoNC+0LTRltC90YHRjNC60LUnXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGNvb3JkaW5hdGVzOiBbMzcuNDkyNjM0NSwgNDguNjIwMzU0Ml0sXG4gICAgICAgICAgICBuYW1lOiAn0JTRgNGD0LbQutGW0LLQutCwJ1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICBjb29yZGluYXRlczogWzM3LjQ4NDQwMTUsIDQ4LjcyOTQzMjNdLFxuICAgICAgICAgICAgbmFtZTogJ9Ca0YDQsNC80LDRgtC+0YDRgdGM0LonXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGNvb3JkaW5hdGVzOiBbMzcuNTQ0NDAwOSwgNDguODUzOTYwN10sXG4gICAgICAgICAgICBuYW1lOiAn0KHQu9C+0LJcXCfRj9C90YHRjNC6J1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICBjb29yZGluYXRlczogWzM2LjE0NTc0MDcsIDQ5Ljk5NDUwN10sXG4gICAgICAgICAgICBuYW1lOiAn0KXQsNGA0LrRltCyJ1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICBjb29yZGluYXRlczogWzM0LjQ4NzE5ODYsIDQ5LjYwMjAyMzNdLFxuICAgICAgICAgICAgbmFtZTogJ9Cf0L7Qu9GC0LDQstCwJ1xuICAgICAgICB9XTtcblxuICAgICAgICB2YXIgbWFya2VySWNvbiA9ICdpbWFnZXMvbWFya2VyLnBuZyc7XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjaXRpZXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICAgIHZhciBjaXR5ID0gY2l0aWVzW2ldLFxuICAgICAgICAgICAgICAgIG1hcmtlciA9IG5ldyBnb29nbGUubWFwcy5NYXJrZXIoe1xuICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjoge2xhdDogY2l0eS5jb29yZGluYXRlc1sxXSwgbG5nOiBjaXR5LmNvb3JkaW5hdGVzWzBdfSxcbiAgICAgICAgICAgICAgICAgICAgbWFwOiBtYXAsXG4gICAgICAgICAgICAgICAgICAgIGljb246IG1hcmtlckljb24sXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBjaXR5Lm5hbWUsXG4gICAgICAgICAgICAgICAgICAgIHpJbmRleDogaVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaW5pdE1hcCAoKSB7XG5cbiAgICAgICAgdmFyIGNlbnRlclVrcmFpbmUgPSB7bGF0OiA0OC4zODQ3MTkxLCBsbmc6IDMxLjE3MDMyNTh9O1xuXG4gICAgICAgIC8vIENyZWF0ZSBhIG1hcCBvYmplY3QgYW5kIHNwZWNpZnkgdGhlIERPTSBlbGVtZW50IGZvciBkaXNwbGF5LlxuICAgICAgICB2YXIgbWFwID0gbmV3IGdvb2dsZS5tYXBzLk1hcChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ29vZ2xlLW1hcCcpLCB7XG4gICAgICAgICAgICBjZW50ZXI6IGNlbnRlclVrcmFpbmUsXG4gICAgICAgICAgICBzY3JvbGx3aGVlbDogZmFsc2UsXG4gICAgICAgICAgICB6b29tOiA2XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHNldE1hcE1hcmtlcnMobWFwKTtcbiAgICB9XG5cbiAgICB3aW5kb3cuaW5pdE1hcCA9IGluaXRNYXA7XG59KCkpO1xuIiwiKGZ1bmN0aW9uICh3aW5kb3cpIHtcbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgdmFyIGRlcHRoLCBpLCBsYXllciwgbGF5ZXJzLCBsZW4sIG1vdmVtZW50LCB0b3BEaXN0YW5jZSwgdHJhbnNsYXRlM2Q7XG5cbiAgICAgICAgdG9wRGlzdGFuY2UgPSB0aGlzLnBhZ2VZT2Zmc2V0O1xuICAgICAgICBsYXllcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS10eXBlPVwicGFyYWxsYXhcIl0nKTtcblxuICAgICAgICBmb3IgKGkgPSAwLCBsZW4gPSBsYXllcnMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgIGxheWVyID0gbGF5ZXJzW2ldO1xuICAgICAgICAgICAgZGVwdGggPSBsYXllci5nZXRBdHRyaWJ1dGUoJ2RhdGEtZGVwdGgnKTtcbiAgICAgICAgICAgIG1vdmVtZW50ID0gLSh0b3BEaXN0YW5jZSAqIGRlcHRoKTtcbiAgICAgICAgICAgIHRyYW5zbGF0ZTNkID0gJ3RyYW5zbGF0ZTNkKDAsICcgKyBtb3ZlbWVudCArICdweCwgMCknO1xuICAgICAgICAgICAgbGF5ZXIuc3R5bGVbJy13ZWJraXQtdHJhbnNmb3JtJ10gPSB0cmFuc2xhdGUzZDtcbiAgICAgICAgICAgIGxheWVyLnN0eWxlWyctbW96LXRyYW5zZm9ybSddID0gdHJhbnNsYXRlM2Q7XG4gICAgICAgICAgICBsYXllci5zdHlsZVsnLW1zLXRyYW5zZm9ybSddID0gdHJhbnNsYXRlM2Q7XG4gICAgICAgICAgICBsYXllci5zdHlsZVsnLW8tdHJhbnNmb3JtJ10gPSB0cmFuc2xhdGUzZDtcbiAgICAgICAgICAgIGxheWVyLnN0eWxlLnRyYW5zZm9ybSA9IHRyYW5zbGF0ZTNkO1xuICAgICAgICB9XG4gICAgfSk7XG59KHdpbmRvdykpOyJdfQ==

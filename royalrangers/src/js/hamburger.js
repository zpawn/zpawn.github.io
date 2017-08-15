(function ($) {
    "use strict";

    $(document).ready(function () {

        $('.hamburger').click(function () {
            toggleMenu();
        });

        $(document).on('keyup', function (e) {
            if (e.keyCode === 27 && $(document.body).hasClass('menu-content-open')) {
                toggleMenu();
            }
        });
    });

    function toggleMenu () {
        $('.hamburger').toggleClass('open');
        $('.menu-content').toggleClass('open');
        $(document.body).toggleClass('menu-content-open');
    }
}(jQuery));

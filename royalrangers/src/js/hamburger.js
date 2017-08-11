(function ($) {
    "use strict";

    $(document).ready(function(){
        $('.hamburger').click(function(){
            $(this).toggleClass('open');
        });
    });
}(jQuery));

(function ($) {
    "use strict";

    function Menu () {

        var _menu,
            $content = $('#menuContent'),
            $btn = $('#menuBtn'),
            $menu = $('#menu'),
            $body = $(document.body),
            _activeMenu = 'menu',
            _prevActiveMenu,
            _isOpenMenu = false;

        return {
            init: function () {
                _menu = this;
                _menu._eventListeners();
                return _menu;
            },

            _eventListeners: function () {

                $btn.on('click', function (e) {
                    _menu.showMenu();
                });

                $content.on('click', $menu, function (e) {
                    var active = $(e.target).data('target');
                    if (active !== undefined && active.length) {
                        _menu.setActiveMenu(active);
                    }
                });

                $body.on('keyup', function (e) {
                    if (e.keyCode === 27 && $(document.body).hasClass('menu-content-open')) {
                        _menu.showMenu();
                    }
                });
            },

            setActiveMenu: function (active) {
                _prevActiveMenu = _activeMenu;
                _activeMenu = active;
                _menu.showMenuContent();
            },

            showMenu: function () {

                if (_activeMenu === 'menu') {
                    $btn.toggleClass('open');
                    $body.toggleClass('menu-content-open');
                    $content.toggleClass('open');
                } else {
                    _menu.setActiveMenu('menu');
                }

                _menu.showMenuContent();
            },

            showMenuContent: function () {
                if (_activeMenu !== 'menu') {
                    $btn.addClass('back');
                } else {
                    $btn.removeClass('back');
                }

                $content.find('#' + _prevActiveMenu).removeClass('active');
                $content.find('#' + _activeMenu).addClass('active');
            }
        };
    }

    window.Menu = Menu;
}(jQuery));
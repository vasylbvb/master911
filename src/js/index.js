import jQuery from 'jquery';
import popper from 'popper.js';
import bootstrap from 'bootstrap';

jQuery(function($) {
    //Scrollspy for changing header
    window.onscroll = function() { listenToScroll() };
    const header = $('header.main-nav');
    const sticky = header.scrollTop() + 70;

    function listenToScroll() {
        if (window.pageYOffset > sticky) {
            header.addClass("scrolled");
        } else {
            header.removeClass("scrolled");
        }
    }

    //Header Location Dropdown
    var locationArr = $("#locModal .dropdown-item");
    $(locationArr).each(function() {
        $(this).text($(this).data("name"));
    });

    $(locationArr).click(function(e) {
        e.preventDefault();
        $(locationArr).removeClass("active");
        $(this).addClass("active");
        $("#dropdownLocBtn").find(".text").text($(this).text());
        $(".navbar-location__btn").find(".text").text($(this).text());
    });

    //Header Language Dropdown
    var languageArr = $(".navbar-lang .dropdown-item");

    $(languageArr).click(function(e) {
        e.preventDefault();
        $(languageArr).removeClass("active");
        $(this).addClass("active");
        $("#dropdownLang").find(".text").text($(this).text());
    });

    //footer menus toggle
    var $width = $(window).width();

    if ($width < 992) {
        var footerTitles = $(".footer-menu__title");
        $(footerTitles).click(function(e) {
           e.preventDefault();
            $(this).parent(".footer-menu").toggleClass("opened");
        });

        /*Service steps mobile expanding*/
        var serviseSteps = $(".block-order-steps__step");
        $(serviseSteps).click(function(e) {
            e.preventDefault();
            $(serviseSteps).removeClass("opened");
            $(this).addClass("opened");
        });
    }

    $(window).resize(function(){
        var $width = $(window).width();
        if ($width < 992) {
            var footerTitles = $(".footer-menu__title");
            var footerMenus = $(".footer-menu");
            $(footerMenus).removeClass("opened");
            $(footerTitles).click(function(e) {
                e.preventDefault();
                $(this).parent(".footer-menu").toggleClass("opened");
            });
        }
    });
});
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
    var locationArr = $(".navbar-location .dropdown-item");
    $(locationArr).each(function() {
        $(this).text($(this).data("name"));
    });

    $(locationArr).click(function(e) {
        e.preventDefault();
        $(locationArr).removeClass("active");
        $(this).addClass("active");
        $("#dropdownLocBtn").find(".text").text($(this).text());
    });
});
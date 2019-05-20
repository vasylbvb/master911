import jQuery from 'jquery';
import popper from 'popper.js';
import bootstrap from 'bootstrap';
import slick from 'slick-carousel';
import "jquery-ui/ui/core";
import "jquery-ui/ui/widget";
import "jquery-ui/ui/widgets/autocomplete";
import "jquery-ui/ui/widgets/datepicker";
import "jquery-ui/ui/i18n/datepicker-uk";
import locations from "../js/dbs/locations.json";
import services from "../js/dbs/services.json";

jQuery(function ($) {
    //Scrollspy for changing header
    window.onload = function () {
        listenToScroll()
    };
    window.onscroll = function () {
        listenToScroll()
    };
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

    /*$('#locModal').on('hide.bs.modal', function (e) {
     var getLocInpVal = $(this).find('input[type="text"]').val();
     if ( getLocInpVal != 0 ) {
     $(".navbar-location__btn").find(".text").text(getLocInpVal);
     }
     });*/
    // var locationArr = $("#locModal .dropdown-item");
    // $(locationArr).each(function() {
    //     $(this).text($(this).data("name"));
    // });
    //
    // $(locationArr).click(function(e) {
    //     e.preventDefault();
    //     $(locationArr).removeClass("active");
    //     $(this).addClass("active");
    //     $("#dropdownLocBtn").find(".text").text($(this).text());
    //     $(".navbar-location__btn").find(".text").text($(this).text());
    // });

    //Header Language Dropdown
    var languageArr = $(".navbar-lang .dropdown-item");

    $(languageArr).click(function (e) {
        e.preventDefault();
        $(languageArr).removeClass("active");
        $(this).addClass("active");
        $("#dropdownLang").find(".text").text($(this).text());
        $("#dropdownLang2").find(".text").text($(this).text());
    });

    //Location input autocomplete functions start
    // Highlight matched text
    $.widget("app.autocomplete", $.ui.autocomplete, {

        // Which class get's applied to matched text in the menu items.

        _renderItem: function (ul, item) {

            // Replace the matched text with a custom span. This
            // span uses the class found in the "highlightClass" option.
            var re = new RegExp("(" + this.term + ")", "gi"),
                cls = this.options.highlightClass,
                template = "<span class='" + cls + "'>$1</span>",
                label = item.label.replace(re, template),
                $li = $("<li/>").appendTo(ul);

            // Create and return the custom menu item content.
            $("<span/>").html(label).appendTo($li);

            return $li;

        }
    });

    function searchInpFunc(input) {
        $(input).on("input focus", function (e) {
            var clearBtn = $(this).siblings(".clear-input");
            if ($(this).val() != 0) {
                $(clearBtn).show();
                $(clearBtn).click(function (e) {
                    e.preventDefault();
                    $(this).siblings(input).val('');
                    $(this).hide();
                });
            } else {
                $(clearBtn).hide();
            }
        });

        $(input).parents(".region-search").on("blur", function (e) {
            $(this).find(".clear-input").hide();
        });
    }

    var myInpNav = $("#s-nav-loc"),
        myInp = $("#s-loc"),
        myInpOrder = $("#s-order-loc"),
        searchServ = $("#serv-search"),
        searchServBig = $("#serv-search-big");


    $(myInpNav).autocomplete({
        source: locations.locations,
        highlightClass: "auto-matches",
        open: function () {
            $("ul.ui-menu").width($(this).innerWidth());
        },
        select: function (event, ui) {
            var checkInpVal = $(myInpNav).val(ui.item.value);
            $(myInpNav).attr("value", ui.item.value);
            if ($(checkInpVal) != 0) {
                $(".navbar-location__btn").find(".text").html(ui.item.value);
            }
            $("#contactModal").find("#s-order-loc").val(ui.item.value).attr("value", ui.item.value);
            $("#locModal").modal("hide");
            $("#contactModal").modal("show");
        }
    });

    $(myInp).autocomplete({
        source: locations.locations,
        highlightClass: "auto-matches",
        open: function () {
            $("ul.ui-menu").width($(this).innerWidth());
        },
        select: function (event, ui) {
            var checkInpVal = $(myInp).val(ui.item.value);
            $(myInp).attr("value", ui.item.value);
            $("#contactModal").find("#s-order-loc").val(ui.item.value).attr("value", ui.item.value);
            $("#contactModal").modal("show");
        }
    });

    $(myInpOrder).autocomplete({
        source: locations.locations,
        highlightClass: "auto-matches",
        open: function () {
            $("ul.ui-menu").width($(this).innerWidth());
        },
        select: function (event, ui) {
            var checkInpVal = $(myInpOrder).val(ui.item.value);
            $(myInpOrder).attr("value", ui.item.value);
        }
    });

    $(searchServ).autocomplete({
        source: services.services,
        highlightClass: "auto-matches",
        open: function () {
            $("ul.ui-menu").width($(this).innerWidth());
        },
        select: function (event, ui) {
            $(searchServ).val(ui.item.value);
            $(searchServ).attr("value", ui.item.value);
            $("#contactModal").find("#chosen-service").val(ui.item.value).attr("value", ui.item.value);
            $("#searchModal").modal("hide");
            $("#contactModal").modal("show");
        }
    });

    $(searchServBig).autocomplete({
        source: services.services,
        highlightClass: "auto-matches",
        open: function () {
            $("ul.ui-menu").width($(this).innerWidth());
        },
        select: function (event, ui) {
            $(searchServBig).val(ui.item.value);
            $(searchServBig).attr("value", ui.item.value);
            $("#contactModal").find("#chosen-service").val(ui.item.value).attr("value", ui.item.value);
            $(searchServBig).siblings("button").attr("data-target", "#contactModal");
        }
    });

    searchInpFunc(myInpNav);
    searchInpFunc(myInp);
    searchInpFunc(myInpOrder);
    searchInpFunc(searchServ);
    //Location input autocomplete functions end

    //toggle services sublists in services modal
    var servExpand = $(".modal-serv .has-children .text");
    $(servExpand).click(function (e) {
        e.preventDefault();
        $(this).parents(".has-children").toggleClass("opened");
    });

    //slide modal columns on mobile
    var servTabLinks = $(".modal-serv .nav-tabs .nav-link");
    $(servTabLinks).click(function () {
        $(this).parents(".row").addClass("slided");
    });

    var servBackBtn = $(".modal-serv__back-btn");
    $(servBackBtn).click(function () {
        $(this).parents(".row").removeClass("slided");
    });

    //toggle region lists
    var listHasChild = $(".block-regions li.has-children");
    $(listHasChild).find(".text").click(function () {
        $(listHasChild).find(".text").not($(this)).parents(".has-children").removeClass('opened');
        $(this).parents(".has-children").toggleClass("opened");
    });

    //hero block badges functionality
    $(".hero-inner__tags-line button").click(function (e) {
        e.preventDefault();
        var badgeText = $(this).text();
        $("#contactModal").find("#chosen-service").val(badgeText).attr("value", badgeText);
        $("#contactModal").modal("show");
    });

    //services links modal functionality
    var servModalLinks = $(".modal-serv__list--common > li").not(".has-children").find("a");
    $(servModalLinks).click(function (e) {
        $("#contactModal").find("#chosen-service").val($(this).text()).attr("value", $(this).text());
        $("#servicesModal").modal("hide");
        $("#contactModal").modal("show");
    });

    var servModalLinks2 = $(".modal-serv__list--common > .has-children .sublist").find("a");
    $(servModalLinks2).click(function (e) {
        $("#contactModal").find("#chosen-service").val($(this).text()).attr("value", $(this).text());
        $("#servicesModal").modal("hide");
        $("#contactModal").modal("show");
    });

    //pricelist buttons functionality
    var priceListBtn = $(".m-card-table .item-btn .m-btn");
    $(priceListBtn).click(function (e) {
        e.preventDefault();
        var priceListItem = $(this).parents(".item-btn").siblings(".item-name").find("a").text();
        $("#contactModal").find("#chosen-service").val(priceListItem).attr("value", priceListItem);
        $("#contactModal").modal("show");
    });

    var priceListLinks = $(".m-card-table .item-name a");
    $(priceListLinks).click(function (e) {
        e.preventDefault();
        $("#contactModal").find("#chosen-service").val($(this).text()).attr("value", $(this).text());
        $("#contactModal").modal("show");
    });

    //regions links functionality
    var regionLinks = $(".block-regions__list--main .sublist li").find("a");
    $(regionLinks).click(function (e) {
        $("#contactModal").find("#s-order-loc").val($(this).text()).attr("value", $(this).text());
        $("#contactModal").modal("show");
    });

    var regionLinks2 = $(".block-regions__list--common .sublist li").find("a");
    $(regionLinks2).click(function (e) {
        $("#contactModal").find("#s-order-loc").val($(this).text()).attr("value", $(this).text());
        $("#contactModal").modal("show");
    });

    //toggle pricelist
    $(".m-card-vertical-v2").click(function (e) {
        e.preventDefault();
        $(".m-card-vertical-v2").not($(this)).removeClass("opened");
        $(this).toggleClass("opened");
        var headerHeight = $("header.main-nav").height();
        if ($(this).hasClass("opened")) {
            $('html,body').animate({scrollTop: $(this).siblings(".m-card-table").offset().top - headerHeight}, 500);
        }
    });

    //Initialize tooltips
    $('[data-toggle="tooltip"]').tooltip();

    //Initialize datepicker
    $("#client-date").datepicker($.datepicker.regional["uk"]).datepicker("option", "minDate", new Date());

    /*Contact form validation START*/
    $('#contactModal [type="submit"]').click(function (e) {
        e.preventDefault();

        var nameReg = /^[A-Za-z\u0400-\u04FF]+$/;
        var numberReg = /^[0-9]+$/;
        //var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;

        var clientName = $('#client-name');
        var clientPhone = $('#client-phone');
        var clientLocs = $('#s-order-loc');
        var clientDate = $('#client-date');
        var clientTime = $('#client-time');
        var clientAgree = $('#client-agree');
        var clientService = $('#chosen-service');

        var inputs = [clientName, clientPhone, clientLocs, clientDate, clientTime, clientAgree, clientService];

        var inputMessage = ["Введіть правильні дані", "Виберіть дату", "Виберіть час"];

        $('#contactModal .error').remove();
        $('#contactModal .form-group').removeClass('has-error');

        // if(inputs[0].val() == ""){
        //     var errMsg = $('<span></span>').addClass("error").text(inputMessage[0]);
        //     $(inputs[0]).parents(".form-group").addClass("has-error").append(errMsg);
        // } else if(!nameReg.test(inputs[0].val())){
        //     var errMsg = $('<span></span>').addClass("error").text(inputMessage[0]);
        //     $(inputs[0]).parents(".form-group").addClass("has-error").append(errMsg);
        // }

        if (inputs[1].val() == "") {
            var errMsg = $('<span></span>').addClass("error").text(inputMessage[0]);
            $(inputs[1]).parents(".form-group").addClass("has-error").append(errMsg);
        } else if (!numberReg.test(inputs[1].val())) {
            var errMsg = $('<span></span>').addClass("error").text(inputMessage[0]);
            $(inputs[1]).parents(".form-group").addClass("has-error").append(errMsg);
        }

        // if(inputs[2].val() == ""){
        //     var errMsg = $('<span></span>').addClass("error").text(inputMessage[0]);
        //     $(inputs[2]).parents(".form-group").addClass("has-error").append(errMsg);
        // }

        // if(inputs[3].val() == ""){
        //     var errMsg = $('<span></span>').addClass("error").text(inputMessage[1]);
        //     $(inputs[3]).parents(".form-group").addClass("has-error").append(errMsg);
        // }

        // if(inputs[4].val() == ""){
        //     var errMsg = $('<span></span>').addClass("error").text(inputMessage[2]);
        //     $(inputs[4]).parents(".form-group").addClass("has-error").append(errMsg);
        // }

        if ($('#contactModal .error').length == 0) {
            //$('#contactModal form')[0].submit(); /*activate in production*/
            $("#contactModal").modal('hide');
            /*deactivate in production*/
            $("#successModal").modal('show');
        } else {
            return false;
        }
    });
    /*Contact form validation END*/

    /*Success modal START*/
    $("#successModal").on('show.bs.modal', function () {
        var infoName = $("#infoName"),
            infoLoc = $("#infoLoc"),
            infoTime = $("#infoTime"),
            infoDate = $("#infoDate"),
            infoPhone = $("#infoPhone"),
            clientName = $("#client-name").val(),
            clientLoc = $("#s-order-loc").attr('value'),
            clientTime = $("#client-time").val(),
            clientDate = $("#client-date").val(),
            clientPhone = $("#client-phone").val();

        if (clientName != "") {
            $(infoName).html(clientName + ', ');
        }

        if ($(clientLoc).end().length >= 1) {
            $(infoLoc).html(' в ' + clientLoc);
        }

        if (clientTime != "") {
            $(infoTime).html(' на ' + clientTime);
        }

        if (clientDate != "") {
            $(infoDate).html(' ' + clientDate);
        }

        if (clientPhone != "") {
            $(infoPhone).html('Ваш телефон ' + clientPhone + '.');
        }

        console.log($(clientLoc));
    });
    /*Success modal END*/

    /*Sliders start*/
    //orders slider
    var orderEther = $("#orderEther"),
        counterEther = $(".order-slider__nav-counter");
    $(orderEther).on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
        //currentSlide is undefined on init -- set it to 0 in this case (currentSlide is 0 based)
        var i = (currentSlide ? currentSlide : 0) + 1;
        $(counterEther).html('<span class="m-text-red">' + i + '</span>/' + slick.slideCount);
    });

    $(orderEther).slick({

        infinite: true,
        slidesToShow: 3,
        autoplay: false,
        arrows: true,
        prevArrow: '.order-slider__nav-prev',
        nextArrow: '.order-slider__nav-next',

        responsive: [{

            breakpoint: 992,
            settings: {
                slidesToShow: 1.5
            }

        }, {

            breakpoint: 768,
            settings: {
                slidesToShow: 1
            }

        }, {

            breakpoint: 300,
            settings: "unslick" // destroys slick

        }]
    });

    //feedback slider
    var feedbackSlider = $("#feedbackSlider"),
        counterFeedbacks = $(".block-feedback__slider-nav-counter");
    $(feedbackSlider).on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
        //currentSlide is undefined on init -- set it to 0 in this case (currentSlide is 0 based)
        var i = (currentSlide ? currentSlide : 0) + 1;
        $(counterFeedbacks).html('<span class="m-text-red">' + i + '</span>/' + slick.slideCount);
    });

    $(feedbackSlider).slick({

        infinite: true,
        slidesToShow: 1,
        autoplay: false,
        arrows: true,
        prevArrow: '.block-feedback__slider-nav-prev',
        nextArrow: '.block-feedback__slider-nav-next'

    });
    /*Sliders end*/

    //Video modal Start
    $(".block-feedback__decor-btn.video").click(function () {
        var getSrc = $(this).attr("data-link");
        $("#videoModal").on('show.bs.modal', function () {
            $(this).find("iframe").attr("src", getSrc);
        });
    });

    $("#videoModal").on('hide.bs.modal', function () {
        $(this).find("iframe").removeAttr("src");
    });
    //Video modal End

    //Audio modal Start
    $(".block-feedback__decor-btn.audio").click(function () {
        var getSrc = $(this).attr("data-link");
        $("#audioModal").on('show.bs.modal', function () {
            $(this).find("source").attr("src", getSrc);
        });
    });

    $("#audioModal").on('hide.bs.modal', function () {
        $(this).find("source").removeAttr("src");
    });
    //Audio modal End

    //Upload more pricelist items Start
    $(".m-card-table__footer-btn").click(function (e) {
        e.preventDefault();
        var i,
            visTables = $(this).parents(".m-card-table").find("table.outer:visible").length,
            allTables =$(this).parents(".m-card-table").find("table.outer").length;
        for(i = visTables + 1; i < (visTables + 4); i++) {
            $(this).parents(".m-card-table").find("table.outer:nth-child(" + i +")").css("display", "table");
            if(i == allTables) {
                $(this).hide();
                return false;
            }
        }
    });

    $(".m-card-table__footer-btn-v2").click(function (e) {
        e.preventDefault();
        var i,
            visItems = $(this).parents(".m-card-table").find(".column:visible").length,
            allItems =$(this).parents(".m-card-table").find(".column").length;
        for(i = visItems + 1; i < (visItems + 5); i++) {
            $(this).parents(".m-card-table").find(".column:nth-child(" + i +")").css("display", "inline-block");
            if(i == allItems) {
                $(this).hide();
                return false;
            }
        }
    });
    //Upload more pricelist items End


    //footer menus toggle
    var $width = $(window).width();

    if ($width < 992) {
        var footerTitles = $(".footer-menu__title");
        $(footerTitles).click(function (e) {
            e.preventDefault();
            $(this).parent(".footer-menu").toggleClass("opened");
            if($(this).parent(".footer-menu").hasClass("opened")) {
                $(this).siblings(".footer-menu__list").fadeIn().css("display", "flex");
            } else {
                $(this).siblings(".footer-menu__list").fadeOut();
            }
        });

        /*Service steps mobile expanding*/
        var serviseSteps = $(".block-order-steps__step");
        $(serviseSteps).click(function (e) {
            e.preventDefault();
            $(serviseSteps).removeClass("opened");
            $(this).addClass("opened");
        });

        /*Advantages steps mobile expanding*/
        var advItems = $(".block-advantages__list-item");
        $(advItems).click(function (e) {
            e.preventDefault();
            //$(advItems).removeClass("opened");
            $(this).toggleClass("opened");
        });
    }

    $(window).resize(function () {
        var $width = $(window).width();
        if ($width < 992) {
            // var footerTitles = $(".footer-menu__title");
            // var footerMenus = $(".footer-menu");
            // $(footerMenus).removeClass("opened");
            // $(footerTitles).click(function(e) {
            //     e.preventDefault();
            //     $(this).parent(".footer-menu").toggleClass("opened");
            // });
        }
    });

    $(document).click(function (e) {
        // if the target of the click isn't the container nor a descendant of the container
        // close main menu modal on aside click
        var mMenuBody = $('.main-menu .modal-body'),
            mMenuFooter = $('.main-menu .modal-footer');

        if (!mMenuBody.is(e.target) && mMenuBody.has(e.target).length === 0 && !mMenuFooter.is(e.target) && mMenuFooter.has(e.target).length === 0) {
            $('.modal.main-menu').modal('hide');
        }
    });
});
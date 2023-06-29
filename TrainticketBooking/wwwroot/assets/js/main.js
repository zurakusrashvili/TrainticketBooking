"user strict";


(function ($) {
    'use strict';

    $('#tm_download_btn').on('click', function () {
        var downloadSection = $('#tm_download_section');
        var cWidth = downloadSection.width();
        var cHeight = downloadSection.height();
        var topLeftMargin = 0;
        var pdfWidth = cWidth + topLeftMargin * 2;
        var pdfHeight = pdfWidth * 1.5 + topLeftMargin * 2;
        var canvasImageWidth = cWidth;
        var canvasImageHeight = cHeight;
        var totalPDFPages = Math.ceil(cHeight / pdfHeight) - 1;

        html2canvas(downloadSection[0], {
            allowTaint: true
        }).then(function (
            canvas
        ) {
            canvas.getContext('2d');
            var imgData = canvas.toDataURL('image/png', 1.0);
            var pdf = new jsPDF('p', 'pt', [pdfWidth, pdfHeight]);
            pdf.addImage(
                imgData,
                'PNG',
                topLeftMargin,
                topLeftMargin,
                canvasImageWidth,
                canvasImageHeight
            );
            for (var i = 1; i <= totalPDFPages; i++) {
                pdf.addPage(pdfWidth, pdfHeight);
                pdf.addImage(
                    imgData,
                    'PNG',
                    topLeftMargin, -(pdfHeight * i) + topLeftMargin * 0,
                    canvasImageWidth,
                    canvasImageHeight
                );
            }
            pdf.save('download.pdf');
        });
    });

})(jQuery);



(function ($) {
    'use strict';

    $('#tm_download_btn_ticket').on('click', function () {
        var downloadSection = $('#tm_download_section_ticket');
        var cWidth = downloadSection.width();
        var cHeight = downloadSection.height();
        var topLeftMargin = 0;
        var pdfWidth = cWidth + topLeftMargin * 2;
        var pdfHeight = pdfWidth * 1.5 + topLeftMargin * 2;
        var canvasImageWidth = cWidth;
        var canvasImageHeight = cHeight;
        var totalPDFPages = Math.ceil(cHeight / pdfHeight) - 1;

        html2canvas(downloadSection[0], {
            allowTaint: true
        }).then(function (
            canvas
        ) {
            canvas.getContext('2d');
            var imgData = canvas.toDataURL('image/png', 1.0);
            var pdf = new jsPDF('p', 'pt', [pdfWidth, pdfHeight]);
            pdf.addImage(
                imgData,
                'PNG',
                topLeftMargin,
                topLeftMargin,
                canvasImageWidth,
                canvasImageHeight
            );
            for (var i = 1; i <= totalPDFPages; i++) {
                pdf.addPage(pdfWidth, pdfHeight);
                pdf.addImage(
                    imgData,
                    'PNG',
                    topLeftMargin, -(pdfHeight * i) + topLeftMargin * 0,
                    canvasImageWidth,
                    canvasImageHeight
                );
            }
            pdf.save('download.pdf');
        });
    });

})(jQuery);

$(document).ready(function() {



    //--Owl Carousel--//
    $(".payment__sponsor").owlCarousel({
        loop: true,
        margin: 24,
        autoplayTimeout: 1000,
        autoplay: false,
        nav: true,
        dots: false,
        responsiveClass: true,
        navText: [
            '<i class="material-symbols-outlined">trending_flat</i>',
            '<i class="material-symbols-outlined">trending_flat</i>',
        ],
        responsive: {
            0: {
                items: 1,
            },
            500: {
                items: 1,
            },
            767: {
                items: 1,
            },
            991: {
                items: 1,
            },
            1199: {
                items: 1,
            },
            1399: {
                items: 1,
            },
        },
    });
    $(".promo__sponsor__wrapper").owlCarousel({
        loop: true,
        margin: 10,
        autoplayTimeout: 1000,
        autoplay: false,
        nav: true,
        dots: false,
        responsiveClass: true,
        navText: [
            '<i class="material-symbols-outlined">keyboard_double_arrow_right</i>',
            '<i class="material-symbols-outlined">keyboard_double_arrow_right</i>',
        ],
        responsive: {
            0: {
                items: 1,
            },
            575: {
                items: 1,
            },
            767: {
                items: 2,
            },
            991: {
                items: 3,
            },
            1199: {
                items: 4,
            },
            1499: {
                items: 4,
            },
            1999: {
                items: 4,
            },
        },
    });
    $(".promo__sponsor__wrappertwo").owlCarousel({
        loop: true,
        margin: 10,
        autoplayTimeout: 1000,
        autoplay: false,
        nav: true,
        dots: false,
        responsiveClass: true,
        navText: [
            '<i class="material-symbols-outlined">keyboard_double_arrow_right</i>',
            '<i class="material-symbols-outlined">keyboard_double_arrow_right</i>',
        ],
        responsive: {
            0: {
                items: 1,
            },
            575: {
                items: 1,
            },
            767: {
                items: 1,
            },
            991: {
                items: 2,
            },
            1199: {
                items: 2,
            },
            1499: {
                items: 2,
            },
            1999: {
                items: 2,
            },
        },
    });
    $(".testimoial__wrap").owlCarousel({
        loop: true,
        margin: 0,
        autoplayTimeout: 1000,
        autoplay: false,
        nav: true,
        dots: false,
        responsiveClass: true,
        navText: [
            '<i class="material-symbols-outlined">chevron_right</i>',
            '<i class="material-symbols-outlined">chevron_right</i>',
        ],
        responsive: {
            0: {
                items: 1,
            },
            575: {
                items: 1,
            },
            767: {
                items: 2,
            },
            991: {
                items: 2,
            },
            1199: {
                items: 3,
            },
            1499: {
                items: 3,
            },
            1999: {
                items: 3,
            },
        },
    });
    $(".logo__sponsor").owlCarousel({
        loop: true,
        margin: 24,
        autoplayTimeout: 2000,
        autoplay: true,
        nav: false,
        dots: false,
        responsiveClass: true,
        navText: [
            '<i class="material-symbols-outlined">chevron_right</i>',
            '<i class="material-symbols-outlined">chevron_right</i>',
        ],
        responsive: {
            0: {
                items: 2,
            },
            575: {
                items: 4,
            },
            767: {
                items: 5,
            },
            991: {
                items: 6,
            },
            1199: {
                items: 7,
            },
            1499: {
                items: 7,
            },
            1999: {
                items: 7,
            },
        },
    });
    $(".testimoial__wrap__two").owlCarousel({
        loop: true,
        margin: 0,
        center: true,
        autoplayTimeout: 1000,
        autoplay: false,
        nav: true,
        dots: false,
        responsiveClass: true,
        navText: [
            '<i class="material-symbols-outlined">chevron_right</i>',
            '<i class="material-symbols-outlined">chevron_right</i>',
        ],
        responsive: {
            0: {
                items: 1,
            },
            575: {
                items: 1,
            },
            767: {
                items: 2,
            },
            991: {
                items: 2,
            },
            1199: {
                items: 3,
            },
            1499: {
                items: 3,
            },
            1999: {
                items: 3,
            },
        },
    });
    $(".testimoial__wrap__three").owlCarousel({
        loop: true,
        margin: -10,
        autoplayTimeout: 1000,
        autoplay: false,
        nav: true,
        dots: false,
        responsiveClass: true,
        navText: [
            '<i class="material-symbols-outlined">chevron_right</i>',
            '<i class="material-symbols-outlined">chevron_right</i>',
        ],
        responsive: {
            0: {
                items: 1,
            },
            575: {
                items: 1,
            },
            767: {
                items: 2,
            },
            991: {
                items: 2,
            },
            1199: {
                items: 2,
            },
            1499: {
                items: 2,
            },
            1999: {
                items: 2,
            },
        },
    });
    $(".testimoial__wrap__swimming").owlCarousel({
        loop: true,
        margin: -10,
        autoplayTimeout: 1000,
        autoplay: false,
        nav: false,
        dots: true,
        responsiveClass: true,
        navText: [
            '<i class="material-symbols-outlined">chevron_right</i>',
            '<i class="material-symbols-outlined">chevron_right</i>',
        ],
        responsive: {
            0: {
                items: 1,
            },
            575: {
                items: 1,
            },
            767: {
                items: 2,
            },
            991: {
                items: 2,
            },
            1199: {
                items: 2,
            },
            1499: {
                items: 2,
            },
            1999: {
                items: 2,
            },
        },
    });
    $(".hotel__pricing__wrapper").owlCarousel({
        loop: true,
        margin: 0,
        autoplayTimeout: 1000,
        autoplay: false,
        nav: false,
        dots: true,
        responsiveClass: true,
        navText: [
            '<i class="material-symbols-outlined">chevron_right</i>',
            '<i class="material-symbols-outlined">chevron_right</i>',
        ],
        responsive: {
            0: {
                items: 1,
            },
            575: {
                items: 1,
            },
            767: {
                items: 2,
            },
            991: {
                items: 1,
            },
            1200: {
                items: 2,
            },
            1499: {
                items: 2,
            },
            1999: {
                items: 2,
            },
        },
    });
    $(".hurray__booking").owlCarousel({
        loop: true,
        margin: 24,
        autoplayTimeout: 1000,
        autoplay: false,
        nav: true,
        dots: false,
        responsiveClass: true,
        navText: [
            '<i class="material-symbols-outlined">chevron_right</i>',
            '<i class="material-symbols-outlined">chevron_right</i>',
        ],
        responsive: {
            0: {
                items: 1,
            },
            500: {
                items: 2,
            },
            767: {
                items: 3,
            },
            991: {
                items: 3,
            },
            1199: {
                items: 4,
            },
            1499: {
                items: 4,
            },
            1999: {
                items: 4,
            },
        },
    });
    $(".hurray__booking2").owlCarousel({
        loop: true,
        margin: 24,
        autoplayTimeout: 1000,
        autoplay: false,
        nav: true,
        dots: false,
        responsiveClass: true,
        navText: [
            '<i class="material-symbols-outlined">chevron_right</i>',
            '<i class="material-symbols-outlined">chevron_right</i>',
        ],
        responsive: {
            0: {
                items: 1,
            },
            500: {
                items: 2,
            },
            767: {
                items: 3,
            },
            991: {
                items: 3,
            },
            1199: {
                items: 4,
            },
            1499: {
                items: 4,
            },
            1999: {
                items: 4,
            },
        },
    });
    $(".hurray__booking__three").owlCarousel({
        loop: true,
        margin: 24,
        autoplayTimeout: 1000,
        autoplay: false,
        nav: true,
        dots: false,
        responsiveClass: true,
        navText: [
            '<i class="material-symbols-outlined">chevron_right</i>',
            '<i class="material-symbols-outlined">chevron_right</i>',
        ],
        responsive: {
            0: {
                items: 1,
            },
            500: {
                items: 2,
            },
            767: {
                items: 3,
            },
            991: {
                items: 4,
            },
            1199: {
                items: 5,
            },
            1499: {
                items: 6,
            },
            1999: {
                items: 6,
            },
        },
    });
    $(".hurray__hotel1").owlCarousel({
        loop: true,
        margin: 24,
        autoplayTimeout: 1000,
        autoplay: false,
        nav: true,
        dots: true,
        responsiveClass: true,
        navText: [
            '<i class="material-symbols-outlined">chevron_right</i>',
            '<i class="material-symbols-outlined">chevron_right</i>',
        ],
        responsive: {
            0: {
                items: 1,
            },
            500: {
                items: 2,
            },
            767: {
                items: 3,
            },
            991: {
                items: 3,
            },
            1199: {
                items: 3,
            },
            1499: {
                items: 3,
            },
            1999: {
                items: 3,
            },
        },
    });
    $(".hotel__qustionslider").owlCarousel({
        loop: true,
        margin: 24,
        autoplayTimeout: 1000,
        autoplay: false,
        nav: true,
        dots: false,
        responsiveClass: true,
        navText: [
            '<i class="material-symbols-outlined">chevron_right</i>',
            '<i class="material-symbols-outlined">chevron_right</i>',
        ],
        responsive: {
            0: {
                items: 1,
            },
            450: {
                items: 2,
            },
            767: {
                items: 2,
            },
            991: {
                items: 2,
            },
            1199: {
                items: 2,
                stagePadding: -50,
            },
            1499: {
                items: 2,
            },
            1999: {
                items: 2,
            },
        },
    });
    $(".hotel__gallerywrap").owlCarousel({
        loop: true,
        margin: 24,
        autoplayTimeout: 1000,
        autoplay: false,
        nav: false,
        stagePadding: 190,
        dots: true,
        responsiveClass: true,
        navText: [
            '<i class="material-symbols-outlined">chevron_right</i>',
            '<i class="material-symbols-outlined">chevron_right</i>',
        ],
        responsive: {
            0: {
                items: 1,
                stagePadding: 60,
            },
            550: {
                items: 3,
                stagePadding: 20,
            },
            767: {
                items: 3,
                stagePadding: 120,
            },
            991: {
                items: 3,
            },
            1199: {
                items: 4,
            },
            1499: {
                items: 4,
            },
            1999: {
                items: 4,
            },
        },
    });
    $(".flight__brachslider").owlCarousel({
        loop: true,
        margin: 24,
        autoplayTimeout: 1000,
        autoplay: false,
        nav: true,
        dots: true,
        responsiveClass: true,
        navText: [
            '<i class="material-symbols-outlined">chevron_right</i>',
            '<i class="material-symbols-outlined">chevron_right</i>',
        ],
        responsive: {
            0: {
                items: 1,
            },
            550: {
                items: 3,
            },
            767: {
                items: 4,
            },
            991: {
                items: 5,
            },
            1199: {
                items: 5,
            },
            1499: {
                items: 6,
            },
            1999: {
                items: 6,
            },
        },
    });
    $(".flight__client__wrap").owlCarousel({
        loop: true,
        margin: 15,
        autoplayTimeout: 1000,
        autoplay: false,
        nav: true,
        dots: false,
        responsiveClass: true,
        navText: [
            '<i class="material-symbols-outlined">chevron_right</i>',
            '<i class="material-symbols-outlined">chevron_right</i>',
        ],
        responsive: {
            0: {
                items: 1,
            },
            500: {
                items: 1,
            },
            767: {
                items: 2,
            },
            991: {
                items: 3,
            },
            1199: {
                items: 3,
            },
            1499: {
                items: 3,
            },
            1999: {
                items: 3,
            },
        },
    });
    $(".carss__testimonial").owlCarousel({
        loop: true,
        margin: 0,
        autoplayTimeout: 1000,
        autoplay: false,
        nav: true,
        dots: false,
        responsiveClass: true,
        navText: [
            '<i class="material-symbols-outlined">chevron_right</i>',
            '<i class="material-symbols-outlined">chevron_right</i>',
        ],
        responsive: {
            0: {
                items: 1,
            },
            500: {
                items: 1,
            },
            767: {
                items: 1,
            },
            991: {
                items: 1,
            },
            1199: {
                items: 1,
            },
            1499: {
                items: 1,
            },
            1999: {
                items: 1,
            },
        },
    });
    $(".blog__related__wrapper").owlCarousel({
        loop: true,
        margin: 15,
        autoplayTimeout: 1000,
        autoplay: false,
        nav: true,
        dots: false,
        responsiveClass: true,
        navText: [
            '<i class="material-symbols-outlined">chevron_right</i>',
            '<i class="material-symbols-outlined">chevron_right</i>',
        ],
        responsive: {
            0: {
                items: 1,
            },
            500: {
                items: 1,
            },
            767: {
                items: 2,
            },
            991: {
                items: 3,
            },
            1199: {
                items: 3,
            },
            1499: {
                items: 3,
            },
            1999: {
                items: 3,
            },
        },
    });
    $(".details__bookslider").owlCarousel({
        items: 4,
        loop: false,
        center: true,
        margin: 10,
        URLhashListener: true,
        autoplayHoverPause: true,
        startPosition: 'URLHash',
        autoplayTimeout: 1000,
        nav: true,
        dots: false,
        responsiveClass: true,
        navText: [
            '<i class="material-symbols-outlined">chevron_right</i>',
            '<i class="material-symbols-outlined">chevron_right</i>',
        ],
        responsive: {
            0: {
                items: 1,
            },
            500: {
                items: 1,
            },
            767: {
                items: 1,
            },
            991: {
                items: 1,
            },
            1199: {
                items: 1,
            },
            1499: {
                items: 1,
            },
            1999: {
                items: 1,
            },
        },
    });



    //--Owl Carousel--//

    //--Header Menu--//
    $(".header-bar").on("click", function(e) {
        $(".main-menu, .header-bar").toggleClass("active");
    });
    $(".main-menu li a").on("click", function(e) {
        var element = $(this).parent("li");
        if (element.hasClass("open")) {
            element.removeClass("open");
            element.find("li").removeClass("open");
            element.find("ul").slideUp(300, "swing");
        } else {
            element.addClass("open");
            element.children("ul").slideDown(300, "swing");
            element.siblings("li").children("ul").slideUp(300, "swing");
            element.siblings("li").removeClass("open");
            element.siblings("li").find("li").removeClass("open");
            element.siblings("li").find("ul").slideUp(300, "swing");
        }
    });
    //menu top fixed bar
    var fixed_top = $(".header-section");
    $(window).on("scroll", function() {
        if ($(this).scrollTop() > 100) {
            fixed_top.addClass("menu-fixed animated fadeInDown");
            fixed_top.removeClass("slideInUp");
            $("body").addClass("body-padding");
        } else {
            fixed_top.removeClass("menu-fixed fadeInDown");
            fixed_top.addClass("slideInUp");
            $("body").removeClass("body-padding");
        }
    });
    //menu top fixed bar
    $(".scrollToTop").on("click", function() {
        $("html, body").animate({
                scrollTop: 0,
            },
            700
        );
        return false;
    });
    //--Header Menu--//

    //--Nice Select--//
    $('select').niceSelect();
    //--Nice Select--//



    // password hide//
    $(".toggle-password, .toggle-password2, .toggle-password3, .toggle-password4, .toggle-password5").click(function() {
        $(this).toggleClass("");
        var input = $($(this).attr("id"));
        if (input.attr("type") == "password") {
            input.attr("type", "text");
        } else {
            input.attr("type", "password");
        }
    });
    // password hide//

    // cart popup //
    // cart
    let quantity = 0;
    let price = 0;
    $(".cart-item-quantity-amount, .product-quant").html(quantity);
    $(".total-price, .product-pri").html(price.toFixed(2));
    $(".cart-increment, .cart-incre").on("click", function() {
        if (quantity <= 4) {
            quantity++;
            $(".cart-item-quantity-amount, .product-quant").html(quantity);
            var basePrice = $(".base-price, .base-pri").text();
            $(".total-price, .product-pri").html((basePrice * quantity).toFixed(2));
        }
    });

    $(".cart-decrement, .cart-decre").on("click", function() {
        if (quantity >= 1) {
            quantity--;
            $(".cart-item-quantity-amount, .product-quant").html(quantity);
            var basePrice = $(".base-price, .base-pri").text();
            $(".total-price, .product-pri").html((basePrice * quantity).toFixed(2));
        }
    });

    $(".cart-item-remove>a").on("click", function() {
        $(this).closest(".cart-item").hide(300);
    });

    // payment method
    var paymentMethod = $("input[name='pay-method']:checked").val();
    $(".payment").html(paymentMethod);
    $(".checkout__radio-single").on("click", function() {
        var paymentMethod = $("input[name='pay-method']:checked").val();
        $(".payment").html(paymentMethod);
    });

    //--Magnifiqpopup--//
    $('.video-btn').magnificPopup({
        type: 'iframe',
        callbacks: {

        }
    });
    //--Magnifiqpopup--//

    //--common filter slide--//
    $(".common__sidebar__head").on("click", function() {
        $(this).next(".common__sidebar__content").slideToggle();
    });
    //--common filter slide--//

    $(function() {
        $("#datepicker, #datepicker2, #datepicker3, #datepicker4, #datepicker5, #datepicker6, #datepicker7, #datepicker8, #datepicker9, #datepicker10, #datepicker11").datepicker({
            autoclose: true,
            todayHighlight: true
        });
    });

    //--Odometer--//
    $(".odometer-item").each(function() {
        $(this).isInViewport(function(status) {
            if (status === "entered") {
                for (
                    var i = 0; i < document.querySelectorAll(".odometer").length; i++
                ) {
                    var el = document.querySelectorAll(".odometer")[i];
                    el.innerHTML = el.getAttribute("data-odometer-final");
                }
            }
        });
    });
    //--Odometer--//

    //--Wow Animation--//
    new WOW().init();
    //--Wow Animation--//

    //--Preloader--//
    setTimeout(function() {
        $('.preloader__wrap').fadeToggle();
    }, 1000);
    //--Preloader--//


    // range sliger
    function getVals() {
        let parent = this.parentNode;
        let slides = parent.getElementsByTagName("input");
        let slide1 = parseFloat(slides[0].value);
        let slide2 = parseFloat(slides[1].value);
        if (slide1 > slide2) {
            let tmp = slide2;
            slide2 = slide1;
            slide1 = tmp;
        }

        let displayElement = parent.getElementsByClassName("rangeValues")[0];
        displayElement.innerHTML = "$" + slide1 + " - $" + slide2;
    }

    window.onload = function() {
        let sliderSections = document.getElementsByClassName("range-slider");
        for (let x = 0; x < sliderSections.length; x++) {
            let sliders = sliderSections[x].getElementsByTagName("input");
            for (let y = 0; y < sliders.length; y++) {
                if (sliders[y].type === "range") {
                    sliders[y].oninput = getVals;
                    sliders[y].oninput();
                }
            }
        }
    }

});


progressBar: () => {
    const pline = document.querySelectorAll(".progressbar.line");
    const pcircle = document.querySelectorAll(".progressbar.semi-circle");
    pline.forEach(e => {
        var line = new ProgressBar.Line(e, {
            strokeWidth: 6,
            trailWidth: 6,
            duration: 3000,
            easing: 'easeInOut',
            text: {
                style: {
                    color: 'inherit',
                    position: 'absolute',
                    right: '0',
                    top: '-30px',
                    padding: 0,
                    margin: 0,
                    transform: null
                },
                autoStyleContainer: false
            },
            step: (state, line) => {
                line.setText(Math.round(line.value() * 100) + ' %');
            }
        });
        var value = e.getAttribute('data-value') / 100;
        new Waypoint({
            element: e,
            handler: function() {
                line.animate(value);
            },
            offset: 'bottom-in-view',
        })
    });
    pcircle.forEach(e => {
        var circle = new ProgressBar.SemiCircle(e, {
            strokeWidth: 6,
            trailWidth: 6,
            duration: 2000,
            easing: 'easeInOut',
            step: (state, circle) => {
                circle.setText(Math.round(circle.value() * 100));
            }
        });
        var value = e.getAttribute('data-value') / 100;
        new Waypoint({
            element: e,
            handler: function() {
                circle.animate(value);
            },
            offset: 'bottom-in-view',
        })
    });
}

const rangeInput = document.querySelectorAll(".range-input input"),
    priceInput = document.querySelectorAll(".price-input input"),
    range = document.querySelector(".slider .progress");
let priceGap = 1000;

priceInput.forEach((input) => {
    input.addEventListener("input", (e) => {
        let minPrice = parseInt(priceInput[0].value),
            maxPrice = parseInt(priceInput[1].value);

        if (maxPrice - minPrice >= priceGap && maxPrice <= rangeInput[1].max) {
            if (e.target.className === "input-min") {
                rangeInput[0].value = minPrice;
                range.style.left = (minPrice / rangeInput[0].max) * 100 + "%";
            } else {
                rangeInput[1].value = maxPrice;
                range.style.right = 100 - (maxPrice / rangeInput[1].max) * 100 + "%";
            }
        }
    });
});

rangeInput.forEach((input) => {
    input.addEventListener("input", (e) => {
        let minVal = parseInt(rangeInput[0].value),
            maxVal = parseInt(rangeInput[1].value);

        if (maxVal - minVal < priceGap) {
            if (e.target.className === "range-min") {
                rangeInput[0].value = maxVal - priceGap;
            } else {
                rangeInput[1].value = minVal + priceGap;
            }
        } else {
            priceInput[0].value = minVal;
            priceInput[1].value = maxVal;
            range.style.left = (minVal / rangeInput[0].max) * 100 + "%";
            range.style.right = 100 - (maxVal / rangeInput[1].max) * 100 + "%";
        }
    });




});
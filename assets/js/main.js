jQuery(function($) {
    'use strict';

    // Mean Menu
    $('.mean-menu').meanmenu({
        meanScreenWidth: '991',
    });
     // Sticky Nav
     $(window).on('scroll', function() {
        $(window).scrollTop() >= 100 ?
        $('.navbar-area').addClass('stickyadd'):
        $('.navbar-area').removeClass('stickyadd');
    });
     // Sticky Nav
     $(window).on('scroll', function() {
        $(window).scrollTop() >= 100 ?
        $('.navbar-area-home').addClass('stickyadd-home'):
        $('.navbar-area-home').removeClass('stickyadd-home');
    });

    // Smooth Scrolling
    $('a.nav-link').on('click', function(e) {
        var $this = $(this);
        $('html, body')
        .stop()
        .animate({
            scrollTop: $($this.attr('href')).offset().top - 60,
        }, 1000 );
        e.preventDefault();
    });

    // Search Popup
    $('.search-btn').on('click', function() {
        $('.search-popup').toggle(300);
    });
    // Popup Video
    $('.youtube-popup').magnificPopup({
        disableOn: 320,
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,
        fixedContentPos: false,
    });

    // Hero Slider
    $('.home-slider').owlCarousel({
        loop: true,
        margin: 0,
        items: 1,
        smartSpeed: 950,
    });

    // Team Slider
    $('.team-slider').owlCarousel({
        loop: false,
        margin: 15,
        autoplay: true,
        autoplayHoverPause: true,
        autoplayTimeout: 8500,
        smartSpeed: 450,
        responsiveClass: true,
        responsive: {
            0: {
                items: 1,
            },
            576: {
                items: 2,
            },
            768: {
                items: 2,
            },
            1000: {
                items: 3,
            },
            1400: {
                items: 4
            }
        },
    });

    // Gallery Slider
    $('.gallery-slider').owlCarousel({
        loop: false,
        margin: 20,
        autoplay: true,
        autoplayHoverPause: true,
        autoplayTimeout: 8500,
        smartSpeed: 450,
        responsiveClass: true,
        responsive: {
            0: {
                items: 1,
            },
            576: {
                items: 2,
            },
            768: {
                items: 3,
            },
            1000: {
                items: 3,
            },
        },
    });

    // Testimonial Slider
    let testimonialSlider = $('.testimonial-slider').owlCarousel({
        items: 3,
        dots: true,
        margin: 10,
        responsiveClass: true,
        responsive: {
            0: {
                items: 1,
            },
            576: {
                items: 1,
            },
            768: {
                items: 1,
            },
            1000: {
                items: 1,
            },
        },
    });
    $('.dot').on('click', function() {
        testimonialSlider.trigger('to.owl.carousel', [$(this).index(), 300]);
        $('.dot').removeClass('active');
        $(this).addClass('active');
    });

    // Client Slider
    $('.client-slider').owlCarousel({
        loop: true,
        margin: 20,
        items: 1,
        smartSpeed: 950,
    });

    // Partner Slider
    $('.partner-slider').owlCarousel({
        loop: true,
        nav: false,
        dots: false,
        smartSpeed: 2000,
        margin: 30,
        autoplayHoverPause: true,
        autoplay: true,
        responsive: {
            0: {
                items: 2,
            },
            768: {
                items: 3,
            },
            1024: {
                items: 4,
            },
            1200: {
                items: 5,
            },
        },
    });

    // Back To Top
    $('body').append(`<div class='go-top'><i class='envy envy-angle-up'></i></div>`);
    $(window).on('scroll', function() {
        var scrolled = $(window).scrollTop();
        if (scrolled > 600) $('.go-top').addClass('active');
        if (scrolled < 600) $('.go-top').removeClass('active');
    });
    $('.go-top').on('click', function() {
        $('html, body').animate({
            scrollTop: '0',
        }, 500 );
    });

    // Count Time 
    function makeTimer() {
        var endTime = new Date('September 20, 2021 17:00:00 PDT');
        var endTime = (Date.parse(endTime)) / 1000;
        var now = new Date();
        var now = (Date.parse(now) / 1000);
        var timeLeft = endTime - now;
        var days = Math.floor(timeLeft / 86400);
        var hours = Math.floor((timeLeft - (days * 86400)) / 3600);
        var minutes = Math.floor((timeLeft - (days * 86400) - (hours * 3600)) / 60);
        var seconds = Math.floor((timeLeft - (days * 86400) - (hours * 3600) - (minutes * 60)));
        if (hours < '10') {
            hours = '0' + hours;
        }
        if (minutes < '10') {
            minutes = '0' + minutes;
        }
        if (seconds < '10') {
            seconds = '0' + seconds;
        }
        $('#days').html(days + '<span>Days</span>');
        $('#hours').html(hours + '<span>Hours</span>');
        $('#minutes').html(minutes + '<span>Minutes</span>');
        $('#seconds').html(seconds + '<span>Seconds</span>');
    }
    setInterval(function() {
        makeTimer();
    }, 0);

    // Subscribe Form
    $('.newsletter-form').validator().on('submit', function(event) {
        if (event.isDefaultPrevented()) {
            // Handle The Invalid Form...
            formErrorSub();
            submitMSGSub(false, 'Please enter your email correctly.');
        } else {
            // Everything Looks Good!
            event.preventDefault();
        }
    });

    function callbackFunction(resp) {
        if (resp.result === 'success') {
            formSuccessSub();
        } else {
            formErrorSub();
        }
    }

    function formSuccessSub() {
        $('.newsletter-form')[0].reset();
        submitMSGSub(true, 'Thank you for subscribing!');
        setTimeout(function() {
            $('#validator-newsletter').addClass('hide');
        }, 4000)
    }

    function formErrorSub() {
        $('.newsletter-form').addClass('animated shake');
        setTimeout(function() {
            $('.newsletter-form').removeClass('animated shake');
        }, 1000)
    }

    function submitMSGSub(valid, msg) {
        if (valid) {
            var msgClasses = 'validation-success';
        } else {
            var msgClasses = 'validation-danger';
        }
        $('#validator-newsletter').removeClass().addClass(msgClasses).text(msg);
    }

    // AJAX MailChimp
    $('.newsletter-form').ajaxChimp({
        url: 'https://hibootstrap.us20.list-manage.com/subscribe/post?u=60e1ffe2e8a68ce1204cd39a5&amp;id=42d6d188d9', // Your url MailChimp
        callback: callbackFunction
    });

    // Preloader
    $(window).on('load', function(e) {
        $('.preloader-main')
        .delay(2000)
        .queue(function() {
            $(this).remove();
        });
    });


// open video testimonial

var iframeVideo = $(".video-popup__iframe");
var innerVideo = $(".video-popup__inner");
$("html").on("click", ".openVideo", function (e) {
  innerVideo = $(".video-popup__inner");
  var link = $(this).attr("data-link"); // console.log(iframeVideo);

  var settings = "?autoplay=1&rel=0&enablejsapi=1&playerapiid=ytplayer";
  var id = /\w+$/i.exec(link)[0];
  iframeVideo.attr("src", "https://www.youtube.com/embed/" + id + settings);
  $(".video-popup").fadeIn();
  var wWrapper = innerVideo.width();
  innerVideo.height(wWrapper * 9 / 16);
});
$(".closeVideo").on("click", function (e) {
  iframeVideo.attr("src", "");
  $(".video-popup").fadeOut();
});
$(window).resize(function (e) {
  var w = $("body").width();
  var wWrapper = innerVideo.width();
  innerVideo.height(wWrapper * 9 / 16);
});

 

}(jQuery));


// gallery section
function myImageFunction(productSmallImg) {
   
    var productFullImg = document.getElementById("img-Box");
    productFullImg.src = productSmallImg.src;
    // productSmallImg.classList.replac("activeImg");
   
        
   
    
}




function myImageFunctionAfter(productSmallImgAfter) {
   
    var productFullImgAfter = document.getElementById("img-Box-after");
    productFullImgAfter.src = productSmallImgAfter.src;
   
  
}
// gallery section after
const imageAfter = document.getElementById('img-Box');
const canselPopup = document.getElementById('cross-cancel')
const appDetail = document.getElementById('appDetailAfter')
imageAfter.addEventListener('click', ()=>{
 appDetail.style.display = "block";
 document.getElementById('toolsafter').style.display = 'none';
 document.getElementById('footerafter').style.display = 'none';
})
canselPopup.addEventListener('click', ()=>{
 appDetail.style.display = "none";
 document.getElementById('toolsafter').style.display = 'block';
 document.getElementById('footerafter').style.display = 'block';
})


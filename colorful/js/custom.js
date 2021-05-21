"use strict";
$(document).ready(function() {
    $("select").niceSelect();


    /*>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
        Counter Up Activation
    <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<*/
    $('.counter').counterUp({
        delay: 10,
        time: 1000
    });
    /*>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
        Fancybox Activation
    <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<*/


    if (jQuery(".popup-btn").length > 0) {
        $("a.popup-btn").fancybox({
            'transitionIn': 'elastic',
            'transitionOut': 'elastic',
            'speedIn': 600,
            'speedOut': 200
        });
    }

    if (jQuery(".popup-img").length > 0) {
        $("a.popup-img").fancybox({
            'transitionIn': 'elastic',
            'transitionOut': 'elastic',
            'speedIn': 600,
            'speedOut': 200
        });
    }
    /*>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
        AOS Animation Activation
    <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<*/
    AOS.init();
    window.addEventListener("load", AOS.refresh);

    /*>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
        Slick Slider Activation
    <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<*/
    if (jQuery(".testimonial-slider--l1").length > 0) {
        $(".testimonial-slider--l1").slick({
            dots: false,
            infinite: true,
            speed: 900,
            slidesToShow: 3,
            slidesToScroll: 1,
            arrows: false,
            responsive: [{
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                    },
                },
                {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                    },
                },
            ],
        });
    }
    if (jQuery(".testimonial-slider--l4").length > 0) {
        $(".testimonial-slider--l4").slick({
            dots: false,
            infinite: true,
            speed: 900,
            slidesToShow: 4,
            slidesToScroll: 2,
            arrows: false,
            responsive: [{
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3,
                    },
                },
                {
                    breakpoint: 991,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                    },
                },
                {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                    },
                },
            ],
        });

    }
    if (jQuery(".testimonial-slider--inner-2").length > 0) {
        $(".testimonial-slider--inner-2").slick({
            dots: false,
            infinite: true,
            speed: 900,
            rows: 2,
            slidesToShow: 3,
            slidesToScroll: 1,
            arrows: true,
            appendArrows: ".testimonial-btn",
            prevArrow: "<button><i class='fas fa-arrow-left'></i></button>",
            nextArrow: "<button><i class='fas fa-arrow-right'></i></button>",
            responsive: [{
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3,
                    },
                },
                {
                    breakpoint: 991,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                    },
                },
                {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                    },
                },
            ],
        });

    }
    if (jQuery(".testimonial-slider--l8").length > 0) {
        $(".testimonial-slider--l8").slick({
            dots: false,
            infinite: true,
            speed: 900,
            slidesToShow: 4,
            slidesToScroll: 2,
            arrows: true,
            appendArrows: ".testimonial-btn",
            prevArrow: "<button><i class='fas fa-arrow-left'></i></button>",
            nextArrow: "<button><i class='fas fa-arrow-right'></i></button>",
            responsive: [{
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3,
                    },
                },
                {
                    breakpoint: 991,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                    },
                },
                {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                    },
                },
            ],
        });

    }
    if (jQuery(".portfolio-details-slider").length > 0) {
        $(".portfolio-details-slider").slick({
            infinite: true,
            speed: 900,
            slidesToShow: 3,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 2000,
            arrows: false,
            draggable: true,
            dots: true,
            lazyLoad: 'ondemand',
            dotsClass: "portfolio-details-dots",
            responsive: [{
                    breakpoint: 991,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1,
                    },
                },
                {
                    breakpoint: 450,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                    },
                },
            ],
        });

    }

    if (jQuery(".testimonial-slider--l9").length > 0) {
        $(".testimonial-slider--l9").slick({
            dots: false,
            infinite: true,
            autoplay: true,
            speed: 900,
            slidesToShow: 3,
            slidesToScroll: 1,
            arrows: true,
            appendArrows: ".testimonial-btn",
            prevArrow: "<button><i class='fas fa-arrow-left'></i></button>",
            nextArrow: "<button><i class='fas fa-arrow-right'></i></button>",
            responsive: [{
                    breakpoint: 1199,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                    },
                },
                {
                    breakpoint: 991,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                    },
                },
                {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                    },
                },
            ],
        });

    }
    if (jQuery(".testimonial-slider--l7").length > 0) {
        $('.testimonial-slider--l7').slick({
            centerMode: true,
            centerPadding: '180px',
            slidesToShow: 3,
            dots: true,
            arrows: false,
            responsive: [{
                    breakpoint: 1200,
                    settings: {
                        arrows: false,
                        centerMode: true,
                        centerPadding: '40px',
                        slidesToShow: 2
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        arrows: false,
                        centerMode: true,
                        centerPadding: '40px',
                        slidesToShow: 2
                    }
                },
                {
                    breakpoint: 700,
                    settings: {
                        arrows: false,
                        centerMode: true,
                        centerPadding: '40px',
                        slidesToShow: 1
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        arrows: false,
                        centerMode: false,
                        centerPadding: '40px',
                        slidesToShow: 1,
                        dots: true,
                    }
                }
            ]
        });

    }

    $(window).on('load resize orientationchange', function() {
        $(".testimonial-mobile-slider--l3").each(function() {
            var $carousel = $(this);
            /* Initializes a slick carousel only on mobile screens */
            // slick on mobile
            if ($(window).width() > 973) {
                if ($carousel.hasClass("slick-initialized")) {
                    $carousel.slick("unslick");
                }
            } else {
                if (!$carousel.hasClass("slick-initialized")) {
                    $carousel.slick({
                        slidesToShow: 2,
                        speed: 800,
                        slidesToScroll: 1,
                        arrows: false,
                        dots: true,
                        autoplay: true,
                        autoplaySpeed: 3000,
                        responsive: [{
                            breakpoint: 768,

                            settings: {
                                slidesToShow: 1,
                                slidesToScroll: 2,
                            },
                        }, ],
                    });
                }
            }
        });
    });
    $(window).on('load resize orientationchange', function() {
        $(".testimonial-mobile-slider--l3").each(function() {
            var $carousel = $(this);
            /* Initializes a slick carousel only on mobile screens */
            // slick on mobile
            if ($(window).width() > 973) {
                if ($carousel.hasClass("slick-initialized")) {
                    $carousel.slick("unslick");
                }
            } else {
                if (!$carousel.hasClass("slick-initialized")) {
                    $carousel.slick({
                        rows: 2,
                        slidesToShow: 2,
                        speed: 800,
                        slidesToScroll: 1,
                        arrows: false,
                        dots: true,
                        autoplay: true,
                        autoplaySpeed: 3000,
                        responsive: [{
                            breakpoint: 768,

                            settings: {
                                slidesToShow: 1,
                                slidesToScroll: 2,
                            },
                        }, ],
                    });
                }
            }
        });
    });

    $(window).on('load resize orientationchange', function() {
        $(".testimonial--mobile-slider--l5").each(function() {
            var $carousel = $(this);
            /* Initializes a slick carousel only on mobile screens */
            // slick on mobile
            if ($(window).width() > 1199) {
                if ($carousel.hasClass("slick-initialized")) {
                    $carousel.slick("unslick");
                }
            } else {
                if (!$carousel.hasClass("slick-initialized")) {
                    $carousel.slick({
                        slidesToShow: 2,
                        speed: 800,
                        slidesToScroll: 1,
                        arrows: false,
                        dots: false,
                        autoplay: true,
                        autoplaySpeed: 3000,
                        responsive: [{
                                breakpoint: 1199,

                                settings: {
                                    slidesToShow: 2,
                                    slidesToScroll: 2,
                                },
                            },
                            {
                                breakpoint: 768,

                                settings: {
                                    slidesToShow: 1,
                                    slidesToScroll: 1,
                                },
                            },

                        ],
                    });
                }
            }
        });
    });


    $('.welcome-slider-l9').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        dots: false,
        centerMode: false,
        infinite: true,
        focusOnSelect: true,
        touchMove: true,
        asNavFor: '.welcome-slider-l9-sub',
        speed: 1500,
        autoplay: true,
        autoplaySpeed: 2000
    });
    $('.welcome-slider-l9-sub').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        dots: false,
        centerMode: false,
        infinite: true,
        focusOnSelect: true,
        touchMove: true,
        speed: 1500,
        asNavFor: '.welcome-slider-l9',
        autoplay: true,
        autoplaySpeed: 2000
    });

    if (jQuery(".portfolio-img").length > 0) {
        $(".portfolio-img").slick({
            dots: false,
            infinite: true,
            speed: 1200,
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            autoplay: true,
            fade: true,
            asNavFor: '.portfolio-content'
        });

    }
    if (jQuery(".portfolio-content").length > 0) {
        $(".portfolio-content").slick({
            dots: false,
            infinite: true,
            autoplay: true,
            speed: 1200,
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            asNavFor: '.portfolio-img'
        });

    }



    /*>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>      
             Sticky Header
      <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<*/
    window.onscroll = function() {
        scrollFunction();
    };

    function scrollFunction() {
        if (
            document.body.scrollTop > 50 ||
            document.documentElement.scrollTop > 50
        ) {
            $(".site-header--sticky").addClass("scrolling");
        } else {
            $(".site-header--sticky").removeClass("scrolling");
        }
        if (
            document.body.scrollTop > 700 ||
            document.documentElement.scrollTop > 700
        ) {
            $(".site-header--sticky.scrolling").addClass("reveal-header");
        } else {
            $(".site-header--sticky.scrolling").removeClass("reveal-header");
        }
    }

    /*>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>      
           Input Count Up Button
    <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<*/
    $(".count-btn").on("click", function() {
        var $button = $(this);
        var oldValue = $button
            .parent(".count-input-btns")
            .parent()
            .find("input")
            .val();
        if ($button.hasClass("inc-ammount")) {
            var newVal = parseFloat(oldValue) + 1;
        } else {
            // Don't allow decrementing below zero
            if (oldValue > 0) {
                var newVal = parseFloat(oldValue) - 1;
            } else {
                newVal = 0;
            }
        }
        $button.parent(".count-input-btns").parent().find("input").val(newVal);
    });
    // Table BTN Trigger
    $('#l5-pricing-btn .toggle-btn').on("click", function(e) {
        console.log($(e.target).parent().parent().hasClass("monthly-active"))
        $(e.target).toggleClass("clicked");
        if ($(e.target).parent().parent().hasClass("monthly-active")) {
            $(e.target).parent().parent().removeClass("monthly-active").addClass("yearly-active");
        } else {
            $(e.target).parent().parent().removeClass("yearly-active").addClass("monthly-active");
        }
    })

    $("[data-pricing-trigger]").on("click", function(e) {
        $(e.target).addClass("active").siblings().removeClass("active");
        var target = $(e.target).attr("data-target");
        console.log($(target).attr("data-value-active") == "monthly");
        if ($(target).attr("data-value-active") == "monthly") {
            $(target).attr("data-value-active", "yearly");
        } else {
            $(target).attr("data-value-active", "monthly");
        }
    })


    $(document).ready(function() {
        // Add smooth scrolling to all links
        $(".goto").on('click', function(event) {
            // Make sure this.hash has a value before overriding default behavior
            if (this.hash !== "") {
                // Prevent default anchor click behavior
                event.preventDefault();
                // Store hash
                var hash = this.hash;
                // Using jQuery's animate() method to add smooth page scroll
                // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
                $('html, body').animate({
                    scrollTop: $(hash).offset().top
                }, 2000, function() {
                    // Add hash (#) to URL when done scrolling (default click behavior)
                    window.location.hash = hash;
                });
            } // End if
        });
        //       $("[data-pricing-trigger]").on("click",function(e){
        //             var target = $(e.target).attr("data-target");

        //           if($(e.target).attr("data-value-active") == "monthly"){
        //                   $(e.target).attr("data-value-active","yearly");
        //                   $(target).attr("data-value-active","yearly");
        //           }else{
        //             $(e.target).attr("data-value-active","monthly");
        //             $(target).attr("data-value-active","monthly");
        //           }




        //       //     else if($(e.target).attr("data-value-active") == "yearly"){
        //       //             $(e.target).attr("data-value-active","monthly");
        //       //             $(target).attr("data-value-active","monthly");
        //       //       } else{
        //       //             alert("please add the active value")
        //       //       }



        //     })
    });



    /*>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>      
           Smooth Scroll
    <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<*/

    $(".goto").on("click", function(event) {
        if (this.hash !== "") {
            event.preventDefault();
            var hash = this.hash;
            $("html, body").animate({
                    scrollTop: $(hash).offset().top,
                },
                2000,
                function() {
                    window.location.hash = hash;
                }
            );
        } // End if
    });
});

/*>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>      
      Preloader Activation
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<*/

$(window).load(function() {
    setTimeout(function() {
        $("#loading").fadeOut(500);
    }, 1000);
    setTimeout(function() {
        $("#loading").remove();
    }, 2000);
});

var lang = {
    "html": "100%",
    "css": "90%",
    "javascript": "70%",
    "php": "55%"
};

var multiply = 4;

$.each(lang, function(language, pourcent) {

    var delay = 700;

    setTimeout(function() {
        $('#' + language + '-pourcent').html(pourcent);
    }, delay * multiply);

    multiply++;

});


$(".LaminationClickforMoreInfo label").on("click", function() {
    window.open("https://pacerlabel.com/page/label");
    console.log("clicked");
});
$(".LaminationClickforMoreInfo label").on("click", function() {
    window.open("https://pacerlabel.com/page/lamination");
    console.log("clicked");
});

$(function() {

    var $bars = $(".skillbar-bar"),
        total = $bars.length,
        index = -1,
        timer = null,
        select = function(i) {
            var $bar = $bars.eq(i);
            $bar.css("width", $bar.parent().data("percent"));
            $bar.parent().addClass("complete");
        },
        action = function() {
            index++;
            if (index == total - 1) {
                clearTimeout(timer);
            }
            select(index);
            setTimeout(action, 500);

        };


    timer = setTimeout(action, 500);

});

$('.skillbar').skillBars({
    from: 0,
    speed: 4000,
    interval: 100,
    decimals: 0,
});


//***ISOTOPE***
// init Isotope

$(window).load(function() {
    $('.grid').isotope({
        itemSelector: '.grid-item',
        layoutMode: 'masonry'
    })

});

$(window).load(function() {
    $('.grid-2').isotope({
        itemSelector: '.grid-item',
        layoutMode: 'fitRows'
    })

});


// filter items on button click
$('.jobs-filter__menu').on('click', 'button', function() {
    var filterValue = $(this).attr('data-filter');
    $('.grid').isotope({
        filter: filterValue
    });
});

// filter items on button click
$('.portfolio-menu').on('click', 'button', function() {
    var filterValue = $(this).attr('data-filter');
    $('.grid').isotope({
        filter: filterValue
    });
});
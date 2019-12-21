//menu header
$('.mobile-icon').on('click', function(){
    $(this).toggleClass("mobile-close");
    $(".nav-menu").toggleClass("active");
});
$(window).on("load resize",function () {
    $("main").css("padding-top",$("#header").outerHeight());
});

$(function () {
    objectFitImages('img');


    $(".box-list-qa .item .answer").slideUp();
    $(".box-list-qa .item .question").click(function () {
        $(this).next().slideToggle();
    });

    $(".list-option").slideUp();
    $(".input-select").click(function () {
        $(this).next().slideToggle();
    });

    $(".box-select .box-select-content").slideUp();
    $(".box-select .box-select-heading").click(function () {
        $(this).next().slideToggle();
    });

});


$(window).scroll(function () {
    if ($(this).scrollTop() > 10) {
        $("#header").addClass("header-fix");
    }
    else {
        $("#header").removeClass("header-fix");
    }
});


$('.slider-home').slick({
    dots: false,
    focusOnSelect: true,
    pauseOnHover:false,
    infinite: true,
    speed: 500,
    fade: true,
    autoplay: false,
    cssEase: 'linear'
});
$(".list-map").slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2000,
    responsive: [
        {
            breakpoint: 990,
            settings: {
                slidesToShow: 2
            }
        },
        {
            breakpoint: 640,
            settings: {
                slidesToShow: 1
            }
        }
    ]
});

$('.slider-for').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    asNavFor: '.slider-nav',
    prevArrow:"<button type='button' class='slick-prev pull-left'><img src='./img/hostel-02/icon-prev.png' ></button>",
    nextArrow:"<button type='button' class='slick-next pull-right'><img src='./img/hostel-02/icon-next.png' ></button>"
});
$('.slider-nav').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    asNavFor: '.slider-for',
    dots: false,
    centerMode: true,
    focusOnSelect: true
});


$(".orientation-item").slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2000,
    responsive: [
        {
            breakpoint: 768,
            settings: {
                slidesToShow: 2
            }
        },
        {
            breakpoint: 640,
            settings: {
                slidesToShow: 1
            }
        }
    ]
});

$(".list-option li").click(function(){
    var val = $(this).text();
    $(".input-select").html(val);
    $(".list-option").slideToggle();
});

$(".box-select-content li").click(function(){
    var text = $(this).text();
    $(".box-select-heading").html(text);
    $(".box-select-content").slideToggle();
});
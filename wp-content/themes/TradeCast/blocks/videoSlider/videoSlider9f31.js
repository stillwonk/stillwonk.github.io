jQuery(document).ready(function() {
    var slider = jQuery('.video-slider__slider-container').slick({
        infinite: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: '18.9vw',
        autoplay: false,
        dots: true,
        arrows: true,
        variableWidth: true,
        customPaging: function(slider, i) {
            const $slide = jQuery(slider.$slides[i]);
            return '<button class="slider-tab">' + $slide.data().title + '</button>';
        },
    });

    jQuery(slider).on('afterChange', function(event, slick, currentSlide) {
        const $slides = slick.$slides;
        $slides.each(function(slideIndex) {
            const $slide = jQuery($slides.get(slideIndex));
            const $iframe = jQuery($slide.find("iframe"));
            const $preview = jQuery($slide.find(".iframe-container__preview"));
            if ($iframe && $iframe.length) {
                $iframe.attr("src", "about:blank");
            }
            if($preview && $preview.length) {
                $preview.animate({ opacity: 1 }, 0, function() {
                    $preview.removeClass("hidden");
                });
            }
        });
        if (slick.$slides.length-1 == currentSlide) {
            slider.slick("slickGoTo", 0);
        }
    });



});
jQuery(document).ready(function() {
    let currentSlideIndex = 0;
    const $sliderEl = jQuery('.image-group-slider-with-text__inner__image-container__inner__slider');
    const $slideEls = jQuery('.image-group-slider-with-text__inner__image-container__inner__slider__slide');

    function startNextSlide() {
        setTimeout(function() {
            if ($slideEls.length) {
                const $prevActive = jQuery('.image-group-slider-with-text__inner__image-container__inner__slider__slide.active').addClass('fadeOut')
                $prevActive.removeClass('active');
                $prevActive.removeClass('fadeOut');
                if (currentSlideIndex >= ($slideEls.length - 1)) {
                    currentSlideIndex = 0;
                } else {
                    currentSlideIndex++;
                }
                jQuery($slideEls.get(currentSlideIndex)).addClass('active');
                startNextSlide();
            }
        }, 7500);
    }

    if ($sliderEl.length && $slideEls.length > 1) {
        startNextSlide();
    }
});
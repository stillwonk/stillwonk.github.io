function handlePreviewContainerClick(ev) {
    const $preview = jQuery(ev.currentTarget);
    const $iframe = jQuery($preview.parent().find("iframe"));
    if ($preview.length && $iframe.length) {
        var newSrc = updateUrlParameter(($preview.data() || { video: "" }).video, "autoplay", "1");
        if (!$preview.hasClass("opensPopup")) {
            $preview.animate({ opacity: 0 }, 1000, function() {
                $preview.addClass("hidden");
            });
        }
        $iframe.attr("src", newSrc);
        $iframe.show();
    }
}

function initVideoJs() {
    $iframeContainers = jQuery('.iframe-container');
    jQuery('.iframe-container__preview').off('click', handlePreviewContainerClick);
    

    if ($iframeContainers.length) {
        $iframeContainers.each(function(iframeContainerIndex) {
            const $el = jQuery($iframeContainers.get(iframeContainerIndex));
            const $previewContainer = jQuery($el.find('.iframe-container__preview'));
            if ($previewContainer.length) {
                $previewContainer.on('click', handlePreviewContainerClick);
            }
        });
    }
}

jQuery(document).ready(function() {
    initVideoJs();
});
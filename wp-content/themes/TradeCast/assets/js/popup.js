const $html = jQuery('html');
const $popupRoot = jQuery('#popup-root');
const $popupCloseButton = jQuery('#popup-root .popup-root__inner__close-button');
const $popupIFrame = jQuery('#popup-root iframe');

function handleOpensPopupClick(ev) {
    $currentTarget = jQuery(ev.currentTarget);
    const { popupvideo } = $currentTarget.data() || { popupvideo: null };
    $popupIFrame.attr("src", updateUrlParameter(popupvideo, "autoplay", "1"));
    $popupRoot.removeClass("hidden");
}

function handleClosePopup(ev) {
    $popupIFrame.attr("src", "about:blank");
    $popupRoot.addClass("hidden");
    ev.preventDefault();
}

function initPopupJs() {
    const $popupOpenerElements = jQuery(".opensPopup");
    $popupOpenerElements.off("click", handleOpensPopupClick);
    $popupOpenerElements.on("click", handleOpensPopupClick);
    $popupCloseButton.off("click", handleClosePopup);
    $popupCloseButton.on("click", handleClosePopup);
}

jQuery(document).ready(function() {
    initPopupJs();
});
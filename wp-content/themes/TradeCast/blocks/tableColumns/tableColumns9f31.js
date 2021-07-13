jQuery(document).ready(function() {
    let $descriptionBoxClone = null;
    const $moreInfoButtons = jQuery('.table-columns__inner__columns__column__table .more-info img');
    const $descriptionBoxes = jQuery('.table-columns__inner__columns__column__table .more-info-content');

    function closeAllDescriptionBoxes() {
        if ($descriptionBoxClone && $descriptionBoxClone.length) {
            $descriptionBoxClone.remove();
        }
    }

    
    if ($moreInfoButtons.length) {
        $moreInfoButtons.each(function(i) {
            const $moreInfoButton = jQuery($moreInfoButtons.get(i));
            $moreInfoButton.on('click', function(ev) {
                closeAllDescriptionBoxes();
                const $parent = jQuery(ev.currentTarget).parent();
                const $descriptionBox = jQuery($parent.find('.more-info-content'));
                $descriptionBoxClone = $descriptionBox.clone();
                $descriptionBoxClone.css($descriptionBox.offset());
                $descriptionBoxClone.css({
                    margin: '0 auto',
                    left: '0',
                    right: '0',
                    maxWidth: 'calc(100% - 80px)',
                    width: '500px',
                });
                jQuery($descriptionBoxClone).appendTo("body");
                setTimeout(function() {
                    if (!$descriptionBoxClone.hasClass("show")) {
                        $descriptionBoxClone.addClass("show");
                    }
                }, 16.667);

                ev.stopPropagation();
            });
        });
    }

    $descriptionBoxes.on('click', function(ev) {
        ev.stopPropagation();
    });

    jQuery(window).click(function() {
        closeAllDescriptionBoxes();
    });
});
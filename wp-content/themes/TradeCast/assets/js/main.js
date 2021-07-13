/*
	Javascript and jQuery functions for the TradeCast Wordpress theme!
 */

function scrollToElement(el, event) {
	if (el && typeof el.scrollIntoView === "function") {
		el.scrollIntoView({ behavior: "smooth", block: "center" });
		if (event && typeof event.preventDefault === "function") {
			event.preventDefault();
		}
		return false;
	}
}

jQuery(document).ready(function($) {
	/**
	 * 	Mobile submenu onclick
	 */
	if ($(window).width() < 1120) {
		$("header nav .menu-item-has-children").click(function() {
			$(this).children('.sub-menu').toggleClass('open-submenu');
			$(this).toggleClass('child-submenu');
		});
	}


	/**
	 * 	Form subject value change
	 */
// 	var getUrlParameter = function getUrlParameter(sParam) {
// 		var sPageURL = window.location.search.substring(1),
// 			sURLVariables = sPageURL.split('&'),
// 			sParameterName,
// 			i;

// 		for (i = 0; i < sURLVariables.length; i++) {
// 			sParameterName = sURLVariables[i].split('=');

// 			if (sParameterName[0] === sParam) {
// 				return typeof sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
// 			}
// 		}
// 		return false;
// 	};

// 	var reason = getUrlParameter('reason');
// 	if(reason) {
// 		$(".gform_wrapper .auto-fill select").val(reason);
// 	}

	/**
	 * 	Custom Checkbox
	 */

	$("input[type='checkbox']").wrap('<div class="custom-checkbox"></div>');
	$("select").wrap('<div class="custom-select"></div>');
	$(".custom-select").append('<div class="custom-select-list"></div>');
	$(".custom-select option").each(function() {
		var val = $(this).val();
		var text = $(this).text();
		$(this).parent().children('.custom-select-list').append('<div class="custom-select-item" data-val="' + val + '">' + text + '</div>')
	});

	$(".custom-checkbox").append('<span class="checked"></span>');

	$(".custom-checkbox").click(function() {
		$(this).find(".checked").toggle();
	});

	/**
	 * MENU BUTTON ON MOBILE TOGGLE
	 */
	 $('#menu-btn').click(function(){
		$(this).toggleClass('open');
		$(".menu-wrap").toggleClass('open');
		$(".header").toggleClass('open-menu');
	});

	/**
	 * SCROLL TO ANCHOR LINK
	 */
	$("a[href^=\"#\"]").click(function(e) {
		var aid = $(this).attr("href");
		scrollToElement(document.getElementById(aid.replace("#", "")), e);
	});

	/**
	 * SCROLL TO SECTION IF HASH LINK IS PRESENT
	 */
	if (window.location.hash && $(window.location.hash).length) {
		scrollToElement(document.getElementById(window.location.hash.replace("#", "")));
	}

	/**
	 * MENU SCROLL SHOW / HIDE ON SCROLL
	 * AND
	 * ANIMATE-IN ON BLOCKS AND FOOTER WHEN SCROLLED INTO VIEW
	 * AND
	 * HANDLE PARALLAX
	 */
	var prevScrollpos = window.pageYOffset;

	function setInViewClass() {
		const $blocks = $('.block, footer');
		const scrollTop = $(window).scrollTop();
		const windowHeight = window.innerHeight;
		$blocks.each(function(blockIndex, block) {
			if (scrollTop + windowHeight > $(block).offset().top) {
				$(block).addClass("animate-in");
			}
		});
	}

	const $parallaxElements = $('.parallax');
	function handleParallax() {
	
		// Parallax scroll image in parallax block sections
		var windowTop = $(window).scrollTop();
		var windowHeight = window.innerHeight;
		if ($parallaxElements.length) {

			// Additional parallax elements
			$parallaxElements.each(function(index, element) {
				const parallaxSpeed = $(element).data('parallax-speed');
				var speed = 0.15;
				if (parallaxSpeed) {
					speed = parseInt(parallaxSpeed) / 1000;
				}
				speed = speed * .5;
				var elementTop = $(element).offset().top;
				var elementHeight = $(element).outerHeight();
				var viewPortHeight = windowHeight * 0.5 - elementHeight * 0.5;
				var scrolled = windowTop - elementTop + viewPortHeight;
				$(element).css({ transform: "translate3d(0," + scrolled * + speed + "px, 0)" });
			});
		}
	}
	
	let lastAnimTs = 0;
	window.addEventListener('scroll', function(ev) {
		window.requestAnimationFrame(function(animTs) {
			if (!lastAnimTs) {
				lastAnimTs = animTs;
			}
			if (animTs - lastAnimTs > 16.6667) {
				lastAnimTs = animTs;
			} else {
				return false;
			}
			var currentScrollPos = window.pageYOffset;
			if (prevScrollpos > currentScrollPos) {
				$('#header').removeClass("hidden");
			} else {
				if ($('#header').offset().top > 500) {
					$('#header').addClass("hidden");
					$('#header .sub-menu').hide();
				}
			}
			prevScrollpos = currentScrollPos;
			setInViewClass();
			if (window.innerWidth > 768) {
				handleParallax();
			} else {
				$parallaxElements.css({ transform: "translate3d(0,0,0)" });
			}
		});
	}, { passive: true });
	setInViewClass();
});


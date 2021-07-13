jQuery( function onDOMReady( $ ) {
	if ( $( 'body' ).hasClass( 'blog' ) || $( 'body' ).hasClass( 'page-template-page-cases' ) ) {
		$('footer').addClass('hidden');
		var ppp = 3; // Post per page
		var postVisible = 9;
		var pageNumber = postVisible / ppp;
		var postType = 'post';
		var postWrapper = $( '.posts-wrapper' );
		var scrollSpace = 100;

		if ($(window).width() < 1220) {
			var ppp = 2;
		}
		if ($(window).width() < 768) {
			var ppp = 1;
		}

		if ( $( '.cases-page' )[0] ) {
			var ppp = 2;
			var postType = 'cases';
			var postVisible = 6;
			if ($(window).width() < 968) {
				var ppp = 1;
			}

			var pageNumber = postVisible / ppp;

			if($(".cases-posts .post-card").length < 9) {
				$('footer').removeClass('hidden');
			}
		}

		if ( $( '.blog-page' )[0] ) {
			if($(".blog-posts .post-card").length < 6) {
				$('footer').removeClass('hidden');
			}
		}


		function load_posts() {
			pageNumber++;
			var str = '&pageNumber=' + pageNumber + '&ppp=' + ppp + '&postType=' + postType + '&action=more_post_ajax';
			postWrapper.addClass( 'posts_loading' );
			$.ajax( {
				type: 'POST',
				dataType: 'html',
				url: ajax_posts.ajaxurl,
				data: str,
				success: function( data ) {
					var $data = $( data );
					if ( $data.length ) {
						postWrapper.append( $data );
						if (typeof initVideoJs === 'function') {
							initVideoJs();
						}
						if (typeof initPopupJs === 'function') {
							initPopupJs();
						}
					} else {
						postWrapper.addClass( 'no_more_posts' );
						$('footer').removeClass('hidden');
					}
				},
				error: function( jqXHR, textStatus, errorThrown ) {
					console.log( jqXHR + ' :: ' + textStatus + ' :: ' + errorThrown );
				},
				complete: function() {
					postWrapper.removeClass( 'posts_loading' );

				},

			} );
			return false;
		}

		window.addEventListener('scroll', function() {
			var windowScrollBottom = $( window ).scrollTop() + $( window ).height();
			if ( windowScrollBottom > $( postWrapper ).offset().top + scrollSpace ) {
				if ( ! ( postWrapper.hasClass( 'posts_loading' ) || postWrapper.hasClass( 'no_more_posts' ) ) ) {
					load_posts();
				}
			}
		}, { passive: true });
	}
} );

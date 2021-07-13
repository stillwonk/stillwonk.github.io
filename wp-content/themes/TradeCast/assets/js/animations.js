jQuery( function onDOMReady( $ ) { // jQuery code here

	const wrapTextWithSpan = ( element ) => {
		element.each( function( index ) {
			var characters = $( this ).text().split( '' );

			$this = $( this );
			$this.empty();
			$.each( characters, function( i, el ) {
				$this.append( '<span style="opacity: 0" class="letter">' + el + '</span' );
			} );

		} );
	};

	const defaultDuration = 1000;
	const defaultDelay = 200;

	$( '*[data-animation="titleIn"]' ).on( 'inview', function( event, isInView ) {
		if ( $(window).width() > 960) {
			if ( isInView ) {
				wrapTextWithSpan( $( this ) );
				const letterSelection = '.' + $( this ).attr( 'class' ) + ' .letter';
				$( this ).css( { opacity: 1 } );
				anime( {
					targets: letterSelection,
					opacity: [ 0, 1 ],
					easing: 'easeInOutQuad',
					duration: 550,
					delay: ( el, i ) => 40 * ( i + 1 ),
				} );
				$( this ).off( 'inview' );
			}
		} else {
			$( this ).css( { opacity: 1 } );
		}
	} );
} );



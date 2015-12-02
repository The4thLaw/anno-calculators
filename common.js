/*global console */
/*global $ */

// Initialise clickable headers
$(function () {
	'use strict';
	
	$('h5, h6').click(function () {
		var header = $(this),
			section = $('+ section', this);
		section.slideToggle();
	});
});


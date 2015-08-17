/*! brokenjs - v1.0.1 - 2015-08-17 *//*!
 * Broken.js
 * http://www.github.com/juancamiloestela/select.js
 * MIT licensed
 * Version 0.1
 *
 * Copyright (C) 2013 Juan Camilo Estela http://www.mecannical.com
 *
 * TODO:
 * Allow replacing with custom content
 */


/*global*/


(function($) {
	'use strict';

	var canvas = document.createElement("canvas"),
		ctx;

	if (!canvas.getContext){
		console.warn('Broken.js aborted, canvas is not supported on this browser');
		return;
	}

	ctx = canvas.getContext("2d");

	function handleBrokenImage(e){
		var $this = $(e.currentTarget);

		if (!$this.hasClass('broken')){
			$this.addClass('broken');

			var image = new Image();
			image.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQQAAAEECAYAAADOCEoKAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBNYWNpbnRvc2giIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6ODBCMzNBQzg0MTRCMTFFNDg0NzdCNjY1MDZDRjNGQjgiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6ODBCMzNBQzk0MTRCMTFFNDg0NzdCNjY1MDZDRjNGQjgiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo4MEIzM0FDNjQxNEIxMUU0ODQ3N0I2NjUwNkNGM0ZCOCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo4MEIzM0FDNzQxNEIxMUU0ODQ3N0I2NjUwNkNGM0ZCOCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PoQtWuQAAAsdSURBVHja7N0NpN7X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";
			image.onload = function() {
				canvas.width = parseInt($this.attr('width'), 10) || image.width;
				canvas.height = parseInt($this.attr('height'), 10) || (canvas.width/image.width * image.height);
				ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
				ctx.font = "bold 12px sans-serif";
				ctx.fillStyle = "#848484";
				ctx.textAlign = 'center';
				ctx.fillText($this.attr('src'), canvas.width/2, canvas.height - 15);
				$this.attr('src', canvas.toDataURL());
			};
		}
	}

	$(function(){
		$('img').each(function(i, img){
			var $img = $(img);
			$img.one('error', handleBrokenImage);
			$img.attr('src', $img.attr('src'));
		});
	});

})(jQuery);
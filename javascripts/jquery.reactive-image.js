/* 
	jQuery Reactive Images
	http://johnpatrickgiven.com
	https://github.com/iamjpg/jQuery-Reactive-Images
	
	MIT License
	
	Copyright (C) 2012 John Patrick Given

	Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

(function ( $, window ) {
	
	var pluginName = 'reactiveImage',
	pl = null,
	document = window.document,
	defaults = {

	};

	function Reactive( element, options ) {
		pl = this;
		this.element = element;
		this.options = $.extend( {}, defaults, options) ;

		this._defaults = defaults;
		this._name = pluginName;

		this.init();
	}

	Reactive.prototype.init = function () {
		
		//
		// Base values
		var elemWidth = $(this.element).outerWidth(true),
			elemHeight = this.options.height,
			imgWidth = $(this.element).children().outerWidth(true),
			imgHeight = $(this.element).children().outerHeight(true),
			imgObj = $($(this.element).children()),
			elemObj = $(this.element);
		

		//
		// Constrain
		$(this.element).css({
			height: this.options.height,
			overflow: "hidden"
		});
		
		$("<img/>").attr("src", imgObj.attr("src")).load(function() {
			if (elemWidth > elemHeight) {
				if (imgWidth > imgHeight) {
					var fRatio = imgWidth / imgHeight;
					imgObj.css({
						width: elemObj.outerWidth(true),
						height: (elemObj.outerWidth(true) * (1 / fRatio))
					});
				}
				
				if (imgObj.outerHeight(true) < elemObj.outerHeight(true)) {
					elemObj.css({
						height: imgObj.outerHeight(true)
					});
				}
			}
			
			imgObj.attr('width', $(pl.element).children().outerWidth(true)).attr('height', $(pl.element).children().outerHeight(true));
			
			if ($(pl.element).children().outerHeight(true) > elemHeight) {
				var this_height = ($(pl.element).children().outerHeight(true) - elemHeight) / 2;
				elemObj.children('img').css({
					position: "relative",
					"left" : 0,
					"top" : -this_height
				});
			}
			
			if ($(pl.element).children().outerWidth(true) > elemWidth) {
				var this_width = ($(pl.element).children().outerWidth(true) - elemWidth) / 2;
				elemObj.children('img').css({
					"left" : -this_width
				});
			}
		});
	};
	
	//
	// Custom resize method in an attempt to control a resizeend response
	var rtime = new Date(1, 1, 2000, 12,00,00);
	var timeout = false;
	var delta = 200;
	Reactive.prototype.resizeend = function() {
		if (new Date() - rtime < delta) {
			setTimeout(pl.resizeend, delta);
		} else {
			timeout = false;
			pl.init();
			$(pl.element).children().fadeIn("fast");
		}
	}
	
	$(window).resize(function() {
		$(pl.element).children().fadeOut("fast");
	    rtime = new Date();
	    if (timeout === false) {
	        timeout = true;
	        setTimeout(pl.resizeend, delta);
	    }
	});

	$.fn[pluginName] = function ( options ) {
		return this.each(function () {
			if (!$.data(this, 'plugin_' + pluginName)) {
				$.data(this, 'plugin_' + pluginName, new Reactive( this, options ));
			}
		});
	};

}(jQuery, window));
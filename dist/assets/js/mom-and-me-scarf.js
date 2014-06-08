// GLOBAL

var MOMANDMESCARF = {};

//SLIDER

MOMANDMESCARF.slider = {

	cacheElems: function() {
		this.sliderContainer = $('.product-features');
		this.sliderBtn = this.sliderContainer.find('.slider-btn');
		this.sliderElement = this.sliderContainer.find('ul');
	},

	sliderBinds: function() {
		var self = this;

		this.sliderBtn.on('click', function() {
			var sliderElement = $(this).parent().find('ul');
			var isOpen = $(this).hasClass('open');

			self.sliderElement.removeClass('open');
			self.sliderBtn.removeClass('open');

			if (!isOpen) {
				$(this).addClass('open');
				sliderElement.addClass('open');
			}
		});
	},

	init: function() {
		this.cacheElems();
		this.sliderBinds();
	}
};

MOMANDMESCARF.slider.init();
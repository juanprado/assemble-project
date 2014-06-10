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

			self.sliderElement.slideUp();
			self.sliderBtn.removeClass('open');

			if (!isOpen) {
				$(this).addClass('open');
				sliderElement.slideDown();
			}
		});
	},

	init: function() {
		this.cacheElems();
		this.sliderBinds();
	}
};

MOMANDMESCARF.slider.init();

// CAROUSEL 

MOMANDMESCARF.carousel = {

	cacheElems: function() {
		this.slideshow = $('.homepage-slideshow-container .slideshow');
	},

	init: function() {
		this.cacheElems();
		this.slideshow.bxSlider({
			mode: 'fade',
			auto: true,
			pause: 5000,
			pager: false,
			controls: false
		});
	}
};

MOMANDMESCARF.carousel.init();

// IMAGE PICKER

MOMANDMESCARF.imagePicker = {

	cacheElems: function() {
		this.imagePicker = $('.image-picker img');
		this.mainImage = $('.main-image');
	},

	imagePickerBind: function() {
		var self = this;

		this.imagePicker.on('click', function() {
			var src = $(this).attr('src');

			self.imagePicker.removeClass('active');
			self.mainImage.attr('src', src);
			$(this).addClass('active');
		});
	},

	init: function() {
		this.cacheElems();
		this.imagePickerBind();
	}
};

MOMANDMESCARF.imagePicker.init();
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
			pause: 6500,
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

// STICKY NAV

MOMANDMESCARF.stickyNav = {

	cacheElems: function() {
		this.nav = $('.customer-care nav');
		this.navLink = this.nav.find('a');
		this.section = $('.customer-care section');
	},

	navLinkBind: function() {
		var self = this;

		this.navLink.on('click', function() {
			var id = $(this).data('href');
			var position = $(id).offset().top;
			self.scrollAnimation(position);
		});
	},

	setStickyNav: function() {
		var scrollTop = $(window).scrollTop();

		if (scrollTop > this.topPosition) {
			this.nav.addClass('sticky');
			this.setHorizontalPosition();
		} else {
			this.nav.removeClass('sticky');
			this.nav.removeAttr('style');
		}
	},

	stickyNavInit: function() {
		this.topPosition = this.nav.offset().top;
		var self = this;

		$(window).scroll(function() {
			self.setStickyNav();
		});
	},

	setHorizontalPosition: function() {
		var leftPosition = this.section.offset().left;
		this.nav.css('left', leftPosition);
	},

	onWindowResize: function() {
		var self = this;

		$(window).resize(function() {
			if (self.nav.hasClass('sticky')) {
				self.setHorizontalPosition();
			} 
		});
	},

	scrollAnimation: function(position) {
		$('html, body').animate({
			scrollTop: position
		}, 1000);
	},

	init: function() {
		this.cacheElems();
		this.navLinkBind();
		this.stickyNavInit();
		this.onWindowResize();
	}

};

MOMANDMESCARF.stickyNav.init();
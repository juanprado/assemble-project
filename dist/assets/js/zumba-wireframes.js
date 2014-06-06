if (!('boxShadow' in document.body.style)) {
	document.body.setAttribute('class', 'noBoxShadow');
}

document.body.addEventListener("click", function(e) {
	var target = e.target;
	if (target.tagName === "INPUT" &&
		target.getAttribute('class').indexOf('liga') === -1) {
		target.select();
	}
});

(function() {
	var fontSize = document.getElementById('fontSize'),
		testDrive = document.getElementById('testDrive'),
		testText = document.getElementById('testText');
	function updateTest() {
		testDrive.innerHTML = testText.value || String.fromCharCode(160);
		if (window.icomoonLiga) {
			window.icomoonLiga(testDrive);
		}
	}
	function updateSize() {
		testDrive.style.fontSize = fontSize.value + 'px';
	}
	fontSize.addEventListener('change', updateSize, false);
	testText.addEventListener('input', updateTest, false);
	testText.addEventListener('change', updateTest, false);
	updateSize();
}());
;// ACCORDION
var accordion = {

	el: {},

	cacheElems: function() {
		this.el.accordionTrigger = $('[data-module="accordion"]');
	},

	accordionBind: function() {
		var self = this;

		this.el.accordionTrigger.on('click', function() {
			event.preventDefault();
			var target = $(this).data('target');

			if ($(target).hasClass('_active')) {
				$(target).removeClass('_active').slideUp();
			} else {
				$(target).addClass('_active').slideDown();
			}
		});
	},

	init: function() {
		this.cacheElems();
		this.accordionBind();
	}
};

accordion.init();

// STICKY HEADER
var header = {

	el: {},

	cacheElems: function() {
		this.el.header = $('.main-header');
	},

	headerBind: function() {
		var self = this;

		$(window).scroll(function() {
			var headerPosition = $(document).scrollTop();

			if (headerPosition > 123) {
				self.el.header.addClass('_fixed');
			} else {
				self.el.header.removeClass('_fixed');
			}
		});
	},

	init: function() {
		this.cacheElems();
		this.headerBind();
	}
};

header.init();

//QUERY STRING READER
var qsReader = {

	getVal: function(name) {

		var pageURL = window.location.search.substring(1);
		var URLvariables = pageURL.split('&');

		for (var i = 0; i < URLvariables.length; i++) {
			var parameterName = URLvariables[i].split('=');

			if (parameterName[0] == name) {
				return parameterName[1];
			}
		}
	}
};

// PINK TOP SELECTOR
var pinkTopPageState = {

	el: {},

	isPink: false,

	cacheElems: function() {
		this.el.catalogue = $('.catalogue-tops');
		this.el.breadcrumbs = $('.shop-breadcrumbs');
		this.el.clear = $('.color-breadcrumb .clear', this.el.breadcrumbs);
		this.el.colorSelector = $('.colors li.pink');
	},

	showPinkTop: function() {
		if (this.isPink === false) {
			this.el.catalogue.addClass('_pink-top');
			this.el.breadcrumbs.addClass('_pink-top');
			this.isPink = true;
		}
	},

	hidePinkTop: function() {
		if (this.isPink) {
			this.el.catalogue.removeClass('_pink-top');
			this.el.breadcrumbs.removeClass('_pink-top');
			this.isPink = false;
		}
	},

	bindClearBtn: function() {
		var self = this;

		this.el.clear.on('click', function() {
			self.el.colorSelector.removeClass('_active');
			self.hidePinkTop();
		});
	},

	detectPinkQueryString: function() {
		var color = qsReader.getVal('color');

		if (color === 'pink') {
			this.el.colorSelector.addClass('_active');
			this.showPinkTop();
		}
	},

	init: function() {
		this.cacheElems();
		this.bindClearBtn();
		this.detectPinkQueryString();
	}
};

pinkTopPageState.init();


// COLOR SELECTOR
var colorSelection = {
	 
	el: { },

	cacheElems: function() {
		this.el.colorItem = $('.colors li');
		this.el.clear = $('.color .clear');
	},

	colorSelectionBind: function() {
		var self = this;

		this.el.colorItem.on('click', function() {
			if ($(this).hasClass('_active')) {
				$(this).removeClass('_active');
				self.hidePinkState($(this));
			} else {
				$(this).addClass('_active');
				self.showPinkState($(this));
			}
		});
	},

	showPinkState: function(ele) {
		var self = this;
		var isTops = $('.tops-link').hasClass('active');
		var isPink = ele.hasClass('pink');

		if (isTops && isPink) {
			pinkTopPageState.showPinkTop();
		}
	},

	hidePinkState: function(ele) {
		var isPink = ele.hasClass('pink');

		if (isPink) {
			pinkTopPageState.hidePinkTop();
		}
	},

	clearColors: function() {
		var self = this;

		this.el.clear.on('click', function() {
			self.el.colorItem.removeClass('_active');
			pinkTopPageState.hidePinkTop();
		});
	},

	init: function () {
		this.cacheElems();
		this.colorSelectionBind();
		this.clearColors();
	}
};

colorSelection.init();

// GO TO CART
var goToCart = {

	el: {},

	cacheElems: function() {
		this.el.button = $('.add-to-cart');
		this.el.cartLink = $('.header-cart-link');
	},

	loadCartLinks: function() {
		var self = this;

		this.el.button.on('click', function(e) {
			var src = $(this).data('src');

			e.preventDefault();
			$(this).addClass('loading-cart');
			$(this).off('click');

			setTimeout(function() {
				self.cartLinkReady();
			}, 1000);

		});
	},

	cartLinkReady: function() {
		var src = this.el.button.data('src');

		this.el.button.removeClass('loading-cart');
		this.el.button.addClass('ready-cart');
		this.el.button.attr('href', src);
		this.el.cartLink.addClass('_active');
	},

	init: function() {
		this.cacheElems();
		this.loadCartLinks();
	}

};

goToCart.init();

//FILTER UPDATE FORM
var formUpdate = {

	el: {},

	cacheElems: function() {
		this.el.mapFilter = $('[data-module="map-filters"]');
		this.el.checkItems = this.el.mapFilter.find('.change-event');
	},

	bindElm: function() {
		var filterHolder = [ ],
			filterJoined = "";

		this.el.checkItems.on('change', function(){
			// var $this = $(this);

			// filterHolder.push($(this).val());
			// console.log(filterHolder.join(" "));
			filterHolder = [ ];

			for (i=0; i < formUpdate.el.checkItems.length; i++){
				if (formUpdate.el.checkItems.eq(i).is(':checkbox')){
					if (formUpdate.el.checkItems.eq(i).is(":checked")){
						filterHolder.push(formUpdate.el.checkItems.eq(i).val());
					}
				} else {
					filterHolder.push(formUpdate.el.checkItems.eq(i).val());
				}
			}

			filterJoined = "." + filterHolder.join('.');
			$('.map-icon').css('display', 'none');
			$(filterJoined).css('display', 'block');

		});
	},

	init: function() {
		this.cacheElems();
		this.bindElm();
	}
};

formUpdate.init();

// LOCATION INPUT

var locationInput = {

	el: {},

	cacheElems: function() {
		this.el.locationInput = $('.location-input');
		this.el.button = $('.find-a-class');
	},

	init: function() {
		var self = this;
		this.cacheElems();

		this.el.locationInput.keypress(function(e) {
			var src = self.el.button.attr('href');

			if (e.which === 13) {
				window.location = src;
			}
		});
	}
};

locationInput.init();
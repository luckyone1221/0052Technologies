"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var JSCCommon = {
	// /tabs
	ifie: function ifie() {
		var isIE11 = !!window.MSInputMethodContext && !!document.documentMode;

		if (isIE11) {
			document.body.insertAdjacentHTML("beforeend", '<div class="browsehappy">	<p class=" container">К сожалению, вы используете устаревший браузер. Пожалуйста, <a href="http://browsehappy.com/" target="_blank">обновите ваш браузер</a>, чтобы улучшить производительность, качество отображаемого материала и повысить безопасность.</p></div>');
		}
	},
	// tabs  .
	tabscostume: function tabscostume(tab) {
		var tabs = {
			Btn: [].slice.call(document.querySelectorAll(".".concat(tab, "__btn"))),
			BtnParent: [].slice.call(document.querySelectorAll(".".concat(tab, "__caption"))),
			Content: [].slice.call(document.querySelectorAll(".".concat(tab, "__content")))
		};
		tabs.Btn.forEach(function (element, index) {
			element.addEventListener('click', function () {
				if (!element.classList.contains('active')) {
					//turn off old
					var oldActiveEl = element.closest(".".concat(tab)).querySelector(".".concat(tab, "__btn.active"));
					var oldActiveContent = tabs.Content[index].closest(".".concat(tab)).querySelector(".".concat(tab, "__content.active"));
					oldActiveEl.classList.remove('active');
					oldActiveContent.classList.remove('active'); //turn on new(cklicked el)

					element.classList.add('active');
					tabs.Content[index].classList.add('active');
				}
			});
		});
	},
	sendForm: function sendForm() {
		var gets = function () {
			var a = window.location.search;
			var b = new Object();
			var c;
			a = a.substring(1).split("&");

			for (var i = 0; i < a.length; i++) {
				c = a[i].split("=");
				b[c[0]] = c[1];
			}

			return b;
		}(); // form


		$(document).on('submit', "form", function (e) {
			e.preventDefault();
			var th = $(this);
			var data = th.serialize();
			th.find('.utm_source').val(decodeURIComponent(gets['utm_source'] || ''));
			th.find('.utm_term').val(decodeURIComponent(gets['utm_term'] || ''));
			th.find('.utm_medium').val(decodeURIComponent(gets['utm_medium'] || ''));
			th.find('.utm_campaign').val(decodeURIComponent(gets['utm_campaign'] || ''));
			$.ajax({
				url: 'action.php',
				type: 'POST',
				data: data
			}).done(function (data) {
				$.fancybox.close();
				console.log('open ty');
				$.fancybox.open({
					src: '#modal-thanks',
					type: 'inline'
				}); // window.location.replace("/thanks.html");

				setTimeout(function () {
					// Done Functions
					th.trigger("reset");
				}, 4000);
			}).fail(function () {});
		});
	},
	modalCall: function modalCall() {
		$(".link-modal-js").fancybox({
			arrows: false,
			infobar: false,
			touch: false,
			type: 'inline',
			autoFocus: false,
			i18n: {
				en: {
					CLOSE: "Закрыть",
					NEXT: "Вперед",
					PREV: "Назад"
				}
			}
		});
		$(".modal-close-js").click(function () {
			$.fancybox.close();
		});
		$.fancybox.defaults.backFocus = false;
		var linkModal = document.querySelectorAll('.link-modal-js');

		function addData() {
			linkModal.forEach(function (element) {
				element.addEventListener('click', function () {
					var modal = document.querySelector(element.getAttribute("href"));
					var data = element.dataset;

					function setValue(val, elem) {
						if (elem && val) {
							var el = modal.querySelector(elem);
							el.tagName == "INPUT" ? el.value = val : el.innerHTML = val; // console.log(modal.querySelector(elem).tagName)
						}
					}

					setValue(data.title, '.form-wrap__title');
					setValue(data.text, '.after-headline');
					setValue(data.btn, '.btn');
					setValue(data.order, '[name="order"]');
				});
			});
		}

		if (linkModal) addData();
		$(".sProjects-box__learn-more-btn").each(function () {
			$(this).attr('data-order', 'Узнать больше о: ' + $(this).parents(".sProjects-box").find(".sProjects-box__sub-title").text());
		});
	},
	// /modalCall
	heightwindow: function heightwindow() {
		// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
		var vh = window.innerHeight * 0.01; // Then we set the value in the --vh custom property to the root of the document

		document.documentElement.style.setProperty('--vh', "".concat(vh, "px")); // We listen to the resize event

		window.addEventListener('resize', function () {
			// We execute the same script as before
			var vh = window.innerHeight * 0.01;
			document.documentElement.style.setProperty('--vh', "".concat(vh, "px"));
		}, {
			passive: true
		});
	},
	checkEmptyVal: function checkEmptyVal() {
		this.value !== '' || this.tagName == "SELECT" && this.querySelector('option').value !== null && this.querySelector('option').text || this.type == "date" ? $(this).addClass('not-empty') : $(this).removeClass('not-empty');
	},
	inputMask: function inputMask() {
		// mask for input
		var InputTel = [].slice.call(document.querySelectorAll('input[type="tel"]'));
		InputTel.forEach(function (element) {
			element.setAttribute("pattern", "[+][0-9]{1}[(][0-9]{3}[)][0-9]{3}-[0-9]{2}-[0-9]{2}");
		});
		Inputmask("+9(999)999-99-99", {
			showMaskOnHover: false
		}).mask(InputTel);
	}
};
var $ = jQuery;

function eventHandler() {
	JSCCommon.ifie(); // JSCCommon.tabscostume('tabs');

	JSCCommon.heightwindow();
	JSCCommon.modalCall();
	JSCCommon.sendForm();
	JSCCommon.checkEmptyVal();
	JSCCommon.inputMask(); //

	var topNav = document.querySelector('.top-nav  ');

	if (topNav) {
		window.addEventListener('scroll', setFixedClass, {
			passive: true
		});
		window.addEventListener('resize', setFixedClass, {
			passive: true
		});
		setFixedClass();
		window.setTimeout(function () {
			setFixedClass();
		}, 100);
	}

	function setFixedClass() {
		if (window.scrollY > 0) {
			topNav.classList.add('fixed');
		} else {
			topNav.classList.remove('fixed');
		}
	} // modal window
	//luckyone js
	//menu js


	$('.toggle-menu-mobile--js').click(function () {
		document.body.removeEventListener('click', mobMenuMissClick);
		$('.toggle-menu-mobile--js').toggleClass('on');
		$('body').toggleClass('fixed');
		$('.menu-mobile--js').toggleClass('active');
		window.setTimeout(function () {
			document.body.addEventListener('click', mobMenuMissClick);
		}, 10);
	});

	function mobMenuMissClick() {
		if (!event.target.closest('.menu-mobile--js')) {
			$('.toggle-menu-mobile--js').removeClass('on');
			$('body').removeClass('fixed');
			$('.menu-mobile--js').removeClass('active');
		}
	}

	var def = {
		slidesPerView: 'auto',
		freeMode: true,
		freeModeMomentum: true,
		watchOverflow: true,
		watchSlidesVisibility: true
	}; //sliders
	// let tabsSlider = new Swiper('.tabs-slider-js', {
	// });

	function slideWithThumbs() {
		var th = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '.gallery-thumbs';
		var sl = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '.gallery-top';
		var galleryThumbs = new Swiper(th, _objectSpread(_objectSpread({}, def), {}, {
			breakpoints: {
				0: {
					spaceBetween: 20
				},
				768: {
					spaceBetween: 32
				},
				1500: {
					spaceBetween: 58
				}
			}
		}));
		var galleryTop = new Swiper(sl, {
			spaceBetween: 10,
			thumbs: {
				swiper: galleryThumbs
			}
		});
	}

	slideWithThumbs();
	slideWithThumbs('.gallery-thumbs2', '.gallery-top2'); //wow js

	var wow = new WOW({
		mobile: false
	});
	wow.init(); //end luckyone js

	$('.has-ph-js').blur(JSCCommon.checkEmptyVal);
	$('.has-ph-js').each(JSCCommon.checkEmptyVal);
	$('.select-custom--js').on('select2:select', JSCCommon.checkEmptyVal);
	$('.select-custom--js').select2();
}

;

if (document.readyState !== 'loading') {
	eventHandler();
} else {
	document.addEventListener('DOMContentLoaded', eventHandler);
}
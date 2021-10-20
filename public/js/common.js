const JSCCommon = {
	// /tabs
	ifie() {
		var isIE11 = !!window.MSInputMethodContext && !!document.documentMode;
		if (isIE11) {
			document.body.insertAdjacentHTML("beforeend", '<div class="browsehappy">	<p class=" container">К сожалению, вы используете устаревший браузер. Пожалуйста, <a href="http://browsehappy.com/" target="_blank">обновите ваш браузер</a>, чтобы улучшить производительность, качество отображаемого материала и повысить безопасность.</p></div>');
		}
	},
	// tabs  .
	tabscostume(tab) {
		let tabs = {
			Btn: [].slice.call(document.querySelectorAll(`.${tab}__btn`)),
			BtnParent: [].slice.call(document.querySelectorAll(`.${tab}__caption`)),
			Content: [].slice.call(document.querySelectorAll(`.${tab}__content`)),
		}
		tabs.Btn.forEach((element, index) => {
			element.addEventListener('click', () => {
				if (!element.classList.contains('active')) {
					//turn off old
					let oldActiveEl = element.closest(`.${tab}`).querySelector(`.${tab}__btn.active`);
					let oldActiveContent = tabs.Content[index].closest(`.${tab}`).querySelector(`.${tab}__content.active`);

					oldActiveEl.classList.remove('active');
					oldActiveContent.classList.remove('active')

					//turn on new(cklicked el)
					element.classList.add('active');
					tabs.Content[index].classList.add('active');
				}
			})
		})
	},
	sendForm() {
		var gets = (function () {
			var a = window.location.search;
			var b = new Object();
			var c;
			a = a.substring(1).split("&");
			for (var i = 0; i < a.length; i++) {
				c = a[i].split("=");
				b[c[0]] = c[1];
			}
			return b;
		})();
		// form
		$(document).on('submit', "form", function (e) {
			e.preventDefault();
			const th = $(this);
			var data = th.serialize();
			th.find('.utm_source').val(decodeURIComponent(gets['utm_source'] || ''));
			th.find('.utm_term').val(decodeURIComponent(gets['utm_term'] || ''));
			th.find('.utm_medium').val(decodeURIComponent(gets['utm_medium'] || ''));
			th.find('.utm_campaign').val(decodeURIComponent(gets['utm_campaign'] || ''));
			$.ajax({
				url: 'action.php',
				type: 'POST',
				data: data,
			}).done(function (data) {

				Fancybox.close();
				console.log('open ty');
				Fancybox.show([{ src: "#modal-thanks", type: "inline" }]);
				// window.location.replace("/thanks.html");
				setTimeout(function () {
					// Done Functions
					th.trigger("reset");
				}, 4000);
			}).fail(function () { });

		});
	},
	modalCall() {
		const link = ".link-modal-js";

		Fancybox.bind(link, {
			arrows: false,
			infobar: false,
			touch: false,
			infinite: false,
			dragToClose: false,
			type: 'inline',
			autoFocus: false,
			l10n: {
				Escape: "Закрыть",
				NEXT: "Вперед",
				PREV: "Назад",
			},
		});
		document.querySelectorAll(".modal-close-js").forEach(el => {
			el.addEventListener("click", () => {
				Fancybox.close();
			})
		})
		// fancybox.defaults.backFocus = false;
		const linkModal = document.querySelectorAll(link);
		function addData() {
			linkModal.forEach(element => {
				element.addEventListener('click', () => {
					let modal = document.querySelector(element.getAttribute("href"));
					const data = element.dataset;

					function setValue(val, elem) {
						if (elem && val) {
							const el = modal.querySelector(elem)
							el.tagName == "INPUT"
								? el.value = val
								: el.innerHTML = val;
							// console.log(modal.querySelector(elem).tagName)
						}
					}
					setValue(data.title, '.form-wrap__title');
					setValue(data.text, '.after-headline');
					setValue(data.btn, '.btn');
					setValue(data.order, '.order');
				})
			})
		}
		if (linkModal) addData();
	},
	// /modalCall
	heightwindow() {
		// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
		let vh = window.innerHeight * 0.01;
		// Then we set the value in the --vh custom property to the root of the document
		document.documentElement.style.setProperty('--vh', `${vh}px`);

		// We listen to the resize event
		window.addEventListener('resize', () => {
			// We execute the same script as before
			let vh = window.innerHeight * 0.01;
			document.documentElement.style.setProperty('--vh', `${vh}px`);
		}, { passive: true });
	},
	checkEmptyVal() {
		((this.value !== '' || (this.tagName == "SELECT" && (this.querySelector('option').value !== null && this.querySelector('option').text))) || this.type == "date")
			? $(this).addClass('not-empty')
			: $(this).removeClass('not-empty')
	},
	inputMask() {
		// mask for input
		let InputTel = [].slice.call(document.querySelectorAll('input[type="tel"]'));
		InputTel.forEach(function (element) {
			element.setAttribute("pattern", "[+][0-9]{1}[(][0-9]{3}[)][0-9]{3}-[0-9]{2}-[0-9]{2}")
		});
		Inputmask("+9(999)999-99-99", { showMaskOnHover: false, }).mask(InputTel);
	},
};
const $ = jQuery;

function eventHandler() {
	JSCCommon.ifie();
	// JSCCommon.tabscostume('tabs');
	JSCCommon.heightwindow();
	JSCCommon.modalCall();
	JSCCommon.sendForm();
	JSCCommon.checkEmptyVal();
	JSCCommon.inputMask();


	let topNav = document.querySelector('.top-nav  ');

	function setFixedClass() {
		if (window.scrollY > 0) {
			topNav.classList.add('fixed');
		}
		else {
			topNav.classList.remove('fixed');
		}
	}
	//
	if (topNav) {
		window.addEventListener('scroll', setFixedClass, { passive: true });
		window.addEventListener('resize', setFixedClass, { passive: true });

		setFixedClass();
		window.setTimeout(function () {
			setFixedClass();
		}, 100);
	}
	// modal window

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

	let def = {
		slidesPerView: 'auto',
		freeMode: true,
		freeModeMomentum: true,
		watchOverflow: true,
		watchSlidesVisibility: true,

	}
	//sliders
	// let tabsSlider = new Swiper('.tabs-slider-js', {


	// });
	function slideWithThumbs(th = '.gallery-thumbs', sl = '.gallery-top') {


		var galleryThumbs = new Swiper(th, {

			...def,
			breakpoints: {
				0: {
					spaceBetween: 20,
				},
				768: {
					spaceBetween: 32,
				},
				1500: {
					spaceBetween: 58,
				}
			},
		});
		var galleryTop = new Swiper(sl, {
			spaceBetween: 10,

			thumbs: {
				swiper: galleryThumbs
			}
		});
	}
	slideWithThumbs()
	slideWithThumbs('.gallery-thumbs2', '.gallery-top2');
	//wow js
	let wow = new WOW({
		mobile: false
	});
	wow.init();
	//end luckyone js

	$('.has-ph-js').blur(JSCCommon.checkEmptyVal);
	$('.has-ph-js').each(JSCCommon.checkEmptyVal);
	$('.select-custom--js').on('select2:select', JSCCommon.checkEmptyVal);
	$('.select-custom--js').select2();
};
if (document.readyState !== 'loading') {
	eventHandler();
} else {
	document.addEventListener('DOMContentLoaded', eventHandler);
}
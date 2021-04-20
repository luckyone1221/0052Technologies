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
	modalCall() {

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
					PREV: "Назад",
					// PLAY_START: "Start slideshow",
					// PLAY_STOP: "Pause slideshow",
					// FULL_SCREEN: "Full screen",
					// THUMBS: "Thumbnails",
					// DOWNLOAD: "Download",
					// SHARE: "Share",
					// ZOOM: "Zoom"
				},
			},
			beforeLoad: function () {
				//if (!document.querySelector("html").classList.contains(".fixed")) document.querySelector("html").style.marginRight = scrollWidth + 'px';
			},
			afterClose: function () {
				//if (!document.querySelector("html").classList.contains(".fixed")) document.querySelector("html").style.marginRight = null;
				// 	document.querySelector("html").classList.remove("fixed")
			},
		});
		$(".modal-close-js").click(function () {
			$.fancybox.close();
		})
		$.fancybox.defaults.backFocus = false;
		const linkModal = document.querySelectorAll('.link-modal-js');
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
					setValue(data.title, '.ttu');
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
		(this.value !== '' || this.type == "date")
			? $(this).addClass('not-empty')
			: $(this).removeClass('not-empty')
	},
};
const $ = jQuery;

function eventHandler() {
	JSCCommon.ifie();
	JSCCommon.tabscostume('tabs');
	JSCCommon.heightwindow();
	JSCCommon.modalCall();
	JSCCommon.checkEmptyVal();


	$('.has-ph-js').blur(JSCCommon.checkEmptyVal);
	$('.has-ph-js').each(JSCCommon.checkEmptyVal);

	//
	let topNav = document.querySelector('.top-nav  ');
	if (topNav){
		window.addEventListener('scroll', setFixedClass, { passive: true });
		window.addEventListener('resize', setFixedClass, { passive: true });

		setFixedClass();
		window.setTimeout(function (){
			setFixedClass();
		}, 100);
	}
	function setFixedClass(){
		if (window.scrollY > 0){
			topNav.classList.add('fixed');
		}
		else{
			topNav.classList.remove('fixed');
		}
	}
	// modal window

	//luckyone js
	//menu js
	$('.toggle-menu-mobile--js').click(function (){
		document.body.removeEventListener('click', mobMenuMissClick);

		$('.toggle-menu-mobile--js').toggleClass('on');
		$('body').toggleClass('fixed');
		$('.menu-mobile--js').toggleClass('active');

		window.setTimeout(function (){
			document.body.addEventListener('click', mobMenuMissClick);
		}, 10);
	});

	function mobMenuMissClick(){
		if(!event.target.closest('.menu-mobile--js')){
			$('.toggle-menu-mobile--js').removeClass('on');
			$('body').removeClass('fixed');
			$('.menu-mobile--js').removeClass('active');
		}
	}
	//sliders
	let tabsSlider = new Swiper('.tabs-slider-js', {
		slidesPerView: 'auto',
		freeMode: true,
		freeModeMomentum: true,
		watchOverflow: true,

		breakpoints:{
			0:{
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

	let sProjectsTabsSlider = new Swiper('.sProject-tabs-slider-js', {
		slidesPerView: 'auto',
		freeMode: true,
		freeModeMomentum: true,
		watchOverflow: true,

		breakpoints:{
			0:{
				spaceBetween: 20,
			},
			768: {
				spaceBetween: 32,
			}
		},

	});
	//wow js
	let wow = new WOW({
		mobile: false
	});
	wow.init();
	//end luckyone js
};
if (document.readyState !== 'loading') {
	eventHandler();
} else {
	document.addEventListener('DOMContentLoaded', eventHandler);
}
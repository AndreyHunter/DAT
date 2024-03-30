import Swiper from 'swiper/bundle';

export const swiper = new Swiper('#novetlySlider', {
	direction: 'horizontal',
	slidesPerView: 4,
	spaceBetween: 30,
	speed: 400,
	allowTouchMove: false,
	freeMode: true,
	observer: true,
	observeParents: true,
	observeSlideChildren: true,

	pagination: {
		el: '.novetly__slider-bullet',
		clickable: true,
	},

	navigation: {
		prevEl: '.prev',
		nextEl: '.next',
	},
});

export const promotionSlider = new Swiper('#promotion__slider', {
	direction: 'horizontal',
	slidesPerView: 4,
	spaceBetween: 30,
	speed: 400,
	allowTouchMove: false,
	freeMode: true,
	observer: true,
	observeParents: true,
	observeSlideChildren: true,

	pagination: {
		el: '.promotion__slider-bullet',
		clickable: true,
	},

	navigation: {
		prevEl: '.prev-2',
		nextEl: '.next-2',
	},
});

export const swiper3 = new Swiper('#partners__slider', {
	direction: 'horizontal',
	slidesPerView: 4,
	spaceBetween: 30,
	speed: 400,
	allowTouchMove: true,
	freeMode: true,
	observer: true,
	observeParents: true,
	observeSlideChildren: true,

	pagination: {
		el: '.partners__slider-bullet',
		clickable: true,
	},

	navigation: {
		prevEl: '.prev-3',
		nextEl: '.next-3',
	},
});

export const productSubSlider = new Swiper('#product-sub-slider', {
	direction: 'horizontal',
	slidesPerView: 3,
	spaceBetween: 30,
	freeMode: true,
	observer: true,
	observeParents: true,
	observeSlideChildren: true,
	watchSlidesProgress: true,
});


export const productSlider = new Swiper('#product-slider', {
	slidesPerView: 1,
	spaceBetween: 0,
	speed: 400,
	allowTouchMove: false,
	freeMode: false,
	observer: true,
	observeParents: true,
	observeSlideChildren: true,

	navigation: {
		prevEl: '.product-slider__prev',
		nextEl: '.product-slider__next',
	},
	thumbs: {
		swiper: productSubSlider,
	},
	autoplay: {
		delay: 10000,
	},
});

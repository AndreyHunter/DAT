import Swiper from 'swiper';
import { Navigation, Pagination, Thumbs } from 'swiper/modules';

const commonSwiperOptions = {
	modules: [Navigation, Pagination, Thumbs],
	direction: 'horizontal',
	allowTouchMove: false,
	freeMode: true,
	observer: true,
	observeParents: true,
	observeSlideChildren: true,
};

const initialndexSliders = () => {
	new Swiper('#novetlySlider', {
		...commonSwiperOptions,
		slidesPerView: 4,
		spaceBetween: 30,
		speed: 400,
		pagination: {
			el: '.novetly__slider-bullet',
			clickable: true,
		},
		navigation: {
			prevEl: '.prev',
			nextEl: '.next',
		},
	});

	new Swiper('#promotion__slider', {
		...commonSwiperOptions,
		slidesPerView: 4,
		spaceBetween: 30,
		speed: 400,
		pagination: {
			el: '.promotion__slider-bullet',
			clickable: true,
		},
		navigation: {
			prevEl: '.prev-2',
			nextEl: '.next-2',
		},
	});

	new Swiper('#partners__slider', {
		...commonSwiperOptions,
		slidesPerView: 4,
		spaceBetween: 30,
		speed: 400,
		pagination: {
			el: '.partners__slider-bullet',
			clickable: true,
		},
		navigation: {
			prevEl: '.prev-3',
			nextEl: '.next-3',
		},
	});
};

const initialProductSlider = () => {
	const productSubSlider = new Swiper('#product-sub-slider', {
		...commonSwiperOptions,
		slidesPerView: 3,
		spaceBetween: 30,
	});

	new Swiper('#product-slider', {
		...commonSwiperOptions,
		slidesPerView: 1,
		speed: 300,
		navigation: {
			prevEl: '.product-slider__prev',
			nextEl: '.product-slider__next',
		},
		thumbs: {
			swiper: productSubSlider,
		},
	});
};

export { initialndexSliders, initialProductSlider };

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

const commonSwiperBreakpoints = {
	breakpoints: {
		1280: {
			slidesPerView: 4,
			spaceBetween: 30,
		},
		770: {
			slidesPerView: 3,
			spaceBetween: 30,
		},
		550: {
			slidesPerView: 2,
			spaceBetween: 30,
		},
		0: {
			slidesPerView: 1,
			spaceBetween: 30,
		},
	},
};

const initialndexSliders = () => {
	const novetlySwiper = new Swiper('#novetlySlider', {
		...commonSwiperOptions,
		...commonSwiperBreakpoints,
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

	const promotionSwiper = new Swiper('#promotion__slider', {
		...commonSwiperOptions,
		...commonSwiperBreakpoints,
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

	const partnersSwiper = new Swiper('#partners__slider', {
		...commonSwiperOptions,
		...commonSwiperBreakpoints,
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

	const updateTouchMoveOption = () => {
		const isTouchMoveAllowed = window.innerWidth <= 1030;
		if (isTouchMoveAllowed) {
			novetlySwiper.allowTouchMove = true;
			promotionSwiper.allowTouchMove = true;
			partnersSwiper.allowTouchMove = true;
		}
	};

	updateTouchMoveOption();

	window.addEventListener('resize', updateTouchMoveOption);
};

const initialProductSlider = () => {
	const productSubSlider = new Swiper('#product-sub-slider', {
		...commonSwiperOptions,
		allowTouchMove: true,
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

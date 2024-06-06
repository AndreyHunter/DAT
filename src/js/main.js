import { PRODUCTS_URL } from './modules/server.js';
import {
	getProductsByIds,
	checkBasketEmpty,
	updateBasketLenght,
} from './modules/basket.js';

import { getItem } from './modules/local-storage.js';
import { createBasketItem } from './modules/render.js';
import { initialChoises } from './modules/choices.js';

import { initialBreadcrambsSlider } from './modules/swiper';

import { modals } from './modules/modals.js';
import openMobileMenu from './modules/mobile-menu.js';

modals();
openMobileMenu('#nav-icon2', '.mobaile-nav', 'open', 'active');
initialBreadcrambsSlider();

// Рендер корзины

getProductsByIds(getItem('basket'), PRODUCTS_URL)
	.then((res) => createBasketItem(res, '.basket__list'))
	.then(() => {
		updateBasketLenght();
		checkBasketEmpty(getItem('basket'));
	})
	.then(() => initialChoises('.basket__product-select'))
	.catch((err) => console.error('Something went wrong', err));

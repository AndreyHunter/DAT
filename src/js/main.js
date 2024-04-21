import { PRODUCTS_URL } from './modules/server.js';
import {
	getProductsByIds,
	checkBasketEmpty,
	updateBasketLenght,
} from './modules/basket.js';

import { getItem } from './modules/local-storage.js';
import { createBasketItem } from './modules/render.js';
import { initialChoises } from './modules/choices.js';

import { modals } from './modules/modals.js';
import openMobileMenu from './modules/mobile-menu.js';

modals();
openMobileMenu('#nav-icon2', '.mobile-nav', 'open', 'active');

// Рендер корзины
const basket = getItem('basket');

getProductsByIds(basket, PRODUCTS_URL)
	.then((res) => createBasketItem(res, '.basket__list'))
	.then(() => {
		updateBasketLenght();
		checkBasketEmpty(basket);
	})
	.then(() => initialChoises('.basket__product-select'))
	.catch((err) => console.error('Something went wrong', err));

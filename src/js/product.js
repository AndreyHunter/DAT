/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-unused-vars */
import { PRODUCTS_URL } from './modules/server.js';
import { getData } from './modules/utils.js';
import { getItem, setItem } from './modules/local-storage.js';

import {
	updateBasketLenght,
	getProductsByIds,
	checkBasketEmpty
} from './modules/basket.js';

import {
	createBasketItem
} from './modules/render.js';

import { initialProductSlider } from './modules/swiper.js';
import { initialChoises } from './modules/choices.js';

import renderProductDescription from './modules/product-info/product-desc';
import renderProductImages from './modules/product-info/product-images';
import renderProductInfo from './modules/product-info/product-info';
import renderBreadCrambs from './modules/product-info/breadcrambs';

import { modals } from './modules/modals.js';
import tabs from './modules/tabs.js';

modals();

tabs({
	wrapperSelector: '.product-details',
	tabSelector: '.product-details__btn',
	contentSelector: '[data-content]',
	tabActiveClass: 'active',
	contentActiveClass: 'active',
	initialContentIndex: 0,
});

initialProductSlider();

// Рендер корзины
getProductsByIds(getItem('basket'), PRODUCTS_URL)
	.then((res) => createBasketItem(res, '.basket__list'))
	.then(() => {
		updateBasketLenght();
		checkBasketEmpty(getItem('basket'));
	})
	.then(() => initialChoises('.basket__product-select'))
	.catch((err) => console.error('Something went wrong', err));

// Получение продуктов
getData(PRODUCTS_URL)
	.then((res) => loadProductDetails(res))
	.catch((err) => console.error('Something went wrong', err));

const loadProductDetails = (data) => {
	if (!data || !data.length) return;

	const productId = Number(getParamerFromURL('id'));

	if (!productId) return;

	const productObj = data.find((card) => card.id === productId);

	if (!productObj) return;

	renderBreadCrambs(productObj);
	renderProductImages(productObj);
	renderProductInfo(productObj);
	renderProductDescription(productObj);
};

const getParamerFromURL = (parametr) => {
	const urlParams = new URLSearchParams(window.location.search);
	return urlParams.get(parametr);
};

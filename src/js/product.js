/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-unused-vars */
import { initialProductSlider } from './modules/swiper.js';
import {initialChoises} from './modules/choices.js';
import { productsData } from './modules/server.js';
import { getData } from './modules/utils.js';
import {
	createBasketItem,
	renderProductImages,
	renderBreadCrambs,
	renderProductInfo,
	renderProductDescription,
	updateBasketLenght,
	getProductsByIds,
} from './modules/render.js';
import { getItem, setItem } from './modules/local-storage.js';

import { modals } from './modules/modals.js';
import tabs from './modules/tabs.js';
modals();

initialProductSlider();

tabs({
	wrapperSelector: '.product-details',
	tabSelector: '.product-details__btn',
	contentSelector: '[data-content]',
	tabActiveClass: 'active',
	contentActiveClass: 'active',
	initialContentIndex: 0,
});

let produtsArray = [];

// Рендер корзины
getProductsByIds(getItem('basket'), productsData)
	.then((res) => createBasketItem(res, '.basket__list'))
	.then(() => updateBasketLenght())
	.then(() => initialChoises('.basket__product-select'))
	.catch((err) => console.error('Something went wrong', err));

// Получение продуктов
getData(productsData)
	.then((res) => (produtsArray = [...res.novetly, ...res.promotions]))
	.then(() => loadProductDetails(produtsArray))
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

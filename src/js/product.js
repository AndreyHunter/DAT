/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-unused-vars */
import { initialProductSlider } from './modules/swiper.js';
import Choices from 'choices.js';
import choisesSettings from './modules/choices.js';
import { productsData } from './modules/server.js';
import { getData } from './modules/utils.js';
import {
	createBasketItem,
	renderProductImages,
	renderBreadCrambs,
	renderProductInfo,
	renderProductDescription,
} from './modules/render-products.js';
import {
	getItem,
	setItem,
	updateBasketLenght,
	getProductsByIds,
} from './modules/local-storage.js';

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
	.then(() => {
		const elements = document.querySelectorAll('.basket__product-select');
		elements.forEach((select) => new Choices(select, choisesSettings));
	});

// Получение продуктов
getData(productsData)
	.then((res) => (produtsArray = [...res.novetly, ...res.promotions]))
	.then(() => loadProductDetails(produtsArray));

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
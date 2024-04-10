// eslint-disable-next-line no-unused-vars
import { initialndexSliders } from './modules/swiper.js';
import Choices from 'choices.js';
import choisesSettings from './modules/choices.js';
import { productsData } from './modules/server.js';
import { getData } from './modules/utils.js';
import { createProductCard, createBasketItem } from './modules/render-products.js';
import {
	getItem,
	setItem,
	updateBasketLenght,
	updateBasketBgColor,
	getProductsByIds,
} from './modules/local-storage.js';

import { modals, openModal } from './modules/modals.js';

modals();
initialndexSliders();

getData(productsData)
	.then((response) => {
		createProductCard(response.novetly, '#novetlySliderWrapper');
		createProductCard(response.promotions, '#promotion-sliderWrapper');
	})
	.then(() => {
		getProductsByIds(getItem('basket'), productsData)
			.then((products) => createBasketItem(products, '.basket__list'))
			.then(() => {
				const elements = document.querySelectorAll('.basket__product-select');
				elements.forEach((select) => new Choices(select, choisesSettings));
			})
			.catch((error) => console.error('Error:', error));
	})
	.then(() => updateBasketLenght())
	.then(() => updateBasketBgColor(getItem('basket')))
	.catch((err) => console.error('Something went wrong', err));

const addToBasket = async (e) => {
	const targetButton = e.target.closest('.addToBasketBtn');
	if (!targetButton) return;

	const card = targetButton.closest('.product__card');
	if (!card) return;

	const id = card.dataset.productid;

	let basket = getItem('basket');

	if (!Array.isArray(basket)) {
		basket = [];
	}

	if (basket.includes(id)) {
		const index = basket.indexOf(id);
		basket.splice(index, 1);
	} else {
		basket.push(id);
		openModal('.basket', '.basket__content', 'showModal', 'showModal-scale');
	}

	setItem('basket', basket);
	updateBasketBgColor(basket);
	const basketArray = await getProductsByIds(basket, productsData);
	createBasketItem(basketArray, '.basket__list');
	const elements = document.querySelectorAll('.basket__product-select');
	elements.forEach((select) => new Choices(select, choisesSettings));
};

window.addEventListener('click', addToBasket);

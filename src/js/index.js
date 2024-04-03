// eslint-disable-next-line no-unused-vars
import Swiper from './modules/swiper.js';

import Choices from 'choices.js';
import { choisesSettings } from './modules/choices.js';

import { productsData } from './modules/server.js';

import { getProducts } from './modules/utils.js';
import { createProductCard, createBasketItem } from './modules/render-products.js';

import {
	getItem,
	setItem,
	updateBasketLenght,
	updateBasketBgColor,
	getProductsByIds,
} from './modules/local-storage.js';

import { openModal, closeModal } from './modules/modal.js';

// Закрытие и открытие модального окна корзины
const basketBtn = document.querySelector('.user-actions__basket');
basketBtn.onclick = () =>  openModal('.basket', '.basket__content');

window.addEventListener('click', (e) => {
	const target = e.target;
	const basketModal = document.querySelector('.basket');
	const closeBtn = target.closest('.basket__closeBtn');
	const continueBtn = target.closest('.continue-shopping-btn');

	if (!basketModal.classList.contains('showModal')) return;

	if (target.classList.contains('basket')) closeModal('.basket', '.basket__content');

	if (closeBtn || continueBtn) closeModal('.basket', '.basket__content');
});

document.addEventListener('keydown', (e) => {
	const basket = document.querySelector('.basket');
	if (e.code === 'Escape' && basket.classList.contains('showModal')) {
		closeModal('.basket', '.basket__content');
	} else {
		return;
	}
});

getProducts(productsData)
	.then((response) => {
		createProductCard(response.novetly, '#novetlySliderWrapper');
		createProductCard(response.promotions, '#promotion-sliderWrapper');
	})
	.then(() => {
		const basket = getItem();
		getProductsByIds(basket, productsData)
			.then((products) => createBasketItem(products, '.basket__list'))
			.then(() => {
				const elements = document.querySelectorAll('.basket__product-select');
				elements.forEach((select) => new Choices(select, choisesSettings));
			})
			.catch((error) => console.error('Error:', error));
	})
	.then(() => updateBasketLenght())
	.then(() => updateBasketBgColor(getItem()))
	.catch((err) => console.error('Something went wrong', err));

window.addEventListener('click', addToBasket);

async function addToBasket(e) {
	const targetButton = e.target.closest('.addToBasketBtn');
	if (!targetButton) return;

	const card = targetButton.closest('.product__card');
	if (!card) return;

	const id = card.dataset.productid;

	let basket = getItem();

	if (!Array.isArray(basket)) {
		basket = [];
	}

	if (basket.includes(id)) {
		const index = basket.indexOf(id);
		basket.splice(index, 1);
	} else {
		basket.push(id);
		openModal('.basket', '.basket__content');
	}

	setItem(basket);
	updateBasketBgColor(basket);
	const basketArray = await getProductsByIds(basket, productsData);
	createBasketItem(basketArray, '.basket__list');
	const elements = document.querySelectorAll('.basket__product-select');
	elements.forEach((select) => new Choices(select, choisesSettings));
}

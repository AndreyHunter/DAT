/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-unused-vars */
import { Swiper } from './modules/swiper.js';
import Choices from 'choices.js';
import { choisesSettings } from './modules/choices.js';
import { productsData } from './modules/server.js';
import {getProducts} from './modules/utils.js';
import { 
	createBasketItem,
	renderProductImages,
	renderBreadCrambs,
	renderProductInfo,
	renderProductDescription
} from './modules/render-products.js';
import {
	getItem,
	setItem,
	updateBasketLenght,
	getProductsByIds,
} from './modules/local-storage.js';

import { openModal, closeModal } from './modules/modal.js';

let produtsArray = [];

// Функционал открытия и закрытия модального окна карзины 
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

// Рендер корзины
const basketItems = getItem();
getProductsByIds(basketItems, productsData)
	.then((res) => createBasketItem(res, '.basket__list'))
	.then(() => updateBasketLenght())
	.then(() => {
		const elements = document.querySelectorAll('.basket__product-select');
		elements.forEach((select) => new Choices(select, choisesSettings));
	});

// Получение продуктов 
getProducts(productsData)
	.then((res) => produtsArray = [...res.novetly, ...res.promotions])
	.then(() => loadProductDetails(produtsArray));

function loadProductDetails(data) {
	if (!data || !data.length) return;

	const productId = Number(getParamerFromURL('id'));

	if (!productId) return;

	const productObj = produtsArray.find(card => card.id  === productId);

	if (!productObj) return;

	renderBreadCrambs(productObj);
	renderProductImages(productObj);
	renderProductInfo(productObj);
	renderProductDescription(productObj);
}

function getParamerFromURL(parametr) {
	const urlParams = new URLSearchParams(window.location.search);
	console.log(urlParams);
	return urlParams.get(parametr);
}

// Табы

const tabsParent = document.querySelector('.product-details');

tabsParent.addEventListener('click', (e) => {
	const target = e.target;
	const tabsButtons = tabsParent.querySelectorAll('.product-details__btn');
	const tabsContent = tabsParent.querySelectorAll('[data-content]');

	if (!target.classList.contains('active')) {
		tabsButtons.forEach( (btn, index) => {
			if (target === btn) {
				tabsButtons.forEach(btn => btn.classList.remove('active'));
	            tabsContent.forEach(content => content.classList.remove('active'));
				tabsButtons[index].classList.add('active');
				tabsContent[index].classList.add('active');
			}
		});
	}

});
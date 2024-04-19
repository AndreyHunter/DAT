// eslint-disable-next-line no-unused-vars
import { initialndexSliders } from './modules/swiper.js';
import {initialChoises, choisesMenu} from './modules/choices.js';
import { PRODUCTS_URL } from './modules/server.js';
import { getData } from './modules/utils.js';
import {
	createProductCard,
	createBasketItem,
} from './modules/render.js';
import { getItem, setItem } from './modules/local-storage.js';
import {
	updateBasketLenght,
	updateBasketBgColor,
	getProductsByIds,
	checkBasketEmpty
} from './modules/basket.js';

import { modals, openModal } from './modules/modals.js';
import openMobileMenu from './modules/mobile-menu.js';

modals();
initialndexSliders();
openMobileMenu('#nav-icon2', '.mobile-nav', 'open', 'active');
choisesMenu();

// Рендер продуктов
getData(PRODUCTS_URL)
	.then((response) => {
		const novetly = response.filter(product => product.isNew === true);
		const promotions = response.filter(product => product.isPromotion === true);
		createProductCard(novetly, '#novetlySliderWrapper');
		createProductCard(promotions, '#promotion-sliderWrapper');
	})
	.then(() => {
		updateBasketLenght();
		updateBasketBgColor(getItem('basket'));
	})
	.catch((err) => console.error('Something went wrong', err));

// Рендер корзины
getProductsByIds(getItem('basket'), PRODUCTS_URL)
	.then((products) => createBasketItem(products, '.basket__list'))
	.then(() => checkBasketEmpty(getItem('basket')))
	.then(() => initialChoises('.basket__product-select'))
	.catch((error) => console.error('Error:', error));

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

	updateBasketBgColor(basket);
	const basketArray = await getProductsByIds(basket, PRODUCTS_URL);
	createBasketItem(basketArray, '.basket__list');
	initialChoises('.basket__product-select');
    
	setItem('basket', basket);

	checkBasketEmpty(getItem('basket'));
};



window.addEventListener('click', addToBasket);

import { PRODUCTS_URL } from '../modules/server.js';
import {
	getProductsByIds,
	checkBasketEmpty,
	updateBasketLenght,
	updateBasketBgColor,
} from '../modules/basket.js';

import { getItem, setItem } from '../modules/local-storage.js';
import { createProductCard, createBasketItem } from '../modules/render.js';
import renderCategoryFilter from '../modules/products-page/products-filters.js';
import sortProducts from '../modules/products-page/products-sort.js';
import { initialChoises } from '../modules/choices.js';
import { initialBreadcrambsSlider } from '../modules/swiper.js';

import { modals, openModal } from '../modules/modals.js';
import openMobileMenu from '../modules/mobile-menu.js';
import openNavBarFilter from '../modules/filter-nav-bar';

import { getData } from '../modules/utils.js';

modals();
openMobileMenu('#nav-icon2', '.mobile-nav', 'open', 'active');
openNavBarFilter({
	triggerBtn: '.open-filter-btn',
	closeBtnSelector: '.p-filter-arrow',
	navOverlaySelector: '.products-filters',
	contentSelector: '.p-filter',
	navOverlayClass: 'open',
	contentSelectorClass: 'open'
});
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

// Рендер продуктов 

const renderProducts = async (url) => {
	try {
		const res = await getData(url);
           
		const plantsProtections = res.filter(item => item.category.link === 'plants-protection');
		const adjuvants = plantsProtections.filter(item => item.subCategory?.link === 'adjuvants');

		createProductCard(adjuvants, '.protucts-content__list');
		updateBasketBgColor(getItem('basket'));
		renderCategoryFilter(plantsProtections);
		document.querySelector('.products-length').textContent = `Показано ${adjuvants.length} товарів`;

	} catch (err) {
		console.error('Feiled to fetch', err);
	}
};

// Добавление в корзину 
const addToBasket = async (e) => {
	const targetButton = e.target.closest('.addToBasketBtn');
	if (!targetButton) return;

	const card = targetButton.closest('.product__card');
	if (!card) return;

	const id = card.dataset.productid;

	let basket = getItem('basket');

	if (!basket.includes(id)) {
		basket.push(id);
		openModal('.basket', '.basket__content', 'showModal', 'showModal-scale');
	} else {
		const index = basket.indexOf(id);
		basket.splice(index, 1);
	}

	const basketArray = await getProductsByIds(basket, PRODUCTS_URL);
	createBasketItem(basketArray, '.basket__list');
	initialChoises('.basket__product-select');

	setItem('basket', basket);

	updateBasketLenght();
	updateBasketBgColor(basket);
	checkBasketEmpty(basket);
};

document.querySelector('.protucts-content').addEventListener('click', addToBasket);

renderProducts(PRODUCTS_URL);

// Фильтрация по производителю
const manufacturerFilterContainer = document.querySelector('.p-filter-manufacturer .p-filter__list');
manufacturerFilterContainer.addEventListener('change', async () => {
	try {
		const manufacturerItems = Array.from(manufacturerFilterContainer.querySelectorAll('input[type="checkbox"]:checked'));
		const selectedManufacturers = manufacturerItems.map(checkbox => checkbox.id);
			
		document.querySelector('.protucts-content__list').innerHTML = '';
		
		const res = await getData(PRODUCTS_URL);
		const adjuvants = res.filter(item => item.subCategory?.link === 'adjuvants');

		let filteredProducts = adjuvants;
		if (selectedManufacturers.length > 0) {
			filteredProducts = adjuvants.filter(item => selectedManufacturers.includes(item.manufacturer.id));
		}

		createProductCard(filteredProducts, '.protucts-content__list');
		updateBasketBgColor(getItem('basket'));

	} catch (err) {
		console.error('Error', err);
	}
});

// Сортировка 
document.querySelector('#products-sort').addEventListener('change', (e) => sortProducts(e, {subCategory: 'adjuvants'}));
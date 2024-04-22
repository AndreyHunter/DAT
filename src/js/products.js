import { PRODUCTS_URL } from './modules/server.js';
import {
	getProductsByIds,
	checkBasketEmpty,
	updateBasketLenght,
} from './modules/basket.js';

import { getItem } from './modules/local-storage.js';
import { createProductCard, createBasketItem } from './modules/render.js';
import renderCategoryFilter from './modules/products-page/products-filters';
import { initialChoises } from './modules/choices.js';
import { initialBreadcrambsSlider } from './modules/swiper';

import { modals } from './modules/modals.js';
import openMobileMenu from './modules/mobile-menu.js';


import { getData } from './modules/utils.js';

modals();
openMobileMenu('#nav-icon2', '.mobile-nav', 'open', 'active');
initialBreadcrambsSlider();

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

// Рендер продуктов 

const renderProducts = async (url) => {
	try {
		const res = await getData(url);
           
		const plantsProtections = res.filter(item => item.category.link === 'plants-protection');

		createProductCard(plantsProtections, '.protucts-content__list');
		renderCategoryFilter(plantsProtections);
		document.querySelector('.products-length').textContent = `Показано ${plantsProtections.length} товарів`;

	} catch (err) {
		console.error('Feiled to fetch', err);
	}
};

renderProducts(PRODUCTS_URL);

// Фильтрация по подкатегории
const subCategoryWrapper = document.querySelector('.p-category-filter__list');

subCategoryWrapper.addEventListener('click', async (e) => {
	try {
		const target = e.target;
		if (!target.matches('.p-category-filter__item-title')) return;

		const subcategoryFilters = {
			herbicides: (item) => item.subCategory.link === 'herbicides',
			fungicides: (item) => item.subCategory.link === 'fungicides',
			insecticides: (item) => item.subCategory.link === 'insecticides',
			desiccants: (item) => item.subCategory.link === 'desiccants',
			poisoners: (item) => item.subCategory.link === 'poisoners',
			adjuvants: (item) => item.subCategory.link === 'adjuvants',
			rodenticides: (item) => item.subCategory.link === 'rodenticides',
			retardants: (item) => item.subCategory.link === 'retardants'
		};

		const productsList = document.querySelector('.protucts-content__list');
		productsList.innerHTML = '';

		const filterItem = document.querySelectorAll('.p-category-filter__item-title');
		filterItem.forEach(item => item.classList.remove('active'));
		
  
		const res = await getData(PRODUCTS_URL);
		const plantsProtections = res.filter(item => item.category.link === 'plants-protection');

		const filterFunction = subcategoryFilters[target.id];

		if (filterFunction) {
			const filteredProducts = plantsProtections.filter(filterFunction);
			createProductCard(filteredProducts, '.protucts-content__list');
			target.classList.add('active');
		}

	} catch(err) {
		console.error('Error', err);
	}
});

// Фильтрация по производителю
const manufacturerFilterContainer = document.querySelector('.p-filter-manufacturer .p-filter__list');
manufacturerFilterContainer.addEventListener('change', async () => {
	try {
		const selectedManufacturers = Array.from(manufacturerFilterContainer.querySelectorAll('input[type="checkbox"]:checked')).map(checkbox => checkbox.id);
			
        
		const productsList = document.querySelector('.protucts-content__list');
		productsList.innerHTML = '';

		const res = await getData(PRODUCTS_URL);
		const plantsProtections = res.filter(item => item.category.link === 'plants-protection');

		let filteredProducts = plantsProtections;
		if (selectedManufacturers.length > 0) {
			filteredProducts = plantsProtections.filter(item => selectedManufacturers.includes(item.manufacturer.id));
		}

		createProductCard(filteredProducts, '.protucts-content__list');

	} catch (err) {
		console.error('Error', err);
	}
});



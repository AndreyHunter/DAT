import { createProductCard } from '../render';
import { updateBasketBgColor } from '../basket';
import { PRODUCTS_URL } from '../server';
import { getData } from '../utils';
import { getItem } from '../local-storage';

const sortProducts = async (e, {category, subCategory}) => {
	const target = e.target;

	const data = await getData(PRODUCTS_URL);
	let products;
	
	if (category) {
		products = data.filter(item => item.category?.link === category);
	} else if (subCategory) {
		products = data.filter(item => item.subCategory?.link === subCategory);
	}

	let sortedProducts;

	switch(target.value) {
	case 'poor':
		sortedProducts = products.sort((a, b) => a.price - b.price);
		break;
	case 'expensive':
		sortedProducts = products.sort((a, b) => a.price < b.price ? 1 : -1);
		break; 
	case 'novetly':
		sortedProducts = products.filter(card => card.isNew);
		break;
	default: 
		sortedProducts = products;
		break;
	}
    
	createProductCard(sortedProducts, '.protucts-content__list');
	updateBasketBgColor(getItem('basket'));
};

export default sortProducts;
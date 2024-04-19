import { calcSeedsTotalPrice } from '../calculatePriceTotal';
import {transformPrice} from '../utils';

const renderProductInfo = (dataProductObj) => {
	const { title, inStock, manufacturer, price, category } = dataProductObj;

	const productInfoWrapper = document.querySelector('.product-info__right');
	const productTitle = productInfoWrapper.querySelector('.product-info__title');
	const productInStock = productInfoWrapper.querySelector('.inStock');
	const productManufacturerImage = productInfoWrapper.querySelector(
		'.basket__product-manufacturer-image',
	);
	const productManufacturerTitle =
        productInfoWrapper.querySelector('.manufacturer__title');
	const productInfoPrice = productInfoWrapper.querySelector(
		'.product-info__price strong',
	);
	const productInfoPriceFor = productInfoWrapper.querySelector('.price-for');

	productTitle.textContent = title;
	productManufacturerImage.setAttribute('src', manufacturer.image);
	productManufacturerTitle.textContent = manufacturer.title;

	if (category.link === 'seeds') {
		productInfoPriceFor.textContent = `${transformPrice(price)}грн/5шт`;
		productInfoPrice.textContent = `${calcSeedsTotalPrice(transformPrice(price), 50)} грн`;
		productInfoPrice.nextElementSibling.textContent = 'Ціна за 50 шт';
	}

	if (category.link === 'plants-protection') {
		productInfoPriceFor.textContent = `${transformPrice(price)}грн/2мл`;
		productInfoPrice.textContent = `${transformPrice(price)} грн`;
		productInfoPrice.nextElementSibling.textContent = '';
	}

	if (inStock) {
		productInStock.innerHTML += `
            <svg class="icon inStock-icon">
                <use href="./images/svgsprite/sprite.symbol.svg#check-in-stock-icon"></use>
            </svg>
            В наявності
        `;
	} else {
		productInStock.innerHTML += 'Закінчився 😢';
	}
};

export default renderProductInfo;


import { calcSeedsTotalPrice } from '../calculatePriceTotal';

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
		productInfoPriceFor.textContent = `${price.toFixed(2)}грн/5шт`;
		productInfoPrice.textContent = `${calcSeedsTotalPrice(price.toFixed(2), 50)} грн`;
		productInfoPrice.nextElementSibling.textContent = 'Ціна за 50 шт';
	}

	if (category.link === 'plants-protection') {
		productInfoPriceFor.textContent = `${price.toFixed(2)}грн/2мл`;
		productInfoPrice.textContent = `${price.toFixed(2)} грн`;
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
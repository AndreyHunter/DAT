import { 
	calculateTotalPriceForLiters,
	calcSeedsTotalPrice
} from './calculatePriceTotal';

export function createProductCard(data, selector) {
	const element = document.querySelector(selector);

	for (let key of data) {
		const { id, title, image, price, inStock } = key;

		const novetlyCard = `
            <div class="product__card swiper-slide" data-productid="${id}">
                <svg class="comparison-icon comparison-icon-absolute" width="16" height="16">
                    <use class="svg-comparison-use" xlink:href="./images/svgsprite/sprite.symbol.svg#compration-icon"/>
                </svg>
            
                
                <div class="product__card-image-wrapper">
                    <a href="product.html?id=${id}"><img src="${image}" alt="${title}" class="product__card-image"></a>
                </div>
            
                <div class="product__card-about">
                    <a href="product.html?id=${id}" class="product__card-title">${title}</a>
                    <span class="product__card-stock ${!inStock ? 'inStock-finished' : ''}">${inStock ? 'В наявності' : 'Закінчився'}</span>
                    <span class="product__card-price">${price} грн</span>
                    <span class="product__card-quantity">1 шт</span>
                    <div class="addToBasketBtn">
                        <svg class="basket-icon" width="16" height="16">
                            <use xlink:href="./images/svgsprite/sprite.symbol.svg#basket-icon"/>
                        </svg>
                    </div>
                </div>
            </div>
            `;
		element.insertAdjacentHTML('beforeend', novetlyCard);
	}
}

export function createBasketItem(array, selector) {
	const element = document.querySelector(selector);

	element.innerHTML = '';

	for (let card of array) {
		const { id, title, image, price, options, manufacturer } = card;

		const basketCardHTML = `
                <li class="basket__product" data-productid="${id}">
                <h4 class="basket__product-title">${title}</h4>
                <div class="basket__product-content">
                    <div class="basket__product-left">
                        <div class="basket__product-image-wrapper">
                            <img src="${image}" alt="${title}" class="basket__product-image">
                        </div>

                        <div class="basket__product-about">
                            <h4 class="basket__product-price">${price} грн</h4>
                            <span class="basket__product-price-desc">Ціна за 1</span>
                            <div class="basket__product-manufacturer">
                                <strong class="basket__product-manufacturer-title">Виробник</strong>
                            <div class="basket__product-manufacturer-body">
                                <img class="basket__product-manufacturer-image"
                                src="${manufacturer.image}"
                                    alt="${manufacturer.title}">
                                <span>${manufacturer.title}</span>
                            </div>
                            </div>
                        </div>
                    </div>

                    <div class="basket__product-right">
                        ${options ? createSelect(options) : ''}

                        <div class="product-counter">
                            <div class="product-counter__title">Кількість</div>
                            <div class="product-counter__body">
                                <button class="product-counter__button" data-product-button="minus">-</button>
                                <div class="product-counter__total">1</div>
                                <button class="product-counter__button" data-product-button="plus">+</button>
                            </div>
                        </div>
                    </div>
                </div>
            </li>
            `;
		element.insertAdjacentHTML('beforeend', basketCardHTML);
	}
}

function createSelect(options) {
	const select = document.createElement('select');
	select.classList.add('basket__product-select', 'default');

	const defaultOption = document.createElement('option');
	defaultOption.value = '';
	defaultOption.textContent = 'Оберіть';
	defaultOption.setAttribute('hidden', 'hidden');
	select.append(defaultOption);

	options.forEach((option) => {
		const optionElement = document.createElement('option');
		optionElement.value = option.id;
		optionElement.textContent = option.name;
		select.append(optionElement);
	});

	return select.outerHTML;
}

// Функции рендера страницы информации о продукте

function getCategoryLink(category) {
	return `./${category.link}.html`;
}

function getSubCategoryLink(category) {
	return `./${category.link}.html`;
}

export function renderBreadCrambs(dataProductObj) {
	const {category, subCategory, BreadCrambsTitle} = dataProductObj;

	const breadCrambsHTML = `
            <ul class="breadcrumds">
                <li class="breadcrumbs__item">
                    <a href="./index.html" class="breadcrumbs__link">Головна</a>
                </li>
                <li class="breadcrumbs__item">
                    <a href="./catalog.html" class="breadcrumbs__link">Каталог</a>
                </li>
                    ${category ? `
                        <li class="breadcrumbs__item">
                            <a href="${getCategoryLink(category)}" class="breadcrumbs__link">${category.title}</a>
                        </li>` : ''
}
                    ${subCategory ? `
                        <li class="breadcrumbs__item">
                            <a href="${getSubCategoryLink(subCategory)}" class="breadcrumbs__link">${subCategory ? subCategory.title : ''}</a>
                        </li>` : ''
}
                <li class="breadcrumbs__item breadcrumbs__item-active">${BreadCrambsTitle}</li>
            </ul>
    `;

	document.querySelector('main').insertAdjacentHTML('beforebegin', breadCrambsHTML);
}

export function renderProductImages(dataProductObj) {
	const {images, title, } = dataProductObj;

	if (!images || !images.length) {
		return;
	} 

	const productSlider = document.querySelector('.product-slider-Body');
	const productSubSlider = document.querySelector('#product-sub-slider .swiper-wrapper');

	images.forEach(image => {
		const productSlideHTML = `
                <div class="swiper-slide">
                    <img class="product-info__image" src="${image}" alt="${title}">
                </div>`;
		productSlider.insertAdjacentHTML('beforeend',productSlideHTML);

		const productSubSlideHTML = `
                <div class="swiper-slide">
                    <img class="product-sub-slider__image" src="${image}" alt="${title}">
                </div>`;
		productSubSlider.insertAdjacentHTML('beforeend', productSubSlideHTML);
	});
}

export function renderProductInfo(dataProductObj) {
	const { title, inStock, manufacturer, price, category } = dataProductObj;

	const productInfoRightWrapper = document.querySelector('.product-info__right');
	const productTitle = productInfoRightWrapper.querySelector('.product-info__title');
	const productInStock = productInfoRightWrapper.querySelector('.inStock');
	const productManufacturerImage = productInfoRightWrapper.querySelector('.basket__product-manufacturer-image');
	const productManufacturerTitle =  productInfoRightWrapper.querySelector('.manufacturer__title');
	const productInfoPrice = productInfoRightWrapper.querySelector('.product-info__price strong');
	const productInfoPriceFor = productInfoRightWrapper.querySelector('.price-for');

	productTitle.textContent = title;
	productManufacturerImage.setAttribute('src', manufacturer.image);
	productManufacturerTitle.textContent = manufacturer.title;


	if (category.link === 'seeds') {
		productInfoPrice.textContent = `${calcSeedsTotalPrice(price, 50)} грн`;
		productInfoPriceFor.textContent = `${price}грн/5шт`;
		productInfoPrice.nextElementSibling.textContent = 'Ціна за 50 шт';
	}

	// if (category.link === 'plants-protection') {

	// }
    
	if (inStock) {
		productInStock.innerHTML +=  `
            <svg class="icon inStock-icon">
                <use href="./images/svgsprite/sprite.symbol.svg#check-in-stock-icon"></use>
            </svg>
            В наявності
        `;
	} else {
		productInStock.innerHTML += 'Закінчився 😢';
	}
}

export function renderProductDescription(dataProductObj) {
	const {title, desc, characteristics, recomendations, specifications} = dataProductObj;
	const productTitle = document.querySelector('.product-details__title');
	const productDetailsDesc = document.querySelector('.product-details__desc');
	const productSpecifications = document.querySelector('.product-details__specifications');
	const productCharacteristics = document.querySelector('.product-details__characteristics');
	const productRecomendations = document.querySelector('.product-details__recomendation');
	const productSpecificationsList = document.querySelector('.product-details__specifications-list');
	const productCharacteristicsList = document.querySelector('.product-details__characteristics-list');
	const productRecomendationsList = document.querySelector('.product-details__recomendation-list');

	productTitle.textContent = title;
	productDetailsDesc.textContent = desc;
    
	if (specifications) {
		specifications.forEach(item => {
			const li = document.createElement('li');
			li.classList.add('product-details__specifications-item');
			li.innerHTML = `<strong class="desc-assent">${item.title}</strong> ${item.answer}`;
			productSpecificationsList.append(li);
		});
	}

	if (characteristics) {
		characteristics.forEach(item => {
			const li = document.createElement('li');
			li.classList.add('product-details__list-item');
			li.innerHTML = item;
			productCharacteristicsList.append(li);
		});
	}

	if (recomendations) {
		recomendations.forEach(item => {
			const li = document.createElement('li');
			li.classList.add('product-details__list-item');
			li.innerHTML = item;
			productRecomendationsList.append(li);
		});
	}
}
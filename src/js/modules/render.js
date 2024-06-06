import { transformPrice } from './utils';

const createProductCard = (data, selector) => {
	const element = document.querySelector(selector);

	element.innerHTML = '';

	for (let key of data) {
		const { id, title, image, price, inStock } = key;

		const cardHTML = `
            <div class="product__card swiper-slide" data-productid="${id}">
                <svg class="comparison-icon comparison-icon-absolute" width="16" height="16">
                    <use class="svg-comparison-use" xlink:href="./images/svgsprite/sprite.symbol.svg#compration-icon"/>
                </svg>
            
                
                <div class="product__card-image-wrapper">
                    <a href="product.html?id=${id}">
                        <img src="${image}" alt="${title}" class="product__card-image">
                    </a>
                </div>
            
                <div class="product__card-about">
                    <a href="product.html?id=${id}" class="product__card-title">${title}</a>
                    <span class="product__card-stock ${!inStock ? 'inStock-finished' : ''}">${inStock ? 'В наявності' : 'Закінчився'}</span>
                    <span class="product__card-price">${transformPrice(price)} грн</span>
                    <span class="product__card-quantity">1 шт</span>
                    <div class="addToBasketBtn" data-modal-open>
                        <svg class="basket-icon" width="16" height="16">
                            <use xlink:href="./images/svgsprite/sprite.symbol.svg#basket-icon"/>
                        </svg>
                    </div>
                </div>
            </div>
            `;
		element.insertAdjacentHTML('beforeend', cardHTML);
	}
};

const createBasketItem = (array, selector) => {
	const element = document.querySelector(selector);

	element.innerHTML = '';

	for (let card of array) {
		const { id, title, image, price, options, manufacturer } = card;

		const basketCardHTML = `
                <li class="basket__product" data-productid="${id}">

                <a href="product.html?id=${id}" class="basket__product-title">${title}</a>
                <div class="basket__product-content">
                    <div class="basket__product-left">
                        <div class="basket__product-image-wrapper">
                            <a href="product.html?id=${id}">
                                <img src="${image}" alt="${title}" class="basket__product-image">                          
                            </a>
                        </div>

                        <div class="basket__product-about">
                            <h4 class="basket__product-price">${transformPrice(price)} грн</h4>
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
};

const createSelect = (options) => {
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
};

export { createProductCard, createBasketItem };

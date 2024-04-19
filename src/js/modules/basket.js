import { getItem } from './local-storage';

const updateBasketLenght = () => {
	const basketLengthElement = document.querySelector('.basket-lenght');
	const basketLength = getItem('basket');
	basketLengthElement.textContent = basketLength.length;
};

const updateBasketBgColor = (basket) => {
	const basketButtons = document.querySelectorAll('.addToBasketBtn');

	basketButtons.forEach((btn) => {
		const card = btn.closest('.product__card');
		if (!card) return;
		const id = card.dataset.productid;
		const svg = btn.querySelector('.basket-icon');

		const isInBasket = basket.includes(id);

		if (isInBasket) {
			btn.classList.add('active');
			svg.classList.add('active');
		} else {
			btn.classList.remove('active');
			svg.classList.remove('active');
		}
	});
};

const getProductsByIds = async (ids, url) => {
	const numbersId = ids.map((item) => parseInt(item));

	try {
		const response = await fetch(url);
		if (!response.ok) {
			throw new Error('Network response was not ok');
		}
		const data = await response.json();
		const productsByIds = [];

		data.forEach(product => {
			if (numbersId.includes(product.id)) {
				productsByIds.push(product);
			}
		});

		return productsByIds;
	} catch (error) {
		console.error('Error:', error);
		return [];
	}
};

const createEmptyMessage = () => {
	return `
        <div class="error">
            <img 
                src="https://xl-static.rozetka.com.ua/assets/img/design/modal-cart-dummy.svg" 
                class="error__image" 
                alt="error-message"
            >
            <div class="error__title">
                Корзина Пуста
            </div>
        </div>
    `;
};

const checkBasketEmpty = (data) => {
	if (!data.length) {
		const basketList = document.querySelector('.basket__list');
		const error = createEmptyMessage();
		basketList.insertAdjacentHTML('beforeend', error);
	}
};

export {
	updateBasketLenght,
	updateBasketBgColor,
	getProductsByIds,
	checkBasketEmpty
};
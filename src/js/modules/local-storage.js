export function getItem() {
	const basketDataJson = localStorage.getItem('basket');
	return basketDataJson ? JSON.parse(basketDataJson) : [];
}

export function setItem(cardId) {
	const basketLength = document.querySelector('.basket-lenght');
	localStorage.setItem('basket', JSON.stringify(cardId));
	basketLength.textContent = cardId.length;
}

export function updateBasketLenght() {
	const basketLengthElement = document.querySelector('.basket-lenght');
	const basketLength = getItem();
	basketLengthElement.textContent = basketLength.length;
}

export function updateBasketBgColor(basket) {
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
}

export async function getProductsByIds(ids, url) {
	const numbersId = ids.map((item) => parseInt(item));

	try {
		const response = await fetch(url);
		if (!response.ok) {
			throw new Error('Network response was not ok');
		}
		const data = await response.json();
		const productsByIds = [];

		Object.keys(data).forEach((category) => {
			data[category].forEach((product) => {
				if (numbersId.includes(product.id)) {
					productsByIds.push(product);
				}
			});
		});

		return productsByIds;
	} catch (error) {
		console.error('Error:', error);
		return [];
	}
}
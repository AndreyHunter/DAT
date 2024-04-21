const LS = localStorage;

const getItem = (key) => {
	const basketDataJson = LS.getItem(key);
	return basketDataJson ? JSON.parse(basketDataJson) : [];
};

const setItem = (key, value) => {
	const basketLength = document.querySelector('.basket-lenght');
	LS.setItem(key, JSON.stringify(value));
	basketLength.textContent = value.length;
};

export { getItem, setItem, LS};

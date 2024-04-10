const getItem = (key) => {
	const basketDataJson = localStorage.getItem(key);
	return basketDataJson ? JSON.parse(basketDataJson) : [];
};

const setItem = (key, value) => {
	const basketLength = document.querySelector('.basket-lenght');
	localStorage.setItem(key, JSON.stringify(value));
	basketLength.textContent = value.length;
};

export { getItem, setItem };

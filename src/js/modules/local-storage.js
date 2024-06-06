const LS = localStorage;

const getItem = (key) => {
	const basketDataJson = LS.getItem(key);
	return basketDataJson ? JSON.parse(basketDataJson) : [];
};

const setItem = (key, value) => {
	LS.setItem(key, JSON.stringify(value));
};

export { getItem, setItem, LS};

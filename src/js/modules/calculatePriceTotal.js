const calculateTotalPriceForLiters = (pricePerLiter, selectedOption) => {
	const regexp = /\D/g;
	const pricePerLiterNumber = pricePerLiter;
	const optionNumber = parseInt(selectedOption.replace(regexp), '');

	let count = 0;

	switch (optionNumber) {
	case 5:
		count = 5;
		break;
	case 4:
		count = 4;
		break;
	case 3:
		count = 3;
		break;
	case 2:
		count = 2;
		break;
	case 1:
		count = 1;
		break;
	case 500:
		count = 0.5;
		break;
	case 400:
		count = 0.4;
		break;
	case 300:
		count = 0.3;
		break;
	case 200:
		count = 0.2;
		break;
	case 100:
		count = 0.1;
		break;
	default:
		console.error('Обрана некоректна опція');
		return null;
	}

	const totalPrice = pricePerLiterNumber * count;
	return totalPrice;
};

const calcSeedsTotalPrice = (basePrice, quantity) => {
	const baseQuantity = 5;
	const basePricePerUnit = basePrice / baseQuantity;
	let totalPrice = 0;

	if (quantity >= baseQuantity) {
		if (quantity >= 500) {
			totalPrice = basePricePerUnit * quantity * 0.8;
		} else if (quantity >= 100) {
			totalPrice = basePricePerUnit * quantity * 0.9;
		} else if (quantity >= 50) {
			totalPrice = basePricePerUnit * quantity * 0.95;
		} else {
			totalPrice = basePricePerUnit * quantity;
		}
	} else {
		console.error('Мінімальний заказ от 5шт');
	}

	return parseInt(totalPrice);
};

export { calculateTotalPriceForLiters, calcSeedsTotalPrice };

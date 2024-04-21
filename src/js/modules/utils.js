async function getData(url) {
	try {
		const res = await fetch(url);
		if (!res.ok) {
			throw new Error('Feiled to Fetch');
		}

		return await res.json();
	} catch (err) {
		console.error('Network err', err);
	}
}

const transformFormData = (formData) => {
	return Object.fromEntries(formData.entries());
};

const transformPrice = (number) => {
	if (!Number.isInteger(number)) {
		return number.toFixed(2);
	}

	return number;
};

export { getData, transformFormData, transformPrice };

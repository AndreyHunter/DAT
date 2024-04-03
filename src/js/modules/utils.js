async function getProducts(url) {
	try {
		const res = await fetch(url);
		if (!res.ok) {
			throw new Error();
		}

		return await res.json();

	} catch (err) {
		console.error('Network err', err);
	}
}

export {getProducts};
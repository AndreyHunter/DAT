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

export { getData };

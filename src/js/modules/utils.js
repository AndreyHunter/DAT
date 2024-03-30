export function getProducts(url) {
	return fetch(url)
		.then((res) => {
			if (!res.ok) {
				throw new Error('Network response was not ok');
			}
			return res.json();
		})
		.catch((error) => console.error('Error', error));
}

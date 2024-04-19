const renderProductImages = (dataProductObj) => {
	const { images, title } = dataProductObj;

	if (!images) {
		return;
	}

	const productSlider = document.querySelector('.product-slider-Body');
	const productSubSlider = document.querySelector(
		'#product-sub-slider .swiper-wrapper',
	);

	images.forEach((image) => {
		const productSlideHTML = `
                <div class="swiper-slide">
                    <img class="product-info__image" src="${image}" alt="${title}">
                </div>`;
		productSlider.insertAdjacentHTML('beforeend', productSlideHTML);

		const productSubSlideHTML = `
                <div class="swiper-slide">
                    <img class="product-sub-slider__image" src="${image}" alt="${title}">
                </div>`;
		productSubSlider.insertAdjacentHTML('beforeend', productSubSlideHTML);
	});
};

export default renderProductImages;
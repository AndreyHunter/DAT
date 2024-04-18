const renderProductDescription = (dataProductObj) => {
	const { title, desc, characteristics, recomendations, specifications } =
		dataProductObj;
	const productTitle = document.querySelector('.product-details__title');
	const productDetailsDesc = document.querySelector('.product-details__desc');

	productTitle.textContent = title;
	productDetailsDesc.textContent = desc;

	specifications?.length && createSpecifications(specifications);
	characteristics?.length && createCharacteristics(characteristics);
	recomendations?.length && createRecomendations(recomendations);
};

const createSpecificationsList = (specifications) => {
	return specifications.map(item => {
		const { title, answer } = item;

		return `<li><strong class="desc-assent">${title}</strong> ${answer}</li>`;
	}).join('');
};

const createSpecifications = (specifications) => {
	const descriptionContainer = document.querySelector('.product-details__description');

	const specificationsHTML = `
        <div class="product-details__specifications">
            <ul class="product-details__specifications-list">
                ${createSpecificationsList(specifications)}
            </ul>
        </div>
    `;

	descriptionContainer.insertAdjacentHTML('beforeend', specificationsHTML);
};

const createCharacteristicList = (characteristics) => {
	return characteristics.map(item => {
		return `<li class="product-details__list-item">${item}</li>`;
	}).join('');
};

const createCharacteristics = (characteristics) => {
	const descriptionContainer = document.querySelector('.product-details__description');

	const characteristicsHTML = `
        <div class="product-details__characteristics">
            <h4 class="product-details__title">Характеристики</h4>

            <ul class="product-details__list product-details__characteristics-list">
                 ${createCharacteristicList(characteristics)}   
            </ul>
        </div>
    `;

	descriptionContainer.insertAdjacentHTML('beforeend', characteristicsHTML);
};

const createRecomendationList = (recomandations) => {
	return recomandations.map(item => {
		return `<li class="product-details__list-item">${item}</li>`;
	}).join('');
};

const createRecomendations = (recomendations) => {
	const descriptionContainer = document.querySelector('.product-details__description');

	const recomandationHTML = `
        <div class="product-details__recommendations">
                <h4 class="product-details__title">Рекомендаціі</h4>

                <ul class="product-details__list product-details__recomendation-list">
                    ${createRecomendationList(recomendations)}
                </ul>
        </div>
    `;

	descriptionContainer.insertAdjacentHTML('beforeend', recomandationHTML);
};

export default renderProductDescription;
const getCategoryLink = (category) => {
	return `./${category.link}.html`;
};

const getSubCategoryLink = (category) => {
	return `./${category.link}.html`;
};

const renderBreadCrambs = (dataProductObj) => {
	const { category, subCategory, title } = dataProductObj;
	const swiper = document.createElement('div');
	swiper.classList.add('breadcrumds-wrapper', 'swiper');
	const ul = document.createElement('ul');
	ul.classList.add('breadcrumds', 'swiper-wrapper');
	let breadCrambsHTML = '';

	breadCrambsHTML += `
        <li class="breadcrumbs__item swiper-slide">
            <a href="./index.html" class="breadcrumbs__link">Головна</a>
        </li>
        <li class="breadcrumbs__item swiper-slide">
            <a href="./catalog.html" class="breadcrumbs__link">Каталог</a>
        </li>
    `;

	if (category) {
		breadCrambsHTML += `
            <li class="breadcrumbs__item swiper-slide">
                <a href="${getCategoryLink(category)}" class="breadcrumbs__link">${category.title}</a>
            </li>
        `;
	}

	if (subCategory) {
		breadCrambsHTML += `
            <li class="breadcrumbs__item swiper-slide">
                <a href="${getSubCategoryLink(subCategory)}" class="breadcrumbs__link">${subCategory.title}</a>
            </li>
        `;
	}

	breadCrambsHTML += `
        <li class="breadcrumbs__item breadcrumbs__item-active swiper-slide">${title}</li>
    `;

	ul.insertAdjacentHTML('beforeend', breadCrambsHTML);
	swiper.append(ul);
	document.querySelector('.breadcrambs-container').append(swiper);
};

export default renderBreadCrambs;

const getCategoryLink = (category) => {
	return `./${category.link}.html`;
};

const getSubCategoryLink = (category) => {
	return `./${category.link}.html`;
};

const renderBreadCrambs = (dataProductObj) => {
	const { category, subCategory, title } = dataProductObj;

	const breadCrambsHTML = `
            <ul class="breadcrumds">
                <li class="breadcrumbs__item">
                    <a href="./index.html" class="breadcrumbs__link">Головна</a>
                </li>
                <li class="breadcrumbs__item">
                    <a href="./catalog.html" class="breadcrumbs__link">Каталог</a>
                </li>
                    ${
						category
							? `
                        <li class="breadcrumbs__item">
                            <a href="${getCategoryLink(category)}" class="breadcrumbs__link">${category.title}</a>
                        </li>`
							: ''
					}
                    ${
						subCategory
							? `
                        <li class="breadcrumbs__item">
                            <a href="${getSubCategoryLink(subCategory)}" class="breadcrumbs__link">${subCategory ? subCategory.title : ''}</a>
                        </li>`
							: ''
					}
                <li class="breadcrumbs__item breadcrumbs__item-active">${title}</li>
            </ul>
    `;

	document.querySelector('main').insertAdjacentHTML('beforebegin', breadCrambsHTML);
};

export default renderBreadCrambs;

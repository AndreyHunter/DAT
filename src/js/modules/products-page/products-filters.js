const renderCategoryFilter = (data) => {
	const herbicides = data.filter(item => item.subCategory.link === 'herbicides');
	const fungicides = data.filter(item => item.subCategory.link === 'fungicides');
	const insecticides = data.filter(item => item.subCategory.link === 'insecticides');
	const desiccants = data.filter(item => item.subCategory.link === 'desiccants');
	const poisoners = data.filter(item => item.subCategory.link === 'poisoners');
	const adjuvants = data.filter(item => item.subCategory.link === 'adjuvants');
	const rodenticides = data.filter(item => item.subCategory.link === 'rodenticides');
	const retardants = data.filter(item => item.subCategory.link === 'retardants');

	document.querySelector('#herbicides').nextElementSibling.textContent = `(${herbicides.length})`;
	document.querySelector('#fungicides').nextElementSibling.textContent = `(${fungicides.length})`;
	document.querySelector('#insecticides').nextElementSibling.textContent = `(${insecticides.length})`;
	document.querySelector('#desiccants').nextElementSibling.textContent = `(${desiccants.length})`;
	document.querySelector('#poisoners').nextElementSibling.textContent = `(${poisoners.length})`;
	document.querySelector('#adjuvants').nextElementSibling.textContent = `(${adjuvants.length})`;
	document.querySelector('#rodenticides').nextElementSibling.textContent = `(${rodenticides.length})`;
	document.querySelector('#retardants').nextElementSibling.textContent = `(${retardants.length})`;
};

export default renderCategoryFilter;

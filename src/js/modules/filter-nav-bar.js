const openNavBarFilter = ({
	triggerBtn,
	closeBtnSelector,
	navOverlaySelector,
	navOverlayClass,
	contentSelector,
	contentSelectorClass
}) => {
	const trigger = document.querySelector(triggerBtn);
	const closeBtn = document.querySelector(closeBtnSelector);
	const menuOverlay = document.querySelector(navOverlaySelector);
	const menuContent = document.querySelector(contentSelector);

	trigger.addEventListener('click', () => {
		menuOverlay.classList.add(navOverlayClass);
		menuContent.classList.add(contentSelectorClass);
		document.body.classList.add('hidden-body');
	});

	menuOverlay.addEventListener('click', (e) => {
		const target = e.target;
		if (!target.classList.contains('products-filters') && !target.classList.contains('open')) return;
		closeNavBar();
	});

	closeBtn.addEventListener('click', () => closeNavBar());

	function closeNavBar() {
		menuOverlay.classList.remove(navOverlayClass);
		menuContent.classList.remove(contentSelectorClass);
		document.body.classList.remove('hidden-body');
	}
    
};

export default openNavBarFilter;

const openMobileMenu = (triggerBtn, navSelector, triggerClass, navSelectorClass) => {
	const trigger = document.querySelector(triggerBtn);
	const menu = document.querySelector(navSelector);

	trigger.addEventListener('click', () => {
		trigger.classList.toggle(triggerClass);
		menu.classList.toggle(navSelectorClass);
	});
};

export default openMobileMenu;

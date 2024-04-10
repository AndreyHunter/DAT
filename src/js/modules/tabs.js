const tabs = ({
	wrapperSelector,
	tabSelector,
	contentSelector,
	tabActiveClass,
	contentActiveClass,
	initialContentIndex,
}) => {
	const wrapper = document.querySelector(wrapperSelector);
	const tabs = document.querySelectorAll(tabSelector);
	const content = document.querySelectorAll(contentSelector);

	wrapper.addEventListener('click', (e) => {
		const target = e.target;

		tabs.forEach((tab, index) => {
			if (target === tab || target.closest(tabSelector) === tab) {
				if (tab.classList.contains(tabActiveClass)) return;
				hideTabs();
				showTabs(index);
			}
		});
	});

	const hideTabs = () => {
		tabs.forEach((tab) => tab.classList.remove(tabActiveClass));
		content.forEach((content) => content.classList.remove(contentActiveClass));
	};

	const showTabs = (i) => {
		tabs[i].classList.add(tabActiveClass);
		content[i].classList.add(contentActiveClass);
	};

	hideTabs();
	showTabs(initialContentIndex);
};

export default tabs;

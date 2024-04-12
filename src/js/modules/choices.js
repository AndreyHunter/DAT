import Choices from 'choices.js';

const choisesSettings = {
	allowHTML: true,
	searchEnabled: false,
	itemSelectText: '',
};

const initialChoises = (selector) => {
	const elements = document.querySelectorAll(selector);
	elements.forEach((select) => new Choices(select, choisesSettings));
};

const choisesMenu = () => {
	let choicesInstance = null;
	if (window.innerWidth < 450) {
		choicesInstance = new Choices('.header__select', choisesSettings);
	}

	// Обновление экземпляра при изменении размера окна
	window.addEventListener('resize', () => {
		if (window.innerWidth < 450) {
			if (!choicesInstance) {
				choicesInstance = new Choices('.header__select', choisesSettings);
			}
		} else {
			choicesInstance.destroy();
			choicesInstance = null;
		}
	});
};

export {initialChoises, choisesMenu};

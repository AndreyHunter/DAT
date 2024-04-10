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

export default initialChoises;

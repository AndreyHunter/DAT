import { PRODUCTS_URL } from './modules/server.js';
import {
	getProductsByIds,
	checkBasketEmpty,
	updateBasketLenght,
} from './modules/basket.js';

import { getItem, LS } from './modules/local-storage.js';
import { createBasketItem } from './modules/render.js';
import { initialChoises } from './modules/choices.js';

import { modals } from './modules/modals.js';
import openMobileMenu from './modules/mobile-menu.js';

import {
	validateTextInputs,
	validateEmailInputs,
	validatePhone,
	changePhonePlaceHolder,
} from './modules/validation';

import { transformFormData } from './modules/utils';

import { contactsModal, openModal } from './modules/modals';

modals();
contactsModal();
openMobileMenu('#nav-icon2', '.mobile-nav', 'open', 'active');

// Рендер корзины
const basket = getItem('basket');

getProductsByIds(basket, PRODUCTS_URL)
	.then((res) => createBasketItem(res, '.basket__list'))
	.then(() => {
		updateBasketLenght();
		checkBasketEmpty(basket);
		initialChoises('.basket__product-select');
	})
	.catch((err) => console.error('Something went wrong', err));

changePhonePlaceHolder('.contacts-form__input[type="tel"]');

// Получение формы и создание объекта состояния

const contactsForm = document.querySelector('.contacts-form__body');

let formState = {};

// Функция сохнарение полей ввода после перезагрузки

contactsForm.addEventListener('input', (e) => {
	const target = e.target;
	formState[target.name] = target.value;
	LS.setItem('formState', JSON.stringify(formState));
});

if (LS.getItem('formState')) {
	formState = JSON.parse(LS.getItem('formState'));

	for (let key in formState) {
		contactsForm[key].value = formState[key];
	}
}

// Функция отправки формы

contactsForm.addEventListener('submit', async (e) => {
	e.preventDefault();

	const textInputsValid = validateTextInputs({
		inputSelector: '.contacts-form__input[type="text"]',
		minLength: 4,
		maxLength: 40,
	});
	const emailInputsValid = validateEmailInputs('.contacts-form__input[type="email"]');
	const phoneInputsValid = validatePhone('.contacts-form__input[type="tel"]');

	if (!textInputsValid || !emailInputsValid || !phoneInputsValid) {
		return;
	}

	const formData = new FormData(contactsForm);
	const transformForm = transformFormData(formData);

	try {
		const res = await fetch('http://localhost:3000/userContacts', {
			method: 'POST',
			body: JSON.stringify(transformForm),
		});

		if (!res.ok) {
			throw new Error('Feiled to fetch');
		}

		contactsForm.reset();
		openModal(
			'#contacts-modal',
			'.contacts-modal__content',
			'showModal',
			'showModal-scale',
		);
	} catch (err) {
		console.error('Error', err);
	}
});

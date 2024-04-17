import {
	validateTextInputs,
	validateEmailInputs,
	validatePhone,
	changePhonePlaceHolder
}  from './modules/validation';

import { transformFormData } from './modules/utils';

import { 
	contactsModals,
	openModal
} from './modules/modals';

contactsModals();

changePhonePlaceHolder('.contacts-form__input[type="tel"]');

const contactsForm = document.querySelector('.contacts-form__body');

contactsForm.addEventListener('submit', async (e) => {
	e.preventDefault();

	const textInputsValid = validateTextInputs({
		inputSelector: '.contacts-form__input[type="text"]',
		minLength: 4,
		maxLength: 30
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
			body: JSON.stringify(transformForm)
		});

		if (!res.ok) {
			throw new Error('Feiled to fetch');
		}

		contactsForm.reset();
		openModal('#contacts-modal', '.contacts-modal__content', 'showModal', 'showModal-scale');

	} catch (err) {
		console.error('Error', err);
	}

});
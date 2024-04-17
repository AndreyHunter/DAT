const validateRegexp = {
	email:  /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
};

const clearError = (inputSelector) => {
	const parent = inputSelector.parentNode;
	const errors = parent.querySelectorAll('.error-message');

	if (errors.length > 0) {
		errors.forEach(err => err.remove());
	}

};

const changePhonePlaceHolder = (inputsSelector) => {
	const inputs = document.querySelectorAll(inputsSelector);

	inputs.forEach(input => {
		input.addEventListener('focus', () => {
			input.placeholder = '+380';
		});

		input.addEventListener('blur', () => {
			input.placeholder = 'Телефон';
		});
	});
};

const validateTextInputs = ({
	inputSelector,
	minLength,
	maxLength
}) => {
	let isValide = true;

	const inputs = document.querySelectorAll(inputSelector);

	inputs.forEach(input => {
		const inputValue = input.value.trim();
		const inputWrapper = input.parentNode;

		clearError(input);

		if (!inputValue) {
			addError(inputWrapper, 'Поле обов\'язково!');
			isValide = false;
		} else if (inputValue.length < minLength) {
			addError(inputWrapper, `Мінімум ${minLength} символів`);
			isValide = false;
		} else if (inputValue.length > maxLength) {
			addError(inputWrapper, `Максимум ${maxLength} символів`);
			isValide = false;
		}	
	});

	return isValide;
};

const validateEmailInputs = (emailInputSelector) => {
	let isValide = true;

	const emailInputs = document.querySelectorAll(emailInputSelector);
	
	emailInputs.forEach(input => {
		const emailValue = input.value.trim();        
		const inputWrapper = input.parentNode;

		clearError(input);

		if (!emailValue) {
			addError(inputWrapper, 'Поле обов\'язково!');
			isValide = false;
		} else if (!/@/g.test(emailValue)) {
			addError(inputWrapper, 'email повинен мати @ символ');
			isValide = false;
		} else if (!validateRegexp.email.test(emailValue)) {
			addError(inputWrapper, 'Введіть валідний email');
			isValide = false;
		}	
	});

	return isValide;
};

const validatePhone = (phoneInputSelector) => {
	let isValide = true;

	const phoneInputs = document.querySelectorAll(phoneInputSelector);

	phoneInputs.forEach(input => {
		input.addEventListener('input', () => {
			input.value = input.value.replace(/\D/g, '');
		});
	});

	changePhonePlaceHolder(phoneInputSelector);

	phoneInputs.forEach(input => {
		const phoneValue = input.value.trim();        
		const inputWrapper = input.parentNode;
        
		clearError(input);

		if (!phoneValue) {
			addError(inputWrapper, 'Поле обов\'язково!');
			isValide = false;
		} else if (phoneValue.length !== 9) {
			addError(inputWrapper, `Телефон повинен мати ${9} цифр`);
			isValide = false;
		}
	});

	return isValide;
};

function addError(inputParent, errorMessage) {
	const errorSpan = document.createElement('span');
	errorSpan.classList.add('error-message');
	errorSpan.textContent = errorMessage;
	inputParent.appendChild(errorSpan); 
}


export {
	validateTextInputs,
	validateEmailInputs,
	validatePhone,
	changePhonePlaceHolder
};
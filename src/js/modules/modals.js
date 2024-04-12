const isScrollbarVisible = () => {
	return document.documentElement.scrollHeight > window.innerHeight;
};

const openModal = (modalOverlay, modalBody, modalOverlayClass, modalBodyClass) => {
	const modal = document.querySelector(modalOverlay);
	const modalContent = document.querySelector(modalBody);
	modal.classList.add(modalOverlayClass);
	modalContent.classList.add(modalBodyClass);
	if (isScrollbarVisible()) {
		toggleBodyOverflow();
	}
};

const closeModal = (modalOverlay, modalBody, modalOverlayClass, modalBodyClass) => {
	const modal = document.querySelector(modalOverlay);
	const modalContent = document.querySelector(modalBody);
	modal.classList.remove(modalOverlayClass);
	modalContent.classList.remove(modalBodyClass);

	if (isScrollbarVisible()) {
		toggleBodyOverflow();
	}
};

const toggleBodyOverflow = () => {
	document.body.style.overflow = document.body.style.overflow === '' ? 'hidden' : '';
	const scrollBarWidth = getScrollBarWidth();
	document.documentElement.style.paddingRight =
		document.body.style.overflow === 'hidden' ? scrollBarWidth + 'px' : '';
};

const getScrollBarWidth = () => {
	const div = document.createElement('div');
	div.style.overflow = 'scroll';
	div.style.visibility = 'hidden';
	document.body.append(div);
	const scrollBarWidth = div.offsetWidth - div.clientWidth;
	document.body.removeChild(div);
	return scrollBarWidth;
};

const bindModal = ({
	triggerButton,
	modalOverlay,
	modalBody,
	modalOverlayClass,
	modalClass,
	closeButton,
	closeOnOutside = true,
	closeOnKey = true,
	openOntimeDelay = 10000,
}) => {
	const modal = document.querySelector(modalOverlay);
	const triggerButtons = document.querySelectorAll(triggerButton);
	const closeButtons = document.querySelectorAll(closeButton);

	triggerButtons.forEach((btn) => {
		btn.addEventListener('click', (e) => {
			e.preventDefault();
			openModal(modalOverlay, modalBody, modalOverlayClass, modalClass);
		});
	});

	closeButtons.forEach((btn) => {
		btn.addEventListener('click', () => {
			closeModal(modalOverlay, modalBody, modalOverlayClass, modalClass);
		});
	});

	if (closeOnOutside) {
		modal.addEventListener('click', (e) => {
			const target = e.target;

			if (target.classList.contains(modalOverlayClass)) {
				closeModal(modalOverlay, modalBody, modalOverlayClass, modalClass);
			}
		});
	}

	const closeModalOnKey = (e) => {
		const code = e.code;

		if (code === 'Escape' && modal.classList.contains(modalOverlayClass)) {
			closeModal(modalOverlay, modalBody, modalOverlayClass, modalClass);
		} else {
			return;
		}
	};

	if (closeOnKey) {
		document.addEventListener('keydown', (e) => closeModalOnKey(e));
	}

	if (openOntimeDelay) {
		setTimeout(() => {
			openModal(modalOverlay, modalBody, modalOverlayClass, modalClass);
		}, openOntimeDelay);
	}
};

const modals = () => {
	bindModal({
		triggerButton: '[data-modal-open]',
		modalOverlay: '.basket',
		modalBody: '.basket__content',
		modalOverlayClass: 'showModal',
		modalClass: 'showModal-scale',
		closeButton: '[data-modal-close]',
		closeOnOutside: true,
		closeOnKey: true,
		openOntimeDelay: 60000,
	});
};

export { modals, openModal, closeModal };

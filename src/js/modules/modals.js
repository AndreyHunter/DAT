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

	if (closeOnKey) {
		document.addEventListener('keydown', (e) => closeModalOnKey(e));
	}

	if (openOntimeDelay) {
		setTimeout(() => {
			openModal(modalOverlay, modalBody, modalOverlayClass, modalClass);
		}, openOntimeDelay);
	}

	const closeModalOnKey = (e) => {
		const code = e.code;

		if (code === 'Escape' && modal.classList.contains(modalOverlayClass)) {
			closeModal(modalOverlay, modalBody, modalOverlayClass, modalClass);
		} else {
			return;
		}
	};
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

const openModal = (modalOverlay, modalBody, modalOverlayClass, modalBodyClass) => {
	const modal = document.querySelector(modalOverlay);
	const modalContent = document.querySelector(modalBody);
	modal.classList.add(modalOverlayClass);
	modalContent.classList.add(modalBodyClass);
};

const closeModal = (modalOverlay, modalBody, modalOverlayClass, modalBodyClass) => {
	const modal = document.querySelector(modalOverlay);
	const modalContent = document.querySelector(modalBody);
	modal.classList.remove(modalOverlayClass);
	modalContent.classList.remove(modalBodyClass);
};

export { modals, openModal, closeModal };

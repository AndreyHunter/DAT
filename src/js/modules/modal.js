export function openModal(ModalOverley, ModalBody) {
	const modal = document.querySelector(ModalOverley);
	modal.classList.add('showModal');
	modal.classList.remove('hideModal');
	const modalBody = document.querySelector(ModalBody);
	modalBody.classList.add('showModal-scale');
	if (isScrollbarVisible()) {
		toggleBodyOverflow();
	}
}

export function closeModal(ModalOverley, ModalBody) {
	const modal = document.querySelector(ModalOverley);
	modal.classList.add('hideModal');
	modal.classList.remove('showModal');
	const modalBody = document.querySelector(ModalBody);
	modalBody.classList.remove('showModal-scale');
	if (isScrollbarVisible()) {
		toggleBodyOverflow();
	}
}

function toggleBodyOverflow() {
	document.body.style.overflow = document.body.style.overflow === '' ? 'hidden' : '';
	const scrollBarWidth = getScrollBarWidth();
	document.documentElement.style.paddingRight =
	document.body.style.overflow === 'hidden' ? scrollBarWidth + 'px' : '';
}

function getScrollBarWidth() {
	const div = document.createElement('div');
	div.style.overflow = 'scroll';
	div.style.visibility = 'hidden';
	document.body.append(div);
	const scrollBarWidth = div.offsetWidth - div.clientWidth;
	document.body.removeChild(div);
	return scrollBarWidth;
}

function isScrollbarVisible() {
	return document.documentElement.scrollHeight > window.innerHeight;
}

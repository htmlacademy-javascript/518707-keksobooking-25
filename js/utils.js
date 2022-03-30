const MODAL_REMOVE_DELAY = 3000;

const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

const setFormState = (formClassName, isDisabled = true) => {
  const form = document.querySelector(`.${formClassName}`);
  Array.from(form.children).forEach((child) => {
    child.disabled = isDisabled;
  });
  if (isDisabled) {
    form.classList.add(`${formClassName}--disabled`);
  } else {
    form.classList.remove(`${formClassName}--disabled`);
  }
};

const showModal = (modalType) => {
  const modalTemplate = document.querySelector(`#${modalType}`).content.querySelector(`.${modalType}`);
  const newModal = modalTemplate.cloneNode(true);
  document.querySelector('body').appendChild(newModal);

  if (modalType === 'success') {
    setTimeout(() => newModal.remove(), MODAL_REMOVE_DELAY);
  } else {
    newModal.querySelector('button').addEventListener('click', () => newModal.remove());
    window.addEventListener('keydown', (evt) => {
      if (evt.key === 'Escape') {
        newModal.remove();
      }
    });
  }
};

const showSuccessModal = () => showModal('success');
const showErrorModal = () => showModal('error');

export {showSuccessModal, showErrorModal, setFormState, debounce};

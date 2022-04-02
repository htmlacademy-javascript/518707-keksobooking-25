const DEFAULT_TIMEOUT_DELAY = 500;
const debounce = (callback, timeoutDelay = DEFAULT_TIMEOUT_DELAY) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

const setFormState = (formClassName, isDisabled = true) => {
  const formElement = document.querySelector(`.${formClassName}`);
  Array.from(formElement.children).forEach((child) => {
    child.disabled = isDisabled;
  });
  if (isDisabled) {
    formElement.classList.add(`${formClassName}--disabled`);
  } else {
    formElement.classList.remove(`${formClassName}--disabled`);
  }
};

const showModal = (modalType) => {
  const modalTemplate = document.querySelector(`#${modalType}`).content.querySelector(`.${modalType}`);
  const newModal = modalTemplate.cloneNode(true);

  const removeModal = () => newModal.remove();
  const onModalClick = () => {
    removeModal();
    document.removeEventListener('keydown', onModalEscKeydown);
    document.removeEventListener('click', onModalClick);
  };

  function onModalEscKeydown (evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      newModal.remove();
      document.removeEventListener('keydown', onModalEscKeydown);
      document.removeEventListener('click', onModalClick);
    }
  }

  document.addEventListener('click', onModalClick);
  document.addEventListener('keydown', onModalEscKeydown);

  document.querySelector('body').appendChild(newModal);
};

const showSuccessModal = () => showModal('success');
const showErrorModal = () => showModal('error');

export {showSuccessModal, showErrorModal, setFormState, debounce};

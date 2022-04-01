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

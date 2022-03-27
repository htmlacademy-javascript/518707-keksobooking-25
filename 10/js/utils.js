const adForm = document.querySelector('.ad-form');
const adFormFieldsets = adForm.querySelectorAll('fieldset');

const mapForm = document.querySelector('.map__filters');
const mapFormFilters = mapForm.querySelectorAll('.map__filter');
const mapFormFeaturesList = mapForm.querySelector('.map__features');

const changeFormCondition = (isDisabled) => {
  if (isDisabled) {
    adForm.classList.add('ad-form--disabled');
    mapForm.classList.add('map__filters--disabled');
  } else {
    adForm.classList.remove('ad-form--disabled');
    mapForm.classList.remove('map__filters--disabled');
  }

  mapFormFeaturesList.disabled = isDisabled;
  adFormFieldsets.forEach((element) => {
    element.disabled = isDisabled;
  });
  mapFormFilters.forEach((element) => {
    element.disabled = isDisabled;
  });
};

const showModal = (modalType) => {
  const modalTemplate = document.querySelector(`#${modalType}`).content.querySelector(`.${modalType}`);
  const newModal = modalTemplate.cloneNode(true);
  document.querySelector('body').appendChild(newModal);

  if (modalType === 'success') {
    setTimeout(() => newModal.remove(), 3000);
  } else {
    newModal.querySelector('button').addEventListener('click', () => newModal.remove());
    window.addEventListener('keydown', (evt) => {
      if (evt.key === 'Escape') {
        newModal.remove();
      }
    });
  }
};


const setFormDisabled = () => changeFormCondition(true);
const setFormActive = () => changeFormCondition(false);
const showSuccessModal = () => showModal('success');
const showErrorModal = () => showModal('error');

export {showSuccessModal, showErrorModal, setFormActive, setFormDisabled};

const adForm = document.querySelector('.ad-form');
const adFormFieldsets = adForm.querySelectorAll('fieldset');

const mapForm = document.querySelector('.map__filters');
const mapFormFilters = mapForm.querySelectorAll('.map__filter');
const mapFormFeatures = mapForm.querySelector('.map__features');

const changeFormCondition = (isDisabled) => {
  if (isDisabled) {
    adForm.classList.add('ad-form--disabled');
    mapForm.classList.add('map__filters--disabled');
  } else {
    adForm.classList.remove('ad-form--disabled');
    mapForm.classList.remove('map__filters--disabled');
  }

  mapFormFeatures.disabled = isDisabled;
  adFormFieldsets.forEach((element) => {
    element.disabled = isDisabled;
  });
  mapFormFilters.forEach((element) => {
    element.disabled = isDisabled;
  });
};

window.addEventListener('DOMContentLoaded', () => changeFormCondition(true));

document.querySelector('.map__canvas').addEventListener('click', () => changeFormCondition(false));

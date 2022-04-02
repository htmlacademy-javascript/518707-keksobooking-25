import {postData} from './server-requests.js';
import {resetUserPinPosition} from './map.js';
import {showSuccessModal, showErrorModal} from './utils.js';
import {removeFormImages} from './image.js';

const TYPES_MIN_PRICE = {
  'palace': 10000,
  'flat': 1000,
  'house': 5000,
  'bungalow': 0,
  'hotel': 3000
};
const MAX_ROOMS = 100;
const Color = {
  ERROR_COLOR: '#ff6547',
  DEFAULT_COLOR: '#353535'
};

const adForm = document.querySelector('.ad-form');
const adFormTypeElement = adForm.querySelector('#type');
const adFormPriceElement = adForm.querySelector('#price');
const adFormRoomElement = adForm.querySelector('#room_number');
const adFormCapacityElement = adForm.querySelector('#capacity');
const adFormTimeinElement = adForm.querySelector('#timein');
const adFormTimeoutElement = adForm.querySelector('#timeout');

const adFormSliderElement = adForm.querySelector('.ad-form__slider');
const adFormResetButton = adForm.querySelector('.ad-form__reset');

const setEqualElementsValue = (referenceElement, dependentElement) => {
  dependentElement.value = referenceElement.value;
};

Pristine.addValidator('min-length',
  (value, minlength) => value.length >= minlength,
  (value, minlength) => `Минимальное значение ${minlength[1]} символов, осталось добавить: ${minlength[1] - value.length}.`
);

Pristine.addValidator('max-length',
  (value, maxlength) => value.length <= maxlength,
  (value, maxlength) => `Превышено максимальное значение - ${maxlength[1]} символов, текущее значение: ${value.length}.`
);

const pristine = new Pristine(adForm,
  {
    classTo: 'ad-form__element',
    errorTextParent: 'ad-form__element',
    errorTextClass: 'ad-form__element-error'
  }
);

pristine.addValidator(adFormPriceElement,
  (value) => value >= TYPES_MIN_PRICE[adFormTypeElement.value],
  () => `Минимальная цена выбранного типа размещения: ${TYPES_MIN_PRICE[adFormTypeElement.value]} руб.`
);

noUiSlider.create(adFormSliderElement, {
  start: 0,
  connect: 'lower',
  range: {
    'min': 0,
    'max': 100000
  },
  animate: true,
  animationDuration: 1200,
  format: {
    to: (value) => value.toFixed(0),
    from: (value) => parseFloat(value)
  }
});

adFormSliderElement.noUiSlider.on('slide', () => {
  adFormPriceElement.value = adFormSliderElement.noUiSlider.get();
});
adFormSliderElement.noUiSlider.on('change', () => {
  pristine.validate(adFormPriceElement);
});

adFormPriceElement.addEventListener('input', () => +adFormPriceElement.value <= +adFormPriceElement.max ? adFormSliderElement.noUiSlider.set(adFormPriceElement.value) : adFormSliderElement.noUiSlider.set(adFormPriceElement.max));

adFormTypeElement.addEventListener('change', () => {
  if (+adFormPriceElement.value < +TYPES_MIN_PRICE[adFormTypeElement.value]) {
    adFormSliderElement.noUiSlider.set(TYPES_MIN_PRICE[adFormTypeElement.value]);
  }
  adFormPriceElement.placeholder = TYPES_MIN_PRICE[adFormTypeElement.value];
  if (adFormPriceElement.value > 0) {
    pristine.validate(adFormPriceElement);
  }
});

pristine.addValidator(adFormCapacityElement,
  (value) => (!+value && +adFormRoomElement.value === MAX_ROOMS) || (+value && +value <= +adFormRoomElement.value && +adFormRoomElement.value !== MAX_ROOMS),
  () => +adFormRoomElement.value === MAX_ROOMS ? 'Столько комнат не для гостей.' : `Выберите количество гостей, максимум - ${adFormRoomElement.value}.`
);
adFormRoomElement.addEventListener('change', () => pristine.validate(adFormCapacityElement));

adFormTimeinElement.addEventListener('change', () => setEqualElementsValue(adFormTimeinElement, adFormTimeoutElement));
adFormTimeoutElement.addEventListener('change', () => setEqualElementsValue(adFormTimeoutElement, adFormTimeinElement));

const setFormDefault = () => {
  document.querySelector('.leaflet-popup-pane').innerHTML = '';
  document.querySelector('.map__filters').reset();
  removeFormImages();
  adForm.reset();
  adFormSliderElement.noUiSlider.reset();
  resetUserPinPosition();
};

const setAdFormSubmit = () => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {
      adForm.querySelector('.ad-form__submit').disabled = true;
      postData(
        () => {
          showSuccessModal();
          adForm.querySelector('.ad-form__submit').disabled = false;
          setFormDefault();
        },
        () => {
          showErrorModal();
          adForm.querySelector('.ad-form__submit').disabled = false;
        },
        new FormData(adForm)
      );
    } else {
      adForm.querySelectorAll('.ad-form__element-error').forEach((element) => {
        element.style.color = element.style.display === 'none' ? Color.DEFAULT_COLOR : Color.ERROR_COLOR;
      });
    }
  });
};

adFormResetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  setFormDefault();
});

setAdFormSubmit();

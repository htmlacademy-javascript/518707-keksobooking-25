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
const adFormOfferType = adForm.querySelector('#type');
const adFormOfferPrice = adForm.querySelector('#price');
const adFormOfferRoomNumber = adForm.querySelector('#room_number');
const adFormOfferCapacity = adForm.querySelector('#capacity');
const adFormOfferTimein = adForm.querySelector('#timein');
const adFormOfferTimeout = adForm.querySelector('#timeout');
const adFormResetButton = adForm.querySelector('.ad-form__reset');

const adFormSlider = adForm.querySelector('.ad-form__slider');

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

pristine.addValidator(adFormOfferPrice,
  (value) => value >= TYPES_MIN_PRICE[adFormOfferType.value],
  () => `Минимальная цена выбранного типа размещения: ${TYPES_MIN_PRICE[adFormOfferType.value]} руб.`
);

noUiSlider.create(adFormSlider, {
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

adFormSlider.noUiSlider.on('slide', () => {
  adFormOfferPrice.value = adFormSlider.noUiSlider.get();
});
adFormSlider.noUiSlider.on('change', () => {
  pristine.validate(adFormOfferPrice);
});

adFormOfferPrice.addEventListener('input', () => +adFormOfferPrice.value <= +adFormOfferPrice.max ? adFormSlider.noUiSlider.set(adFormOfferPrice.value) : adFormSlider.noUiSlider.set(adFormOfferPrice.max));

adFormOfferType.addEventListener('change', () => {
  if (+adFormOfferPrice.value < +TYPES_MIN_PRICE[adFormOfferType.value]) {
    adFormSlider.noUiSlider.set(TYPES_MIN_PRICE[adFormOfferType.value]);
  }
  adFormOfferPrice.placeholder = TYPES_MIN_PRICE[adFormOfferType.value];
  if (adFormOfferPrice.value > 0) {
    pristine.validate(adFormOfferPrice);
  }
});

pristine.addValidator(adFormOfferCapacity,
  (value) => (!+value && +adFormOfferRoomNumber.value === MAX_ROOMS) || (+value && +value <= +adFormOfferRoomNumber.value && +adFormOfferRoomNumber.value !== MAX_ROOMS),
  () => +adFormOfferRoomNumber.value === MAX_ROOMS ? 'Столько комнат не для гостей.' : `Выберите количество гостей, максимум - ${adFormOfferRoomNumber.value}.`
);
adFormOfferRoomNumber.addEventListener('change', () => pristine.validate(adFormOfferCapacity));

adFormOfferTimein.addEventListener('change', () => setEqualElementsValue(adFormOfferTimein, adFormOfferTimeout));
adFormOfferTimeout.addEventListener('change', () => setEqualElementsValue(adFormOfferTimeout, adFormOfferTimein));

const setFormDefault = () => {
  document.querySelector('.leaflet-popup-pane').innerHTML = '';
  document.querySelector('.map__filters').reset();
  removeFormImages();
  adForm.reset();
  adFormSlider.noUiSlider.reset();
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

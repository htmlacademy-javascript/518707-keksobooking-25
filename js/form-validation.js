const TYPES_MIN_PRICE = {
  'palace': 10000,
  'flat': 1000,
  'house': 5000,
  'bungalow': 0,
  'hotel': 3000
};
const MAX_ROOMS = 100;

const adForm = document.querySelector('.ad-form');
const adFormOfferType = adForm.querySelector('#type');
const adFormOfferPrice = adForm.querySelector('#price');
const adFormOfferRoomNumber = adForm.querySelector('#room_number');
const adFormOfferCapacity = adForm.querySelector('#capacity');
const adFormOfferTimein = adForm.querySelector('#timein');
const adFormOfferTimeout = adForm.querySelector('#timeout');

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
    to: function (value) {
      return value.toFixed(0);
    },
    from: function (value) {
      return parseFloat(value);
    }
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
  adFormSlider.noUiSlider.set(TYPES_MIN_PRICE[adFormOfferType.value]);
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

adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();
  if (isValid) {
    adForm.submit();
  } else {
    adForm.querySelectorAll('.ad-form__element-error').forEach((element) => {
      element.style.color = element.style.display === 'none' ? '#353535' : '#ff6547';
    });
  }
});

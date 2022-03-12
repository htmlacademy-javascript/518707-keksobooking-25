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

//Удалить после реализации карты.
adForm.querySelector('#address').value = 'Значение по умолчанию';


Pristine.addValidator('min-length',
  (value, length) => value.length >= length,
  (value, length) => `Минимальное значение ${length[1]} символов, осталось добавить: ${length[1] - value.length}.`
);

Pristine.addValidator('max-length',
  (value, length) => value.length <= length,
  (value, length) => `Превышено максимальное значение - ${length[1]} символов, текущее значение: ${value.length}.`
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
adFormOfferType.addEventListener('change', () => {
  if (adFormOfferPrice.value) {
    pristine.validate(adFormOfferPrice);
  }
  adFormOfferPrice.placeholder = TYPES_MIN_PRICE[adFormOfferType.value];
});

pristine.addValidator(adFormOfferCapacity,
  (value) => (!+value && +adFormOfferRoomNumber.value === MAX_ROOMS) || (+value && +value <= +adFormOfferRoomNumber.value && +adFormOfferRoomNumber.value !== MAX_ROOMS),
  () => {
    if (+adFormOfferRoomNumber.value === MAX_ROOMS) {
      return 'Столько комнат не для гостей.';
    } else {
      return `Выберите количество гостей, максимум - ${adFormOfferRoomNumber.value}.`;
    }
  });
adFormOfferRoomNumber.addEventListener('change', () => pristine.validate(adFormOfferCapacity));

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

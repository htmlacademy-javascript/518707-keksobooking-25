const offersData = {
  TITLES: [
    'Скромная квартирка',
    'Роскошный пентхаус',
    'Хлипкое бунгало',
    'Очаровательный подвал',
    'Семейное гнёздышко',
    'Просторный чулан'
  ],
  DESCRIPTIONS: [
    'Вам захочется провести здесь остаток жизни',
    'Больше, чем просто жильё',
    'Дружелюбные тараканы скрасят Ваше одиночество',
    'Прекрасный вариант со всеми удобствами во дворе',
    'Лучшее предложение в городе',
    'Жилье от перекупов, дёшево и надёжно (нет)'
  ],
  AVATARS: [
    'img/avatars/user01.png',
    'img/avatars/user02.png',
    'img/avatars/user03.png',
    'img/avatars/user04.png',
    'img/avatars/user05.png',
    'img/avatars/user06.png',
    'img/avatars/user07.png',
    'img/avatars/user08.png',
    'img/avatars/user09.png',
    'img/avatars/user10.png',
  ],
  PHOTOS: ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
    'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
    'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
  ],
  TYPES: ['palace', 'flat', 'house', 'bungalow', 'hotel'],
  TIMES: ['12:00', '13:00', '14:00'],
  FEATURES: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner']
};

const {
  TITLES,
  DESCRIPTIONS,
  AVATARS,
  PHOTOS,
  TYPES,
  TIMES,
  FEATURES
} = offersData;

const offerTerms = {
  ROOMS_MIN: 1,
  ROOMS_MAX: 100,
  PRICE_MIN: 10,
  PRICE_MAX: 100000,
  GUESTS_MIN: 1,
  GUESTS_MAX: 10,
  LAT_MIN: 35.65000,
  LAT_MAX: 35.70000,
  LNG_MIN: 139.70000,
  LNG_MAX: 139.80000,
  COORD_DIGITS: 5
};

const {
  ROOMS_MIN,
  ROOMS_MAX,
  PRICE_MIN,
  PRICE_MAX,
  GUESTS_MIN,
  GUESTS_MAX,
  LAT_MIN,
  LAT_MAX,
  LNG_MIN,
  LNG_MAX,
  COORD_DIGITS
} = offerTerms;

const OFFERS_TOTAL = 10;

const getRandomPositiveInteger = (a, b) => {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));

  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

const getRandomPositiveFloat = (a, b, digits = 1) => {
  const lower = Math.min(Math.abs(a), Math.abs(b));
  const upper = Math.max(Math.abs(a), Math.abs(b));

  const result = Math.random() * (upper - lower) + lower;

  return +result.toFixed(digits);
};

const getRandomArrayElement = (array) => array[getRandomPositiveInteger(0, array.length - 1)];

const getChangedArray = (array) => {
  const copy = array.slice();
  const newArray = [];

  for (let i = getRandomPositiveInteger(1, copy.length); i > 0; i--) {
    newArray.push(copy.splice(getRandomPositiveInteger(0, copy.length - 1), 1)[0]);
  }

  return newArray;
};

const createOffer = () => {
  const offerLat = getRandomPositiveFloat(LAT_MIN, LAT_MAX, COORD_DIGITS);
  const offerLng = getRandomPositiveFloat(LNG_MIN, LNG_MAX, COORD_DIGITS);
  const offerAvatar = AVATARS.splice(getRandomPositiveInteger(0, AVATARS.length - 1), 1)[0];

  return {
    author: {
      avatar: offerAvatar
    },
    offer: {
      title: getRandomArrayElement(TITLES),
      address: `${offerLat}, ${offerLng}`,
      price: getRandomPositiveInteger(PRICE_MIN, PRICE_MAX),
      type: getRandomArrayElement(TYPES),
      rooms: getRandomPositiveInteger(ROOMS_MIN, ROOMS_MAX),
      guests: getRandomPositiveInteger(GUESTS_MIN, GUESTS_MAX),
      checkin: getRandomArrayElement(TIMES),
      checkout: getRandomArrayElement(TIMES),
      features: getChangedArray(FEATURES),
      description: getRandomArrayElement(DESCRIPTIONS),
      photos: getChangedArray(PHOTOS)
    },
    location: {
      lat: offerLat,
      lng: offerLng
    }
  };
};

Array.from({length: OFFERS_TOTAL}, createOffer);

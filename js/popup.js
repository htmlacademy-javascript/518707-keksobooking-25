import {createOffers} from './data.js';

const offers = createOffers();
const offerTemplate = document.querySelector('#card').content.querySelector('.popup');
const offerPhotoTemplate = offerTemplate.querySelector('.popup__photo');
const offersFragment = document.createDocumentFragment();

const TYPES_MAP = {
  'palace': 'Дворец',
  'flat': 'Квартира',
  'house': 'Дом',
  'bungalow': 'Бунгало',
  'hotel': 'Отель'
};

offers.forEach((offer) => {
  const newOffer = offerTemplate.cloneNode(true);

  newOffer.querySelector('.popup__avatar').src = offer.author.avatar;
  newOffer.querySelector('.popup__title').textContent = offer.offer.title;
  newOffer.querySelector('.popup__text--address').textContent = offer.offer.address;
  newOffer.querySelector('.popup__text--price').innerHTML = `${offer.offer.price} <span>₽/ночь</span>`;
  newOffer.querySelector('.popup__type').textContent = TYPES_MAP[offer.offer.type];
  newOffer.querySelector('.popup__text--capacity').textContent = `${offer.offer.rooms} комнаты для ${offer.offer.guests} гостей`;
  newOffer.querySelector('.popup__text--time').textContent = `Заезд после ${offer.offer.checkin}, выезд до ${offer.offer.checkout}`;
  newOffer.querySelector('.popup__description').textContent = offer.offer.description;

  const featureModifiers = offer.offer.features.map((feature) => `popup__feature--${feature}`);
  newOffer.querySelectorAll('.popup__feature').forEach((feature) => {
    if (!featureModifiers.includes(feature.classList[1])) {
      feature.remove();
    }
  });

  const photosContainer = newOffer.querySelector('.popup__photos');
  photosContainer.textContent = '';
  offer.offer.photos.forEach((photo) => {
    const offerPhoto = offerPhotoTemplate.cloneNode(true);
    offerPhoto.src = photo;
    photosContainer.append(offerPhoto);
  });

  Array.from(newOffer.children).forEach((element) => {
    if (!element.innerHTML) {
      element.remove();
    }
  });

  offersFragment.append(newOffer);
});

const mapCanvas = document.querySelector('#map-canvas');
mapCanvas.append(offersFragment.children[0]);

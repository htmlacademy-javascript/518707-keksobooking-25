const TYPES_MAP = {
  'palace': 'Дворец',
  'flat': 'Квартира',
  'house': 'Дом',
  'bungalow': 'Бунгало',
  'hotel': 'Отель'
};

const createPopup = (offer) => {
  const offerTemplate = document.querySelector('#card').content.querySelector('.popup');
  const newOffer = offerTemplate.cloneNode(true);
  const photosContainer = newOffer.querySelector('.popup__photos');
  const offerPhotoTemplate = newOffer.querySelector('.popup__photo');


  newOffer.querySelector('.popup__avatar').src = offer.author.avatar;
  newOffer.querySelector('.popup__title').textContent = offer.offer.title;
  newOffer.querySelector('.popup__text--address').textContent = offer.offer.address;
  newOffer.querySelector('.popup__text--price').innerHTML = `${offer.offer.price} <span>₽/ночь</span>`;
  newOffer.querySelector('.popup__type').textContent = TYPES_MAP[offer.offer.type];
  newOffer.querySelector('.popup__text--capacity').textContent = `${offer.offer.rooms} комнаты для ${offer.offer.guests} гостей`;
  newOffer.querySelector('.popup__text--time').textContent = `Заезд после ${offer.offer.checkin}, выезд до ${offer.offer.checkout}`;
  newOffer.querySelector('.popup__description').textContent = offer.offer.description;

  if (offer.offer.features) {
    const featureModifiers = offer.offer.features.map((feature) => `popup__feature--${feature}`);
    newOffer.querySelectorAll('.popup__feature').forEach((feature) => {
      if (!featureModifiers.includes(feature.classList[1])) {
        feature.remove();
      }
    });
  } else {
    newOffer.querySelector('.popup__features').remove();
  }

  if (offer.offer.photos) {
    photosContainer.textContent = '';
    offer.offer.photos.forEach((photo) => {
      const offerPhoto = offerPhotoTemplate.cloneNode(true);
      offerPhoto.src = photo;
      photosContainer.append(offerPhoto);
    });
  } else {
    photosContainer.remove();
  }

  Array.from(newOffer.children).forEach((element) => {
    if (!element.innerHTML && element.tagName !== 'IMG') {
      element.remove();
    }
  });

  return newOffer;
};

export {createPopup};

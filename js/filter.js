const Price = {
  LOW_PRICE: 10000,
  HIGH_PRICE: 50000
};

const mapFiltersForm = document.querySelector('.map__filters');
const typeFilterElement = mapFiltersForm.querySelector('#housing-type');
const roomsFilterElement = mapFiltersForm.querySelector('#housing-rooms');
const guestsFilterElement = mapFiltersForm.querySelector('#housing-guests');
const priceFilterElement = mapFiltersForm.querySelector('#housing-price');
const featuresFilterElement = mapFiltersForm.querySelector('#housing-features');

const filterType = (offer) => typeFilterElement.value === 'any' ? true : offer.offer.type === typeFilterElement.value;
const filterRooms = (offer) => roomsFilterElement.value === 'any' ? true : offer.offer.rooms === +roomsFilterElement.value;
const filterGuests = (offer) => {
  switch (guestsFilterElement.value) {
    case 'any' : return true;
    case 0 : return offer.offer.guests === 0;
    default : return offer.offer.guests <= roomsFilterElement.value;
  }
};
const filterPrice = (offer) => {
  switch (priceFilterElement.value) {
    case 'middle' : return offer.offer.price > Price.LOW_PRICE && offer.offer.price <= Price.HIGH_PRICE;
    case 'low' : return offer.offer.price <= Price.LOW_PRICE;
    case 'high' : return offer.offer.price > Price.HIGH_PRICE;
    default : return true;
  }
};
const filterFeatures = (offer) => {
  const checkedFeatures = Array.from(featuresFilterElement.querySelectorAll('.map__checkbox:checked')).map((element) => element.value);
  return (offer.offer.features) ? checkedFeatures.every((feature) => offer.offer.features.includes(feature)) : checkedFeatures.length === 0;
};

const filterMapOffers = (offers) => offers.filter((offer) =>
  filterType(offer)
  && filterRooms(offer)
  && filterPrice(offer)
  && filterGuests(offer)
  && filterFeatures(offer)
);

export {filterMapOffers};

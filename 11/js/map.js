import {setFormState, debounce} from './utils.js';
import {createPopup} from './popup.js';
import {getData} from './server-requests.js';
import {filterMapOffers} from './filter.js';

const CENTER_LAT = 35.67680;
const CENTER_LNG = 139.75610;
const ERROR_REMOVE_DELAY = 5000;
const RERENDER_DELAY = 500;
const MAX_PINS = 10;
const address = document.querySelector('#address');

setFormState('ad-form', true);
setFormState('map__filters', true);

const map = L.map('map-canvas')
  .on('load', () => {
    setFormState('ad-form', false);
    setFormState('map__filters', false);
    address.value = `${CENTER_LAT}, ${CENTER_LNG}`;
  })
  .setView({
    lat: CENTER_LAT,
    lng: CENTER_LNG
  }, 13);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const userPin = L.marker(
  [CENTER_LAT, CENTER_LNG],
  {
    icon: L.icon({
      iconUrl: './img/main-pin.svg',
      iconSize: [52, 52],
      iconAnchor: [26, 52]
    }),
    keyboard: true,
    draggable: true,
    riseOnHover: true,
  })
  .addTo(map);

const offerPinIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

userPin.on('move', (evt) => {
  const coordinates = evt.target.getLatLng();
  address.value = `${coordinates.lat.toFixed(5)}, ${coordinates.lng.toFixed(5)}`;
});

const markerGroup = L.layerGroup().addTo(map);

const createOfferPin = (offer) => {
  const offerPin = L.marker(
    [offer.location.lat, offer.location.lng],
    {
      icon: offerPinIcon
    }
  );

  offerPin.addTo(markerGroup).bindPopup(createPopup(offer));
};

const renderMapOffers = (offers) => {
  markerGroup.clearLayers();
  filterMapOffers(offers)
    .slice(0, MAX_PINS)
    .forEach((offer) => createOfferPin(offer));
};

const setFilterChange = (cb) => {
  document.querySelector('.map__filters').addEventListener('change', () => {
    cb();
  });
};

const templateError = (errCode) => {
  const errorElement = document.createElement('div');
  errorElement.innerText = `Не удалось загрузить похожие объявления, код ошибки ${errCode}.`;
  errorElement.style.cssText = `
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 10000;
  padding: 5px;
  background-color: #ff6547;
  text-align: center;
  color: #353535;
  `;
  document.querySelector('.map').appendChild(errorElement);

  setTimeout(() => {
    errorElement.remove();
  }, ERROR_REMOVE_DELAY);
};

getData((offers) => {
  renderMapOffers(offers);
  setFilterChange(debounce(() => renderMapOffers(offers), RERENDER_DELAY));
}, templateError);

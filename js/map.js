import {setFormActive, setFormDisabled} from './utils.js';
import {createPopup} from './popup.js';
import {getData} from './server-requests.js';

const CENTER_LAT = 35.67680;
const CENTER_LNG = 139.75610;
const ERROR_REMOVE_DELAY = 5000;
const PIN_RENDER_DELAY = 50;
const MAX_PINS = 10;
const address = document.querySelector('#address');

setFormDisabled();

const map = L.map('map-canvas')
  .on('load', () => {
    setFormActive();
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
  offers.slice(0, MAX_PINS + 1).forEach((offer, offerId) => {
    setTimeout(() => createOfferPin(offer), PIN_RENDER_DELAY * offerId);
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

getData(renderMapOffers, templateError);

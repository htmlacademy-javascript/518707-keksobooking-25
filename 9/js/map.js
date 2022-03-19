import {setFormActive} from './form-condition.js';
import {createPopup} from './popup.js';
import {offers} from './data.js';

const CENTER_LAT = 35.67680;
const CENTER_LNG = 139.75610;
const address = document.querySelector('#address');

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

offers.forEach((offer) => {
  createOfferPin(offer);
});

userPin.on('move', (evt) => {
  const coordinates = evt.target.getLatLng();
  address.value = `${coordinates.lat.toFixed(5)}, ${coordinates.lng.toFixed(5)}`;
});

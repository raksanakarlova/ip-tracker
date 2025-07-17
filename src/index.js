import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import icon from '../images/icon-location.svg';
import {validateIp, addTileLayer, addOffset} from './helpers';

const ipInput = document.querySelector('.search-bar__input');
const ipBtn = document.querySelector('.search-bar__btn');

const ipInfo = document.querySelector('#ip');
const locationInfo = document.querySelector('#location');
const timezoneInfo = document.querySelector('#timezone');
const ispInfo = document.querySelector('#isp');

ipBtn.addEventListener('click', getData);
ipInput.addEventListener('keydown', handleKey);

// Карта:
const mapArea = document.querySelector('.map');
const map = L.map(mapArea).setView([51.505, -0.09], 13);

const markerIcon = L.icon({
  iconUrl: icon,
  iconSize: [30, 40]
});
addTileLayer(map);

L.marker([51.5, -0.09], { icon: markerIcon }).addTo(map)

// Получение данных с сервера по клику на кнопку:
function getData(ipFromParam) {
  const ip = ipFromParam || ipInput.value

  if(validateIp(ip)) {
    fetch(`http://localhost:3000/api/ip?ip=${ip}`)
      .then(response => response.json())
      .then(data => setInfo(data))
  }
}

// Событие по клавише Enter:
function handleKey(e) {
  if(e.key === 'Enter') {
    getData()
  }
}

// Динамическая работа с DOM:
function setInfo(mapData) {
  const {ip, location, isp} = mapData;
  const {lat, lng, country, region, timezone} = mapData.location;
  ipInfo.innerText = ip;
  locationInfo.innerText = `${country} ${region}`;
  timezoneInfo.innerText = timezone;
  ispInfo.innerText = isp;

  map.setView([lat, lng]);
  L.marker([lat, lng], {icon: markerIcon}).addTo(map);

  if(matchMedia("(max-width: 1023px)").matches) {
    addOffset(map);
  }
}

// IP по умолчанию:
function loadDefaultIp() {
  const defaultIp = '102.22.22.1';
  if (validateIp(defaultIp)) {
    fetch(`http://localhost:3000/api/ip?ip=${defaultIp}`)
      .then(res => res.json())
      .then(data => setInfo(data));
  }
}

document.addEventListener('DOMContentLoaded', loadDefaultIp)


import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://api.github.com',
});

export const mapsApi = axios.create({
  baseURL: 'https://nominatim.openstreetmap.org/',
});

import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://api.github.com',
});

export const qrCodeApi = axios.create({
  baseURL: 'https://chart.googleapis.com',
});

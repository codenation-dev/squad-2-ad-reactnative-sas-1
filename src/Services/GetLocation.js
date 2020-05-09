import React, {useState} from 'react';
import {mapsApi, api} from './.Api';

export default function useGeoHook() {
  const [geoPosition, setgeoPosition] = useState({});

  async function getLocation(lat, lon) {
    try {
      const response = await mapsApi.get('reverse', {
        params: {
          format: 'json',
          lat,
          lon,
          addressdetails: 1,
          'accept-language': 'pt-BR',
          zoom: 18,
        },
        headers: {
          Referer: 'https://vetor.tech',
          'User-Agent':
            'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36',
        },
      });
      setInputLoading(false);
      setLocationSearch(response.data.address.city);
      setLocation(response.data);
    } catch (e) {
      console.log(e);
      console.log(e.response);
      console.log(e.response.data);
    }
  }
}

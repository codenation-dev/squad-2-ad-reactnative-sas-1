import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';

export default function useFavorites() {
  const [favorites, setFavorites] = React.useState([]);

  React.useEffect(() => {
    async function loadFavorites() {
      const favourites =
        JSON.parse(await AsyncStorage.getItem('favourites')) || [];
      setFavorites(favourites);
    }
    loadFavorites();
  }, []);

  React.useEffect(() => {
    async function save() {
      await AsyncStorage.setItem('favourites', JSON.stringify(favorites));
    }
    save();
  }, [favorites]);

  async function favorite(profile) {
    if (favorites.length <= 0) {
      setFavorites([profile]);
    } else {
      const isFavouriteAlready = favorites.findIndex(
        (favourite) => favourite.id === profile.id
      );
      if (isFavouriteAlready < 0) {
        setFavorites((prev) => [...prev, profile]);
      } else {
        setFavorites(
          favorites.filter((favourite) => favourite.id !== profile.id)
        );
      }
    }
  }

  const reload = React.useCallback(async (callback) => {
    const data = (await AsyncStorage.getItem('favourites')) || [];
    setFavorites(JSON.parse(data));
    callback();
  }, []);

  return [favorites, favorite, reload];
}

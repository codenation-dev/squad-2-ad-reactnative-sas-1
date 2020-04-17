import AsyncStorage from '@react-native-community/async-storage';

import api from './Api';

const AuthService = {
  async login(user, password) {
    // seta a variavel btoa do axios para base64
    window.btoa = require('Base64').btoa;

    try {
      // busca o usuario e senha no github
      const data = await api.get('/user', {
        auth: {
          username: user,
          password,
        },
      });

      // grava os dados obtidos na localstorage como user_profile
      await AsyncStorage.setItem('user_profile', JSON.stringify(data.data));

      return data;
    } catch (err) {
      console.log(err);
    }
  },
};
export default AuthService;

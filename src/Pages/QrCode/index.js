import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';

import AppContainer from '../../Components/AppContainer';
import Header from '../../Components/Header';
import HeaderTitle from '../../Components/HeaderTitle';
import HeaderSubtitle from '../../Components/HeaderSubtitle';

export default function QrCode() {
  // exemplo de busca de dados na storage com hooks
  const [userData, setUserData] = React.useState([]);

  React.useEffect(() => {
    async function fetchData() {
      const data = await AsyncStorage.getItem('user_profile');
      setUserData(JSON.parse(data));
    }
    fetchData();
  }, []);

  console.log('user - Data', userData);

  return (
    <AppContainer>
      <Header profile_image={userData.avatar_url}>
        <HeaderTitle>{userData.login}</HeaderTitle>
        <HeaderSubtitle>
          Exibindo o qr code para compartilhar seu perfil com outros devs
        </HeaderSubtitle>
      </Header>
    </AppContainer>
  );
}

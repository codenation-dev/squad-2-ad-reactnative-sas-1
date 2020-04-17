import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {Alert} from 'react-native';

import AppContainer from '../../Components/AppContainer';
import Header from '../../Components/Header';
import HeaderTitle from '../../Components/HeaderTitle';
import HeaderSubtitle from '../../Components/HeaderSubtitle';
import Container from '../../Components/Container';
import Button from '../../Components/Button';
import QRCodeBox from '../../Components/QRCodeBox';

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

  const handleTest = () => {
    Alert.alert('Testando');
  };

  return (
    <AppContainer>
      <Header profile_image={userData.avatar_url}>
        <HeaderTitle>{userData.login}</HeaderTitle>
        <HeaderSubtitle>
          Exibindo o QRCode para compartilhar seu perfil com outros devs
        </HeaderSubtitle>
      </Header>
      <Container>
        <QRCodeBox profile_url={userData.html_url} />
        <Button title="Ler QRCode" onPress={handleTest} />
        <Button title="Recarregar QRCode" onPress={handleTest} />
      </Container>
    </AppContainer>
  );
}

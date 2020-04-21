import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {ActivityIndicator, View} from 'react-native';

import AppContainer from '../../Components/AppContainer';
import Header from '../../Components/Header';
import HeaderTitle from '../../Components/HeaderTitle';
import HeaderSubtitle from '../../Components/HeaderSubtitle';
import Container from '../../Components/Container';
import Button from '../../Components/Button';
import QRCodeBox from '../../Components/QRCodeBox';

const qrCodeContainer = {
  height: 280,
  alignItems: 'center',
  justifyContent: 'center',
};

export default function QrCode() {
  const [userData, setUserData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    async function fetchData() {
      const data = await AsyncStorage.getItem('user_profile');
      setUserData(JSON.parse(data));
    }
    fetchData();
  }, []);

  const handleTest = () => {
    setLoading(true);
    const data = userData;
    setUserData([]);

    setTimeout(function () {
      setUserData(data);
      setLoading(false);
    }, 500);
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
        <View style={qrCodeContainer}>
          {loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <QRCodeBox profile_url={userData.url} />
          )}
        </View>
        <Button title="Ler QRCode" onPress={handleTest} />
        <Button title="Recarregar QRCode" onPress={handleTest} />
      </Container>
    </AppContainer>
  );
}

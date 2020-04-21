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
    console.log('olar');
  };

  const reloadQrCode = () => {
    setLoading(true);

    const qrCode_url = userData.url;

    setUserData((data) => {
      data.url = 'loading...';
      return data;
    });

    setTimeout(function () {
      setUserData((data) => {
        data.url = qrCode_url;
        return data;
      });
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
            <ActivityIndicator size="large" color="#5A54FF" />
          ) : (
            <QRCodeBox profile_url={userData.url} />
          )}
        </View>
        <Button title="Ler QRCode" onPress={handleTest} />
        <Button title="Recarregar QRCode" onPress={reloadQrCode} />
      </Container>
    </AppContainer>
  );
}

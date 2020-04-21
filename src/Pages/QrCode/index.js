import React from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import {ActivityIndicator, View} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';

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
  const [openCamera, setOpenCamera] = React.useState(false);

  React.useEffect(() => {
    async function fetchData() {
      const data = await AsyncStorage.getItem('user_profile');
      setUserData(JSON.parse(data));
    }
    fetchData();
  }, []);

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

  const handleQrCodeReads = async (qrCode) => {
    const profile_url = qrCode.data;

    const api = axios.create({
      baseURL: profile_url,
    });

    const {data} = await api.get();

    console.log(data);
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
        <Button title="Ler QRCode" onPress={() => setOpenCamera(true)} />
        <Button title="Recarregar QRCode" onPress={reloadQrCode} />
        {openCamera && (
          <View style={{position: 'absolute', top: 60}}>
            <QRCodeScanner onRead={handleQrCodeReads} showMarker />
            <Button
              title="fechar camera"
              onPress={() => setOpenCamera(false)}
            />
          </View>
        )}
      </Container>
    </AppContainer>
  );
}

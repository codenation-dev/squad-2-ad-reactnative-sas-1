import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {ActivityIndicator, View, Alert} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';

import {api} from '../../Services/Api';

import AppContainer from '../../Components/AppContainer';
import Header from '../../Components/Header';
import HeaderTitle from '../../Components/HeaderTitle';
import HeaderSubtitle from '../../Components/HeaderSubtitle';
import Container from '../../Components/Container';
import Button from '../../Components/Button';
import QRCodeBox from '../../Components/QRCodeBox';

import {CloseButton, CloseText} from './styles';

console.disableYellowBox = true;

const qrCodeContainer = {
  height: 280,
  alignItems: 'center',
  justifyContent: 'center',
};

export default function QrCode({navigation}) {
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
    setOpenCamera(false);

    const profile = qrCode.data;

    // data = dados do usuário obtido através do QRCode.
    try {
      const {data} = await api.get(`/users/${profile}`);

      navigation.navigate('DetailDev', {
        profile: data,
      });
    } catch (err) {
      Alert.alert(
        'Oh não!',
        'ocorreu um erro na leitura do QRCode, por favor tente recarrega-lo'
      );
    }
  };

  return (
    <AppContainer>
      <Header profile_image={userData.avatar_url}>
        <HeaderTitle>{userData.login}</HeaderTitle>
        <HeaderSubtitle>
          {openCamera
            ? 'Aponte sua câmera para ler o QR de outro dev e ir para seu perfil'
            : 'Exibindo o QRCode para compartilhar seu perfil com outros devs'}
        </HeaderSubtitle>
      </Header>
      <Container>
        {!openCamera && (
          <>
            <View style={qrCodeContainer}>
              {loading ? (
                <ActivityIndicator size="large" color="#5A54FF" />
              ) : (
                <QRCodeBox profile_url={userData.login} />
              )}
            </View>
            <Button title="Ler QRCode" onPress={() => setOpenCamera(true)} />
            <Button title="Recarregar QRCode" onPress={reloadQrCode} />
          </>
        )}
        {openCamera && (
          <QRCodeScanner
            onRead={handleQrCodeReads}
            showMarker
            checkAndroid6Permissions
            containerStyle={{
              alignSelf: 'center',
              marginTop: -50,
            }}
            topViewStyle={{
              zIndex: 1000,
            }}
            topContent={
              <CloseButton onPress={() => setOpenCamera(false)}>
                <CloseText>X</CloseText>
              </CloseButton>
            }
          />
        )}
      </Container>
    </AppContainer>
  );
}

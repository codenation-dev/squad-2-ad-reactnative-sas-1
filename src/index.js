import 'react-native-gesture-handler';
import React from 'react';
import SplashScreen from 'react-native-splash-screen';
import AsyncStorage from '@react-native-community/async-storage';

import {StatusBar, YellowBox, ActivityIndicator} from 'react-native';

import Routes from './Routes';
import SignIn from './Pages/SignIn';

import './Config/Reactotron';

YellowBox.ignoreWarnings(['Remote debugger']);

export default function App() {
  const [logged, setLogged] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function isLogged() {
      const user_profile = await AsyncStorage.getItem('user_profile');

      if (user_profile !== null) {
        setLogged(true);
      } else {
        setLogged(false);
      }
      setLoading(false);
    }
    isLogged();
  }, []);

  console.log('login ', logged);

  const login = () => setLogged(!logged);

  React.useEffect(() => {
    SplashScreen.hide();
  }, []);

  function ActualContext() {
    if (loading) {
      return (
        <ActivityIndicator
          size="large"
          color="#0000ff"
          style={{flex: 1, justifyContent: 'center', alignSelf: 'center'}}
        />
      );
    }
    if (!loading && logged) {
      return <Routes />;
    }
    if (!loading && !logged) {
      return (
        <SignIn
          login={() => {
            login();
          }}
        />
      );
    }
  }
  return (
    <>
      <StatusBar
        hidden={false}
        backgroundColor="transparent"
        barStyle="light-content"
        translucent
      />
      <ActualContext />
    </>
  );
}

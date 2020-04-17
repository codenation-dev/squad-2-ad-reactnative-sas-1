import 'react-native-gesture-handler';
import React from 'react';
import SplashScreen from 'react-native-splash-screen';
import AsyncStorage from '@react-native-community/async-storage';

import {StatusBar, YellowBox} from 'react-native';

import Routes from './Routes';
import SignIn from './Pages/SignIn';

import './Config/Reactotron';

YellowBox.ignoreWarnings(['Remote debugger']);

export default function App() {
  const [userData, setUserData] = React.useState([]);

  React.useEffect(() => {
    async function fetchData() {
      const data = await AsyncStorage.getItem('user_profile');
      setUserData(JSON.parse(data));
    }
    fetchData();
  }, []);

  const [logged, setLogged] = React.useState(!!userData);
  const login = () => setLogged(!logged);

  React.useEffect(() => {
    SplashScreen.hide();
  }, []);

  function ActualContext() {
    return logged ? (
      <Routes />
    ) : (
      <SignIn
        login={() => {
          login();
        }}
      />
    );
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

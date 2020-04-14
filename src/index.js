import React from 'react';
import {StatusBar, YellowBox} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import Routes from './Routes';
import 'react-native-gesture-handler';
import SignIn from './Pages/SignIn';
import './Config/Reactotron';

YellowBox.ignoreWarnings(['Remote debugger']);

export default function App() {
  const [logged, setLogged] = React.useState(false);
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

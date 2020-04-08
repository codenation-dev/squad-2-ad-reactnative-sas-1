import Reactotron from 'reactotron-react-native';

if (__DEV__) {
  const tron = Reactotron.configure({
    host: '192.168.1.50', // ip caso for usar modo usb
  })
    .useReactNative()
    .connect();

  console.tron = tron;
  tron.clear();
}

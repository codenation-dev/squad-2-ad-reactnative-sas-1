import Reactotron from 'reactotron-react-native';

if (__DEV__) {
  const tron = Reactotron.configure({
    host: 'localhost', // ip caso for usar modo usb
  })
    .useReactNative()
    .connect();

  console.tron = tron;
  tron.clear();
}

import React from 'react';
import {View, Text} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import {title} from '../../Styles/Typography';

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

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={title}> QrCode </Text>
      <Text>{userData.url}</Text>
    </View>
  );
}

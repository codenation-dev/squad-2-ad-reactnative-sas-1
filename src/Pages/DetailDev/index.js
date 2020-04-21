import React from 'react';
import {ScrollView, View, Text, SafeAreaView} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {BackHeader, ButtonBack, TitleDev, ButtonFav} from './styles';
import AppContainer from '../../Components/AppContainer';

export default function DetailDev({route, navigation}) {
  const {profile = {oi: 1}} = route.params;

  const data = React.useMemo(() => {
    return Object.entries(profile).reduce(
      (atual, [key, value]) => (atual += `\n${key} : ${value} \n`),
      ''
    );
  }, [profile]);
  return (
    <SafeAreaView>
      <View>
        <BackHeader>
          <ButtonBack onPress={() => navigation.goBack()}>
            <Icon
              name="chevron-left"
              color="#fff"
              size={25}
              style={{padding: 0, marginTop: 10}}
            />
          </ButtonBack>
          <TitleDev>{profile.login}</TitleDev>
          <ButtonFav>
            <Icon name="star-face" color="#fff" size={25} />
          </ButtonFav>
        </BackHeader>
        <ScrollView>
          <AppContainer>
            {/* pode apagar daqui pra baixo */}

            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                padding: 20,
              }}>
              <Text style={{fontWeight: 'bold', fontSize: 30}}>
                os dados que vem:
              </Text>
              <Text style={{fontWeight: 'bold', fontSize: 20}}>
                o nome do usuário: {profile.login}
              </Text>
              <Text>{data}</Text>
            </View>

            {/* pode apagar daqui pra cima */}
          </AppContainer>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

import React, {forwardRef} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {FlatList, View} from 'react-native';
import AppContainer from '../../Components/AppContainer';
import Header from '../../Components/Header';
import HeaderTitle from '../../Components/HeaderTitle';
import HeaderSubtitle from '../../Components/HeaderSubtitle';
import Container from '../../Components/Container';
import SearchInput from '../../Components/SearchInput';
import ListContainer from '../../Components/ListContainer';
import ListTitle, {Bold} from '../../Components/ListTitle';
import ListItemsContainer from '../../Components/ListItemsContainer';
import DevListItem from '../../Components/DevListItem';

import Devs from '../../Components/DevListItem/devs.json';

function Home(props, ref) {
  const [userData, setUserData] = React.useState([]);

  React.useEffect(() => {
    async function fetchData() {
      const data = await AsyncStorage.getItem('user_profile');
      setUserData(JSON.parse(data));
    }
    fetchData();
  }, []);

  return (
    <AppContainer>
      <Header
        profile_image={userData.avatar_url}
        onPressImage={() => props.navigation.navigate('QrCode')}>
        <HeaderTitle>DevFinder</HeaderTitle>
        <HeaderSubtitle>
          Exibindo Desenvolvedores semelhantes em municípios próximos. Para
          modificar suas preferências utilize o campo de busca.
        </HeaderSubtitle>
      </Header>
      <Container>
        <SearchInput
          placeholder="Digite a cidade desejada"
          emitter={props.emitter}
        />
        <ListContainer>
          <ListTitle>
            DESENVOLVEDORES EM <Bold>SÃO PAULO-SP</Bold>
          </ListTitle>
          <ListItemsContainer>
            <FlatList
              ref={ref}
              ListFooterComponent={() => <View style={{height: 100}} />}
              keyExtractor={(item) => String(item.id)}
              data={Devs}
              renderItem={({item}) => <DevListItem profile={item} />}
              onScrollBeginDrag={() => props.emitter.emit('startDrag')}
              onScrollEndDrag={() => props.emitter.emit('endDrag')}
            />
          </ListItemsContainer>
        </ListContainer>
      </Container>
    </AppContainer>
  );
}

export default forwardRef(Home);

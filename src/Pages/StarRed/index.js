import React, {useState, useEffect} from 'react';
import {FlatList} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import AppContainer from '../../Components/AppContainer';
import Header from '../../Components/Header';
import HeaderTitle from '../../Components/HeaderTitle';
import HeaderSubtitle from '../../Components/HeaderSubtitle';
import Container from '../../Components/Container';
import SearchInput from '../../Components/SearchInput';
import ListContainer from '../../Components/ListContainer';
import ListItemsContainer from '../../Components/ListItemsContainer';
import DevListItem from '../../Components/DevListItem';

export default function StarRed({navigation}) {
  const [favs, setFavs] = useState([]);

  useEffect(() => {
    const getFavs = async () => {
      const data = await AsyncStorage.getItem('favourites');
      setFavs(JSON.parse(data));
    };

    getFavs();
  }, [favs]);

  return (
    <AppContainer>
      <Header>
        <HeaderTitle>Favoritos</HeaderTitle>
        <HeaderSubtitle>
          Aqui ficam os seus desenvolvedores marcados como favoritos!
        </HeaderSubtitle>
      </Header>
      <Container>
        <SearchInput
          placeholder="Digite o nome/login do desenvolvedor"
          onlySearch
        />
        <ListContainer>
          <ListItemsContainer>
            <FlatList
              keyExtractor={(item) => String(item.id)}
              data={favs}
              renderItem={({item}) => (
                <DevListItem
                  profile={item}
                  favorited
                  onPress={() =>
                    navigation.navigate('DetailDev', {
                      profile: item,
                    })
                  }
                />
              )}
            />
          </ListItemsContainer>
        </ListContainer>
      </Container>
    </AppContainer>
  );
}

import React, {useState, useEffect} from 'react';
import {FlatList, ActivityIndicator, View} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import EventEmmiter from '../../events';

import AppContainer from '../../Components/AppContainer';
import Header from '../../Components/Header';
import HeaderTitle from '../../Components/HeaderTitle';
import HeaderSubtitle from '../../Components/HeaderSubtitle';
import Container from '../../Components/Container';
import SearchInput from '../../Components/SearchInput';
import ListContainer from '../../Components/ListContainer';
import ListItemsContainer from '../../Components/ListItemsContainer';
import DevListItem from '../../Components/DevListItem';
import useFavorites from '../../Services/useFavorites';

export default function StarRed({navigation}) {
  // const [favs, setFavs] = useState();
  const [loading, setLoading] = useState(true);

  const [favs, favorite, reload] = useFavorites();

  const focus = useIsFocused();

  useEffect(() => {
    if (focus) {
      setTimeout(() => {
        reload(() => setLoading(false));
      }, 2000);
    } else {
      setLoading(true);
    }
  }, [focus, reload]);
  // const handleSearch = (search) => {
  //   const finded = allFavs.filter((fav) => fav.login.indexOf(search) !== -1);

  //   setFavs(finded);
  // };

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
          onChangeText={(search) => handleSearch(search)}
        />
        <ListContainer>
          <ListItemsContainer>
            {loading ? (
              <ActivityIndicator size="large" color="#5A54FF" />
            ) : (
              <FlatList
                keyExtractor={(item) => String(item.id)}
                data={favs}
                showsVerticalScrollIndicator={false}
                renderItem={({item}) => (
                  <DevListItem
                    profile={item}
                    favorited
                    onFavorite={favorite}
                    onPress={() =>
                      navigation.navigate('DetailDev', {
                        profile: item,
                      })
                    }
                  />
                )}
                ListFooterComponent={() => <View style={{padding: 100}} />}
                onScrollBeginDrag={() =>
                  EventEmmiter.dispatch('MenuOpacity', 0.3)
                }
                onScrollEndDrag={() => EventEmmiter.dispatch('MenuOpacity', 1)}
              />
            )}
          </ListItemsContainer>
        </ListContainer>
      </Container>
    </AppContainer>
  );
}

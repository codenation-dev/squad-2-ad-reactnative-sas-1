import React, {useRef, useState, useCallback, useMemo, useEffect} from 'react';
import AsyncStorage from '@react-native-community/async-storage';

import {
  FlatList,
  Alert,
  Keyboard,
  Animated,
  Easing,
  Dimensions,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import EventEmmiter from '../../events';
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
import ListEndComponent from '../../Components/ListEndComponent';
import ListNotFound from '../../Components/ListNotFound';
import FigureHome from '../../Components/FigureHome';

import {mapsApi, api} from '../../Services/Api';

const INITIAL_PAGINATION = {
  count: null,
  page: 1,
  perPage: 30,
  lastPage: false,
};

function displayErros(error) {
  Alert.alert('Ocorreu um erro.', `${error}`);
}

function Home({navigation}) {
  const [paginationDetails, setPaginationDetails] = useState({
    ...INITIAL_PAGINATION,
  });
  const [animationLeft] = useState(
    new Animated.Value(-Dimensions.get('window').width)
  );

  const [devList, setDevList] = useState([]);

  const [inputLoading, setInputLoading] = useState(true);

  const [locationSearch, setLocationSearch] = useState('');

  const [search, setSearch] = useState('');

  const devListRef = useRef();

  const handleFindDev = useCallback(async () => {
    if (!locationSearch) return;
    devListRef.current.scrollToOffset({animated: true, offset: 0});
    Keyboard.dismiss();

    const favourites = JSON.parse(await AsyncStorage.getItem('favourites'));

    try {
      setInputLoading(true);
      const response = await api.get(
        `search/users?q=location:${locationSearch}`,
        {},
        {timeout: 4}
      );
      setInputLoading(false);
      setSearch(locationSearch);
      setPaginationDetails({
        count: response.data.total_count,
        page: 1,
        perPage: response.data.items.length,
        lastPage: false,
      });
      setDevList(response.data.items);
    } catch (e) {
      setInputLoading(false);
      displayErros('Erro na requisição');
      console.log(e);
      console.log(e.response.data);
    }
  }, [locationSearch]);

  useEffect(() => {
    const teste = navigation.addListener('focus', async () => {
      const favourites = JSON.parse(await AsyncStorage.getItem('favourites'));

      const new_devList = devList.map((item) => {
        const findFavorite = favourites.find(
          (favourited) => favourited.id === item.id
        );

        if (findFavorite) {
          item.favourite = true;
        } else {
          item.favourite = false;
        }
        return item;
      });
      setDevList(new_devList);
    });
    return teste;
  }, [navigation, devList]);

  useEffect(() => {
    if (locationSearch) {
      handleFindDev();
    }
  }, [locationSearch, handleFindDev]);

  async function handleOnEachList() {
    try {
      setInputLoading(true);
      const {page} = paginationDetails;
      const response = await api.get(`search/users?q=location:${search}`, {
        params: {
          page: page + 1,
        },
      });
      setInputLoading(false);
      setDevList([...devList, ...response.data.items]);
      setPaginationDetails({
        count: response.data.total_count,
        page: page + 1,
        perPage: response.data.items.length,
        lastPage: false,
      });
    } catch (e) {
      setInputLoading(false);
      displayErros('erro na api do github 22');
      console.log(e);
    }
  }

  async function getLocation(lat, lon) {
    try {
      const response = await mapsApi.get('reverse', {
        params: {
          format: 'json',
          lat,
          lon,
          addressdetails: 1,
          'accept-language': 'pt-BR',
          zoom: 18,
        },
        headers: {
          Referer: 'https://vetor.tech',
          'User-Agent':
            'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36',
        },
      });
      setInputLoading(false);
      setLocationSearch(response.data.address.city);
      handleFindDev();
    } catch (e) {
      console.log(e);
      console.log(e.response);
      console.log(e.response.data);
    }
  }

  const getPosition = useCallback(() => {
    setInputLoading(false);

    const sucesso = ({coords}) =>
      getLocation(coords.latitude, coords.longitude);

    const erro = (error) => {
      setInputLoading(false);
      displayErros('Não foi possível obter sua localização.');
      console.log(error);
    };
    Geolocation.getCurrentPosition(sucesso, erro, {
      enableHighAccuracy: true,
      timeout: 20000,
    });
  }, []);

  // check if request returns devs
  const notFound = useMemo(() => {
    return paginationDetails.count === 0;
  }, [paginationDetails]);

  // check if flatlist has arrived to end
  const EndReached = useMemo(() => {
    return Math.ceil(paginationDetails.count / 30) === paginationDetails.page;
  }, [paginationDetails]);

  // effect on didMount

  useEffect(() => {
    getPosition();
    Animated.timing(animationLeft, {
      toValue: 0,
      duration: 600,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  }, [animationLeft, getPosition]);

  return (
    <AppContainer>
      <Header>
        <HeaderTitle>DevFinder</HeaderTitle>
        <HeaderSubtitle>
          Exibindo Desenvolvedores semelhantes em municípios próximos. Para
          modificar suas preferências utilize o campo de busca.
        </HeaderSubtitle>
      </Header>
      <Container>
        <SearchInput
          placeholder="Digite a cidade desejada"
          onChangeText={setLocationSearch}
          value={locationSearch}
          loading={inputLoading}
          onLocationClick={getPosition}
          onFindClick={handleFindDev}
        />

        <ListContainer>
          {devList.length > 0 || notFound ? (
            <ListTitle>
              DESENVOLVEDORES EM <Bold>{search.toUpperCase()}</Bold>
            </ListTitle>
          ) : (
            <>
              <Animated.View
                style={{
                  transform: [{translateX: animationLeft}],
                }}>
                <FigureHome />
              </Animated.View>
            </>
          )}
          <ListItemsContainer>
            <FlatList
              ref={devListRef}
              keyExtractor={(item) => String(item.id)}
              data={devList}
              maxToRenderPerBatch={10}
              renderItem={({item}) => {
                return (
                  <DevListItem
                    profile={item}
                    onPress={() =>
                      navigation.navigate('DetailDev', {
                        profile: item,
                      })
                    }
                    favorited={item.favourite}
                  />
                );
              }}
              onEndReachedThreshold={0.1}
              showsVerticalScrollIndicator={false}
              onEndReached={!EndReached && handleOnEachList}
              onScrollBeginDrag={() =>
                EventEmmiter.dispatch('MenuOpacity', 0.3)
              }
              onScrollEndDrag={() => EventEmmiter.dispatch('MenuOpacity', 1)}
              ListFooterComponent={() => (
                <ListEndComponent
                  EndReached={EndReached}
                  showIndicator={inputLoading}
                />
              )}
              ListEmptyComponent={() =>
                notFound && (
                  <ListNotFound
                    text="Desenvoledores não encontrados"
                    argument={search}
                  />
                )
              }
            />
          </ListItemsContainer>
        </ListContainer>
      </Container>
    </AppContainer>
  );
}

export default Home;

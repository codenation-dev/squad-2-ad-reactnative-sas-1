import React, {useRef, useState, useCallback, useMemo, useEffect} from 'react';

import {
  FlatList,
  Alert,
  Keyboard,
  Animated,
  Easing,
  Dimensions,
  PermissionsAndroid,
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
  Alert.alert('Ocorreu um erro.', `erro:${error}`);
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

  // f
  const [geoPermission, setGeoPermission] = useState(false);

  const devListRef = useRef();

  const handleFindDev = useCallback(async () => {
    if (!locationSearch) return;
    devListRef.current.scrollToOffset({animated: true, offset: 0});
    Keyboard.dismiss();
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
      displayErros('Erro ns requisição');
      console.log(e);
      console.log(e.response.data);
    }
  }, [locationSearch]);

  useEffect(() => {
    const setPermission = async () => {
      console.log(
        'ACESSO AO FINE LOCATION -> ',
        await PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        )
      );
      const permission = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );

      if (permission === PermissionsAndroid.RESULTS.GRANTED) {
        setGeoPermission(true);
      }
    };

    setPermission();
  }, []);

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
    } catch (e) {
      console.log(e);
      console.log(e.response);
      console.log(e.response.data);
    }
  }

  const getPosition = useCallback(() => {
    setInputLoading(true);
    setLocationSearch('');
    if (geoPermission) {
      Geolocation.getCurrentPosition(
        ({coords}) => {
          console.log(coords);
          getLocation(coords.latitude, coords.longitude);
        },
        (error) => {
          setInputLoading(false);
          console.log(error);
        },
        {enableHighAccuracy: false, timeout: 5000}
      );
    } else {
      // Geolocation.requestAuthorization();
    }
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
      duration: 1000,
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
              renderItem={({item}) => (
                <DevListItem
                  profile={item}
                  onPress={() =>
                    navigation.navigate('DetailDev', {
                      profile: item,
                    })
                  }
                />
              )}
              onEndReachedThreshold={0.1}
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

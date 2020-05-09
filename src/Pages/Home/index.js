import React, {forwardRef} from 'react';

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
  Alert.alert('Ocorreu um erro.', `erro:${error}`);
}

function Home(props, ref) {
  const [paginationDetails, setPaginationDetails] = React.useState({
    ...INITIAL_PAGINATION,
  });
  const [animationLeft] = React.useState(
    new Animated.Value(-Dimensions.get('window').width)
  );

  const [devList, setDevList] = React.useState([]);

  const [inputLoading, setInputLoading] = React.useState(true);

  const [locationSearch, setLocationSearch] = React.useState('');

  const [search, setSearch] = React.useState('');

  async function handleFindDev() {
    if (!locationSearch) return;
    Keyboard.dismiss();
    try {
      setInputLoading(true);
      const response = await api.get(
        `search/users?q=location:${locationSearch}`
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
      displayErros('erro na api do github');
      console.log(e);
      console.log(e.response.data);
    }
  }

  async function handleOnEachList() {
    console.log('chamou');
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
      displayErros('erro na api do github');
      console.log(e.response.data);
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

  function getPosition() {
    setInputLoading(true);
    setLocationSearch('');
    Geolocation.getCurrentPosition(
      ({coords}) => {
        console.log(coords);
        getLocation(coords.latitude, coords.longitude);
      },
      (error) => {
        setInputLoading(false);
        console.log(error);
      },
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
  }

  const notFound = React.useMemo(() => {
    return paginationDetails.count === 0;
  }, [paginationDetails]);

  const EndReached = React.useMemo(() => {
    return Math.ceil(paginationDetails.count / 30) === paginationDetails.page;
  }, [paginationDetails]);

  React.useEffect(() => {
    getPosition();
    Animated.timing(animationLeft, {
      toValue: 0,
      duration: 1000,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  }, [animationLeft]);

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
          emitter={props.emitter}
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
              ref={ref}
              keyExtractor={(item) => String(item.id)}
              data={devList}
              maxToRenderPerBatch={10}
              renderItem={({item}) => (
                <DevListItem
                  profile={item}
                  onPress={() =>
                    props.navigation.navigate('DetailDev', {
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

export default forwardRef(Home);

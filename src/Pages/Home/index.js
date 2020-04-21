import React, {forwardRef} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {FlatList, View, Alert} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
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

import {mapsApi, api} from '../../Services/Api';

import Devs from '../../Components/DevListItem/devs.json';

function Home(props, ref) {
  const [paginationDetails, setPaginationDetails] = React.useState({});
  const [devList, setDevList] = React.useState([]);
  const [userData, setUserData] = React.useState([]);

  const [loading, setLoading] = React.useState(true);

  const [location, setLocation] = React.useState({});

  const [locationSearch, setLocationSearch] = React.useState('');

  const localeSearchable = React.useMemo(() => {
    if (location.address) {
      let [s1, s2] = location.address.state.split(' ');
      if (!s2) [, s2] = s1.split('');
      [s1, s2] = [s1.split('')[0], s2.split('')[0]];
      return `${
        locationSearch || location.address.city
      } - ${s1}${s2}`.toUpperCase();
    }
    return location.locationSearch || '';
  }, [location]);

  async function handleFindDev() {
    try {
      setLoading(true);
      const response = await api.get(
        `search/users?q=location:${locationSearch}`
      );
      setLoading(false);
      setPaginationDetails({
        count: response.data.total_count,
        page: 1,
        perPage: response.data.items.length,
        lastPage: false,
      });
      setDevList(response.data.items);
      setLocation({locationSearch});
    } catch (e) {
      setLoading(false);
      displayErros('erro na api do github');
      console.log(e);
      console.log(e.response.data);
    }
  }

  async function handleOnEachList() {
    try {
      setLoading(true);
      const {count, page, perPage, lastPage} = paginationDetails;
      const response = await api.get(
        `search/users?q=location:${locationSearch}`,
        {
          params: {
            page: page + 1,
          },
        }
      );
      setLoading(false);
      setDevList([...devList, ...response.data.items]);
      setPaginationDetails({
        count: response.data.total_count,
        page: page + 1,
        perPage: response.data.items.length,
        lastPage: false,
      });
    } catch (e) {
      setLoading(false);
      displayErros('erro na api do github');
      console.log(e.response.data);
    }
  }

  async function getLocation(lat, lon) {
    const response = await mapsApi.get('reverse', {
      params: {
        format: 'json',
        lat,
        lon,
        addressdetails: 1,
        'accept-language': 'pt-BR',
        zoom: 18,
      },
    });
    setLoading(false);
    setLocationSearch(response.data.address.city);
    setLocation(response.data);
  }

  function getPosition() {
    setLoading(true);
    setLocationSearch('');
    Geolocation.getCurrentPosition(
      ({coords}) => {
        console.log(coords);
        getLocation(coords.latitude, coords.longitude);
      },
      (error) => {
        setLoading(false);
        console.log(error);
      },
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
  }

  function displayErros(error) {
    Alert.alert('Ocorreu um erro.', `erro:${error}`);
  }

  React.useEffect(() => {
    async function fetchData() {
      const data = await AsyncStorage.getItem('user_profile');
      setUserData(JSON.parse(data));
    }
    fetchData();
    getPosition();
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
          onChangeText={setLocationSearch}
          value={locationSearch}
          emitter={props.emitter}
          loading={loading}
          onLocationClick={getPosition}
          onFindClick={handleFindDev}
        />
        <ListContainer>
          {devList.length > 0 ? (
            <ListTitle>
              DESENVOLVEDORES EM <Bold>{localeSearchable}</Bold>
            </ListTitle>
          ) : (
            <ListTitle>
              Clique em buscar para achar Desenvolvedores de{' '}
              <Bold>{locationSearch}</Bold>
            </ListTitle>
          )}
          <ListItemsContainer>
            <FlatList
              ref={ref}
              ListFooterComponent={() => <View style={{height: 100}} />}
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
              onEndReached={handleOnEachList}
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

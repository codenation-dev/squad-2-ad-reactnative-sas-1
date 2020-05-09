import React from 'react';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import EventEmmiter from '../../events';
import {
  Container,
  NavigatorContainer,
  NavigatorItem,
  NavigatorContent,
  StarredContainer,
  StarredItem,
} from './styles';

export default function MenuNavigator({state, descriptors, navigation}) {
  const navigate = (to) => {
    navigation.navigate(to);
  };

  const isActiveHome = state.index === 0;
  const isActiveQrcode = state.index === 1;
  const isActiveStarred = state.index === 2;

  const [opacityMenu, setOpacityMenu] = React.useState(1);

  React.useEffect(() => {
    EventEmmiter.subscribe('MenuOpacity', (event) => {
      setOpacityMenu(event);
      console.log(EventEmmiter.events);
    });

    return () => null;
  }, []);

  return (
    <>
      {opacityMenu > 0 && (
        <Container style={{opacity: opacityMenu}}>
          <StarredContainer>
            <StarredItem
              active={isActiveStarred}
              onPress={() => navigate('StarRed')}>
              <Icon name="star" size={22} color="#FFD700" />
            </StarredItem>
          </StarredContainer>

          <View style={{backgroundColor: '#fff', borderRadius: 18}}>
            <NavigatorContainer>
              <NavigatorItem
                active={isActiveHome}
                first
                onPress={() => navigate('Home')}>
                <Icon name="view-list" size={22} color="#5A54FF" />
                <NavigatorContent>Pesquisar</NavigatorContent>
              </NavigatorItem>
              <NavigatorItem
                active={isActiveQrcode}
                last
                onPress={() => navigate('QrCode')}>
                <Icon name="qrcode" size={22} color="#5A54FF" />
                <NavigatorContent>QRCODE</NavigatorContent>
              </NavigatorItem>
            </NavigatorContainer>
          </View>
        </Container>
      )}
    </>
  );
}

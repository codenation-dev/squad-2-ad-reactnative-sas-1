import React from 'react';
import {View} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  Container,
  NavigatorContainer,
  NavigatorItem,
  NavigatorContent,
  StarredContainer,
} from './styles';

export default function MenuNavigator({
  state,
  descriptors,
  navigation,
  emitter,
}) {
  const navigate = (to) => {
    navigation.navigate(to);
  };

  const isActiveHome = state.index === 0;
  const isActiveQrcode = state.index === 1;
  const isActiveStarred = state.index === 2;

  const [opacityMenu, setOpacityMenu] = React.useState(1);

  React.useEffect(() => {
    emitter.addListener('startDrag', () => {
      if (opacityMenu === 1) {
        setOpacityMenu(0.3);
        emitter.removeAllListeners();
      }
    });

    emitter.addListener('endDrag', () => {
      if (opacityMenu === 0.3) {
        setOpacityMenu(1);
        emitter.removeAllListeners();
      }
    });
  }, [opacityMenu, emitter]);

  return (
    <Container style={{opacity: opacityMenu}}>
      <StarredContainer
        active={isActiveStarred}
        onPress={() => navigate('StarRed')}>
        <Icon name="star" size={22} color="#FFD700" />
      </StarredContainer>
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
    </Container>
  );
}

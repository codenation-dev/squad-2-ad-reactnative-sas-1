import React from 'react';
import {View, Animated, StyleSheet, Dimensions} from 'react-native';
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

const styles = StyleSheet.create({
  animatedBG: {
    backgroundColor: '#F0F1FF',
    width: 125,
    height: '100%',
    position: 'absolute',
    zIndex: 0,
    left: 0,
    borderRadius: 20,
  },
  animatedStar: {
    backgroundColor: '#5A54FF',
    position: 'absolute',
    width: 52,
    height: 52,
    left: 0,
    zIndex: 0,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
});

export default function MenuNavigator({state, descriptors, navigation}) {
  const navigate = (to) => {
    navigation.navigate(to);
  };

  const isActiveHome = state.index === 0;
  const isActiveQrcode = state.index === 1;
  const isActiveStarred = state.index === 2;
  const [animationLeft] = React.useState(new Animated.Value(0));
  const [animationTop] = React.useState(new Animated.Value(50));
  const [opacityMenu, setOpacityMenu] = React.useState(1);

  React.useEffect(() => {
    EventEmmiter.subscribe('MenuOpacity', (event) => {
      setOpacityMenu(event);
    });

    return () => null;
  }, []);

  React.useEffect(() => {
    console.log(state.index, 'pagina');
    if (state.index === 2) {
      Animated.parallel([
        Animated.timing(animationLeft, {
          toValue: 250,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(animationTop, {
          toValue: 0,
          duration: 600,
          useNativeDriver: true,
        }),
      ]).start();
    }
    if (state.index === 1) {
      Animated.parallel([
        Animated.timing(animationLeft, {
          toValue: 120,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(animationTop, {
          toValue: 50,
          duration: 600,
          useNativeDriver: true,
        }),
      ]).start();
    }
    if (state.index === 0) {
      Animated.parallel([
        Animated.timing(animationLeft, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(animationTop, {
          toValue: 50,
          duration: 600,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [state, animationLeft, animationTop]);

  return (
    <>
      {opacityMenu > 0 && (
        <Container style={{opacity: opacityMenu}}>
          <StarredContainer>
            <StarredItem
              active={isActiveStarred}
              onPress={() => navigate('StarRed')}>
              <Animated.View
                style={[
                  styles.animatedStar,
                  {
                    transform: [{translateY: animationTop}],
                  },
                ]}
              />
              <Icon name="star" size={22} color="#FFD700" />
            </StarredItem>
          </StarredContainer>

          <View style={{backgroundColor: '#fff', borderRadius: 18}}>
            <NavigatorContainer>
              <Animated.View
                style={[
                  styles.animatedBG,
                  {
                    transform: [{translateX: animationLeft}],
                  },
                ]}
              />
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

import React from 'react';
import {Animated} from 'react-native';
import PropTypes from 'prop-types';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-community/async-storage';

import {
  Container,
  Photo,
  Name,
  Username,
  Followers,
  ContainerColumn,
} from './styles';

import strings from '../../DefaultStrings/DevItem';

export default function DevListItem({profile, onPress, favorited}) {
  const [animatedScale] = React.useState(new Animated.Value(1));
  const [heartColor, setHeartColor] = React.useState(
    !favorited ? '#5a54ff' : '#e2264d'
  );

  function animateHeart() {
    Animated.timing(animatedScale, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      if (heartColor === '#5a54ff') {
        setHeartColor('#e2264d');
      } else {
        setHeartColor('#5a54ff');
      }
      Animated.timing(animatedScale, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }).start();
    });
  }

  async function handleFav() {
    animateHeart();

    const favourites =
      JSON.parse(await AsyncStorage.getItem('favourites')) || [];

    if (favourites.length <= 0) {
      favourites.push(profile);
      await AsyncStorage.setItem('favourites', JSON.stringify(favourites));
    } else {
      const isFavouriteAlready = favourites.findIndex(
        (favourite) => favourite.id === profile.id
      );
      if (isFavouriteAlready < 0) {
        favourites.push(profile);
        await AsyncStorage.setItem('favourites', JSON.stringify(favourites));
      } else {
        favourites.splice(isFavouriteAlready, 1);
        await AsyncStorage.setItem('favourites', JSON.stringify(favourites));
      }
    }
  }
  return (
    <Container onPress={onPress}>
      <Photo source={{uri: profile.avatar_url}} />
      <ContainerColumn>
        <Name>{profile.login || strings.defaultUserName}</Name>
        <Username>{profile.login}</Username>
      </ContainerColumn>
      <Followers onPress={handleFav}>
        <Animated.View style={{transform: [{scale: animatedScale}]}}>
          <Icons name="heart" size={20} color={heartColor} />
        </Animated.View>
        {/* <FollowersCount>{profile.followers}</FollowersCount> */}
      </Followers>
    </Container>
  );
}

DevListItem.propTypes = {
  profile: PropTypes.shape({
    login: PropTypes.string,
    name: PropTypes.string,
    avatar_url: PropTypes.string,
    followers: PropTypes.number,
  }),
};

DevListItem.defaultProps = {
  profile: {},
};

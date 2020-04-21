import React from 'react';
import PropTypes from 'prop-types';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  Container,
  Photo,
  Name,
  Username,
  Followers,
  FollowersCount,
  ContainerColumn,
} from './styles';

import strings from '../../DefaultStrings/DevItem';

export default function DevListItem({profile, onPress}) {
  return (
    <Container onPress={onPress}>
      <Photo source={{uri: profile.avatar_url}} />
      <ContainerColumn>
        <Name>{profile.login || strings.defaultUserName}</Name>
        <Username>{profile.login}</Username>
      </ContainerColumn>
      <Followers>
        <Icons name="account-heart" size={20} color="#5a54ff" />
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

import React from 'react';
import PropTypes from 'prop-types';
import {ActivityIndicator} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {header} from '../../Styles/Colors';
import {
  Container,
  HeaderArea,
  HeaderContent,
  Profile,
  ProfileImage,
} from './styles';

import {navigate} from '../../Routes/RootNavigation';

export default function Header({
  children,
  bgColor,
  profile_image,
  onPressImage,
}) {
  const [userData, setUserData] = React.useState({});
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchData() {
      try {
        const data = await AsyncStorage.getItem('user_profile');
        setUserData(JSON.parse(data));
      } catch (e) {
        setLoading(false);
      }
    }
    fetchData();
  });

  React.useEffect(() => {
    if (userData.avatar_url) setLoading(false);
  }, [userData]);

  const finalyAvatar = React.useMemo(() => {
    return userData.avatar_url || profile_image;
  }, [userData]);

  return (
    <Container>
      <HeaderArea bgColor={bgColor}>
        <HeaderContent>{children}</HeaderContent>
        <Profile onPress={() => navigate('QrCode')}>
          {loading ? (
            <ActivityIndicator size="small" />
          ) : (
            <ProfileImage
              source={{
                uri:
                  finalyAvatar ||
                  'https://api.adorable.io/avatars/60/abott@adorable.png',
              }}
            />
          )}
        </Profile>
      </HeaderArea>
    </Container>
  );
}

Header.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  bgColor: PropTypes.string,
};

Header.defaultProps = {
  children: '',
  bgColor: header.backgorund,
};

import React from 'react';
import {ActivityIndicator, Keyboard} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PropTypes from 'prop-types';

import {Container, Input, Button} from './styles';
import {search} from '../../Styles/Colors';

export default function SearchInput({
  loading,
  iconSize,
  color,
  emitter,
  onLocationClick,
  onFindClick,
  ...rest
}) {
  React.useEffect(() => {
    Keyboard.addListener('keyboardDidShow', () => {
      console.log('abriu');
      emitter.emit('hideMenu');
    });

    Keyboard.addListener('keyboardDidHide', () => {
      console.log('fechou');
      emitter.emit('showMenu');
    });

    return () => {
      Keyboard.removeListener('keyboardDidShow');
      Keyboard.removeListener('keyboardDidHide');
    };
  }, [emitter]);

  return (
    <Container>
      <Input {...rest} />

      {loading ? (
        <ActivityIndicator size="small" style={{marginRight: 20}} />
      ) : (
        <Button border onPress={onFindClick}>
          <Icon name="map-search-outline" size={iconSize} color={color} />
        </Button>
      )}

      {!loading && (
        <Button onPress={onLocationClick}>
          <Icon name="map-marker-radius" size={iconSize} color={color} />
        </Button>
      )}
    </Container>
  );
}

SearchInput.propTypes = {
  loading: PropTypes.bool,
  iconSize: PropTypes.number,
  color: PropTypes.string,
};

SearchInput.defaultProps = {
  loading: false,
  iconSize: search.iconSize,
  color: search.iconColor,
};

import React from 'react';
import {ActivityIndicator, Keyboard, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PropTypes from 'prop-types';
import EventEmiiter from '../../events';

import {Container, Input, Button} from './styles';
import {search} from '../../Styles/Colors';

export default function SearchInput({
  loading,
  iconSize,
  color,
  onLocationClick,
  onFindClick,
  onlySearch,
  ...rest
}) {
  React.useEffect(() => {
    Keyboard.addListener('keyboardDidShow', () => {
      EventEmiiter.dispatch('MenuOpacity', 0);
    });

    Keyboard.addListener('keyboardDidHide', () => {
      EventEmiiter.dispatch('MenuOpacity', 1);
    });

    return () => {
      Keyboard.removeListener('keyboardDidShow');
      Keyboard.removeListener('keyboardDidHide');
    };
  }, []);

  return (
    <Container>
      <Input
        {...rest}
        onFocus={() => EventEmiiter.dispatch('MenuOpacity', 0)}
      />

      {loading ? (
        <ActivityIndicator size="small" style={{marginRight: 20}} />
      ) : (
        !onlySearch && (
          <Button border onPress={onFindClick}>
            <Icon name="account-search" size={iconSize} color={color} />
          </Button>
        )
      )}

      {!loading && (
        <Button onPress={onLocationClick}>
          <Icon
            name={onlySearch ? 'account-search' : 'map-marker-radius'}
            size={iconSize}
            color={color}
          />
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

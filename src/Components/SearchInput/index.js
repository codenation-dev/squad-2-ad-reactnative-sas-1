import React from 'react';
import {ActivityIndicator} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PropTypes from 'prop-types';
import {Container, Input, Button} from './styles';
import {search} from '../../Styles/Colors';

export default function SearchInput({loading, iconSize, color, ...rest}) {
  return (
    <Container>
      <Input {...rest} />

      {loading ? (
        <ActivityIndicator size="small" />
      ) : (
        <Button border>
          <Icon name="map-search-outline" size={iconSize} color={color} />
        </Button>
      )}

      <Button>
        <Icon name="map-marker-radius" size={iconSize} color={color} />
      </Button>
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

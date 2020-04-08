import React from 'react';
import PropTypes from 'prop-types';
import {ButtonComponent, Text} from './styles';

export default function Button({title, onPress}) {
  return (
    <ButtonComponent onPress={onPress}>
      <Text>{title}</Text>
    </ButtonComponent>
  );
}

Button.propTypes = {
  title: PropTypes.string,
  onPress: PropTypes.func,
};

Button.defaultProps = {
  title: '',
  onPress: () => {},
};

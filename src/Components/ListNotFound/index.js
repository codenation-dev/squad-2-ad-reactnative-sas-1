import React from 'react';
import {View} from 'react-native';

import {Container, Text} from './styles';

export default function ListNotFound({text, argument}) {
  return (
    <Container>
      <Text>
        {text} - {argument}
      </Text>
    </Container>
  );
}

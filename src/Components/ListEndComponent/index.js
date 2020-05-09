import React from 'react';
import {View} from 'react-native';

import {Container, Text, Spacer, Indicator} from './styles';

export default function ListEndComponent({EndReached, showIndicator}) {
  const Message = () =>
    EndReached ? (
      <Container>
        <Text>Fim</Text>
      </Container>
    ) : (
      <Spacer>{showIndicator && <Indicator />}</Spacer>
    );
  return <Message />;
}

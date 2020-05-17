import React from 'react';
import {Animated} from 'react-native';

import Text from './styles';

const HeaderTitle = ({children}) => {
  const animatedOpacity = React.useRef(new Animated.Value(0));

  React.useEffect(() => {
    Animated.timing(animatedOpacity.current, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);
  return (
    <Animated.View style={{opacity: animatedOpacity.current}}>
      <Text>{children}</Text>
    </Animated.View>
  );
};

export default HeaderTitle;

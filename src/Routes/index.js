import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import EventEmitter from 'events';
import MenuContext from './Route';
import Home from '../Pages/Home';

import QrCode from '../Pages/QrCode';
import StarRed from '../Pages/StarRed';
import DetailDev from '../Pages/DetailDev';
import Menu from '../Components/MenuNavigator';

const Tab = createBottomTabNavigator();

const emitter = new EventEmitter();

export default function Routes() {
  const homeScreen = (props) => <Home {...props} emitter={emitter} />;

  return (
    <NavigationContainer>
      <Tab.Navigator tabBar={(props) => <Menu {...props} emitter={emitter} />}>
        <Tab.Screen name="Home" component={homeScreen} />
        <Tab.Screen name="QrCode" component={QrCode} />
        <Tab.Screen name="StarRed" component={StarRed} />
        <Tab.Screen
          name="DetailDev"
          component={DetailDev}
          options={{tabBarVisible: false}}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

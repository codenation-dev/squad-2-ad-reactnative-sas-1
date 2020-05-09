import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {navigationRef} from './RootNavigation';
import MenuContext from './Route';
import Home from '../Pages/Home';

import QrCode from '../Pages/QrCode';
import StarRed from '../Pages/StarRed';
import DetailDev from '../Pages/DetailDev';
import Menu from '../Components/MenuNavigator';

const Tab = createBottomTabNavigator();

export default function Routes() {
  return (
    <NavigationContainer ref={navigationRef}>
      <Tab.Navigator tabBar={(props) => <Menu {...props} />}>
        <Tab.Screen name="Home" component={Home} />
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

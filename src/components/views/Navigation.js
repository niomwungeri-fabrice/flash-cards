import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { Platform } from 'react-native';
import AddDeck from './AddDeck';
import Decks from './Decks';

const tabBarOptions = {
  style: {
    height: 80,
    shadowColor: 'rgba(0, 0, 0, 0.24)',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 6,
    shadowOpacity: 1
  }
};
const screenOptions = ({ route }) => ({
  tabBarIcon: ({ color, size }) =>
    route.name === 'Add Deck' ? (
      <FontAwesome name="plus-square" size={size} color={color} />
    ) : (
      <Ionicons name="ios-list-box" color={color} size={size} />
    )
});
const Tab =
  Platform.OS === 'ios'
    ? createBottomTabNavigator()
    : createMaterialTopTabNavigator();
export const Navigation = () => {
  return (
    <Tab.Navigator
      initialRouteName="Decks"
      shifting={true}
      sceneAnimationEnabled={false}
      tabBarOptions={tabBarOptions}
      screenOptions={screenOptions}
    >
      <Tab.Screen name="Decks" component={Decks} />
      <Tab.Screen name="Add Deck" component={AddDeck} />
    </Tab.Navigator>
  );
};

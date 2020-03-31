import React, { Component } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { Platform } from 'react-native';
import AddDeck from './AddDeck';
import { connect } from 'react-redux';
import HistoryDeck from './HistoryDeck';

const tabBarOptions = {
  showIcon: true,
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
      <FontAwesome name="plus-square" size={28} color={color} />
    ) : (
      <Ionicons name="ios-list-box" size={28} color={color} />
    )
});
const Tab =
  Platform.OS === 'ios'
    ? createBottomTabNavigator()
    : createMaterialTopTabNavigator();
class Navigation extends Component {
  render() {
    return (
      <Tab.Navigator
        initialRouteName="Decks"
        shifting={true}
        sceneAnimationEnabled={false}
        tabBarOptions={tabBarOptions}
        screenOptions={screenOptions}
      >
        <Tab.Screen name="Decks" component={HistoryDeck} />
        <Tab.Screen name="Add Deck" component={AddDeck} />
      </Tab.Navigator>
    );
  }
}

export default connect()(Navigation);

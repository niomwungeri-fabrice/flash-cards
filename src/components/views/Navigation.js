import React, { Component } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { Platform } from 'react-native';
import AddDeck from './AddDeck';
import { connect } from 'react-redux';
import { getDecks } from '../../redux/actions';
import { _getDecks } from '../../api';
import HistoryDeck from './HistoryDeck';
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
class Navigation extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    _getDecks().then(results => {
      dispatch(getDecks(results));
    });
  }
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

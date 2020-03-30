import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Decks from './Decks';
import Deck from './Deck';
import Quiz from './Quiz';
import AddCard from './AddCard';
import { _getDecks } from '../../api';
import { connect } from 'react-redux';

const Stack = createStackNavigator();

const HistoryDeck = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Decks" component={Decks} />
      <Stack.Screen
        name="Deck"
        component={Deck}
        options={({ route }) => {
          const { deckKey } = route.params;
          return {
            title: deckKey
          };
        }}
      />
      <Stack.Screen name="AddCard" component={AddCard} />
      <Stack.Screen name="Quiz" component={Quiz} />
    </Stack.Navigator>
  );
};

export default connect()(HistoryDeck);

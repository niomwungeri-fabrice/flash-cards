import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Decks from './Decks';
import Deck from './Deck';

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
    </Stack.Navigator>
  );
};

export default HistoryDeck;

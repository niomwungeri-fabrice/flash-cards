export const GET_DATA = 'GET_DATA';
export const ADD_DECK = 'ADD_DECK';

export const getDecks = decks => {
  return {
    type: GET_DATA,
    decks
  };
};

export const addDeck = title => {
  return {
    type: ADD_DECK,
    title
  };
};

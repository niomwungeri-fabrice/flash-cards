export const GET_DATA = 'GET_DATA';
export const ADD_DECK = 'ADD_DECK';
export const ADD_CARD = 'ADD_CARD';
export const DELETE_DECK = 'DELETE_DECK';

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

export const deleteDeck = deck => {
  return {
    type: DELETE_DECK,
    deck
  };
};

export const addCard = (question, answer, deck) => {
  return {
    type: ADD_CARD,
    payload: {
      question,
      answer,
      deck
    }
  };
};

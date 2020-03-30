export const GET_DATA = 'GET_DATA';
export const ADD_DECK = 'ADD_DECK';
export const ADD_CARD = 'ADD_CARD';
export const DELETE_DECK = 'DELETE_DECK';
export const ANSWER = 'ANSWER';

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

export const addCard = (qid, question, answer, deck) => {
  return {
    type: ADD_CARD,
    payload: {
      qid,
      question,
      answer,
      deck
    }
  };
};

export const answerQuestion = (qid, title, isAnswered, isCorrect) => {
  return {
    type: ANSWER,
    payload: {
      qid,
      title,
      isAnswered,
      isCorrect
    }
  };
};

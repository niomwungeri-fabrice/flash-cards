import { GET_DATA, ADD_DECK, ADD_CARD, DELETE_DECK } from '../actions';

const decks = (state = {}, action) => {
  switch (action.type) {
    case GET_DATA:
      return action.decks;
    case ADD_DECK:
      return {
        ...state,
        [action.title]: {
          title: action.title
        }
      };
    case ADD_CARD:
      return {
        ...state,
        [action.payload.deck]: {
          ...state[action.payload.deck],
          questions: state[action.payload.deck].questions.concat([
            { question: action.payload.question, answer: action.payload.answer }
          ])
        }
      };
    case DELETE_DECK:
      const removeDeck = (state, deck) => {
        let { [deck]: omit, ...res } = state;
        return res;
      };
      return removeDeck(state, action.deck);
    default:
      return state;
  }
};

export default decks;

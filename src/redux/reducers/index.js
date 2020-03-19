import { GET_DATA, ADD_DECK } from '../actions';

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

    default:
      return state;
  }
};

export default decks;

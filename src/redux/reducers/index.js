import { GET_DATA } from '../actions';

const decks = (state = {}, action) => {
  switch (action.type) {
    case GET_DATA:
      return {
        ...state,
        ...action.decks
      };
    default:
      return state;
  }
};

export default decks;

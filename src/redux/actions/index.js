import { _getDecks } from '../../api';
export const GET_DATA = 'GET_DATA';

const receiveData = decks => {
  return {
    type: GET_DATA,
    decks
  };
};

export const getDecks = () => dispatch => {
  return _getDecks().then(decks => {
    dispatch(receiveData(decks));
  });
};

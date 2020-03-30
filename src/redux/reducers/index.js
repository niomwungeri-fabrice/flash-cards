import { GET_DATA, ADD_DECK, ADD_CARD, DELETE_DECK, ANSWER } from '../actions';
import { generateUID } from '../../api';
import update from 'immutability-helper';

const decks = (state = {}, action) => {
  switch (action.type) {
    case GET_DATA:
      return action.decks;
    case ADD_DECK:
      return {
        ...state,
        [action.title]: {
          title: action.title,
          questions: []
        }
      };
    case ADD_CARD:
      return {
        ...state,
        [action.payload.deck.title]: {
          ...state[action.payload.deck.title],
          questions: state[action.payload.deck.title].questions.concat([
            {
              qid: action.payload.qid,
              question: action.payload.question,
              answer: action.payload.answer,
              isCorrect: false,
              isAnswered: false
            }
          ])
        }
      };
    case ANSWER:
      const {
        payload: { qid, title, isAnswered, isCorrect }
      } = action;
      return {
        ...state,
        [title]: {
          ...state[title],
          questions: state[title].questions.map(question =>
            question.qid === qid
              ? {
                  ...question,
                  isCorrect: isCorrect,
                  isAnswered: isAnswered
                }
              : question
          )
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

import { AsyncStorage } from 'react-native';
export const DECKS_STORAGE_KEY = 'FlashCards:decks';

export const _addDeck = async deck => {
  return await AsyncStorage.mergeItem(
    DECKS_STORAGE_KEY,
    JSON.stringify({
      [deck]: {
        title: deck,
        questions: []
      }
    })
  );
};

export const _getDecks = async () => {
  try {
    const results = await AsyncStorage.getItem(DECKS_STORAGE_KEY);
    if (results !== null) {
      return JSON.parse(results);
    }
  } catch (error) {
    return 'Server error, Please try again';
  }
};

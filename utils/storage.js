// @flow

import { AsyncStorage } from 'react-native';
import type {
  Card, DeckTitle, Deck, Decks,
} from '../types';
import StorageConstants from '../constants/Storage';

const createDecks = (title: string, questions: Array<Card> = []): Decks => ({
  [title]: {
    title,
    questions,
  },
});

export const getDecks = async (): Promise<Decks> => {
  let resultJson = await AsyncStorage.getItem(StorageConstants.key);
  if (!resultJson) {
    const initialDecks = {
      // React: {
      //   title: 'React',
      //   questions: [
      //     {
      //       question: 'What is React?',
      //       answer: 'A library for managing user interfaces',
      //     },
      //     {
      //       question: 'Where do you make Ajax requests in React?',
      //       answer: 'The componentDidMount lifecycle event',
      //     },
      //   ],
      // },
      // JavaScript: {
      //   title: 'JavaScript',
      //   questions: [
      //     {
      //       question: 'What is a closure?',
      //       answer:
      //         'The combination of a function and the lexical environment within which that function was declared.',
      //     },
      //   ],
      // },
    };
    const initialDecksJson = JSON.stringify(initialDecks);
    await AsyncStorage.setItem(StorageConstants.key, initialDecksJson);
    resultJson = await AsyncStorage.getItem(StorageConstants.key);
  }
  const result = JSON.parse(resultJson);
  return result;
};

export const getDeck = async (id: DeckTitle): Promise<?Deck> => {
  const decks = await getDecks();
  return decks[id] || null;
};

export const saveDeckTitle = async (title: DeckTitle): Promise<Decks> => {
  if (!title) throw new Error('invalid title');

  const firstSave = !(await AsyncStorage.getItem(StorageConstants.key));

  const newDecks = createDecks(title);
  const newDecksJson = JSON.stringify(newDecks);

  if (firstSave) await AsyncStorage.setItem(StorageConstants.key, newDecksJson);
  else await AsyncStorage.mergeItem(StorageConstants.key, newDecksJson);

  const resultDecksJson = await AsyncStorage.getItem(StorageConstants.key);
  const resultDecks = JSON.parse(resultDecksJson);
  return resultDecks;
};

export const resetDecks = async (): Promise<boolean> => {
  try {
    await AsyncStorage.removeItem(StorageConstants.key);
    return true;
  } catch (e) {
    return false;
  }
};

export const addCardToDeck = async (title: DeckTitle, card: Card): Promise<boolean> => {
  try {
    let deck = await getDeck(title);
    if (!deck) {
      await saveDeckTitle(title);
      deck = await getDeck(title);
      if (!deck) return false;
    }

    const updatedDeckJson = JSON.stringify({
      [title]: {
        title,
        questions: [...deck.questions, card],
      },
    });
    await AsyncStorage.mergeItem(StorageConstants.key, updatedDeckJson);
    return true;
  } catch (e) {
    return false;
  }
};

export default {
  getDecks,
  getDeck,
  saveDeckTitle,
  addCardToDeck,
};

// @flow

import AsyncStorage from '@react-native-community/async-storage';
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
  const resultJson = await AsyncStorage.getItem(StorageConstants.key);
  if (!resultJson) return {};
  const result = JSON.parse(resultJson);
  return result;
};

export const getDeck = (id: DeckTitle): Deck => {};

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

export const addCardToDeck = (title: DeckTitle, card: Card): boolean => {};

export default {
  getDecks,
  getDeck,
  saveDeckTitle,
  addCardToDeck,
};

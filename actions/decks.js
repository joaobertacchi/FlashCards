/* eslint-disable no-console */
// @flow

import {
  getDecks, saveDeckTitle, addCardToDeck, resetDecks,
} from '../utils/storage';
import type {
  Decks, Deck, DeckTitle, Card,
} from '../types';

export const RECEIVE_DECKS = 'RECEIVE_DECKS';
export const RECEIVE_DECK = 'RECEIVE_DECK';
export const ADD_DECK = 'ADD_DECK';
export const ADD_CARD = 'ADD_CARD';

type ReceiveDecksActionType = {
  decks: Decks,
  type: 'RECEIVE_DECKS',
};

type ReceiveDeckActionType = {
  deck: Deck,
  type: 'RECEIVE_DECK',
};

type AddDeckActionType = {
  deck: Deck,
  type: 'ADD_DECK',
};

type AddCardActionType = {
  deckTitle: DeckTitle,
  card: Card,
  type: 'ADD_CARD',
};

export type DeckActionType =
  | ReceiveDecksActionType
  | ReceiveDeckActionType
  | AddDeckActionType
  | AddCardActionType;

export function receiveDecks(decks: Decks): ReceiveDecksActionType {
  return {
    type: RECEIVE_DECKS,
    decks,
  };
}

export function receiveDeck(deck: Deck): ReceiveDeckActionType {
  return {
    type: RECEIVE_DECK,
    deck,
  };
}

export function addDeck(deck: Deck): AddDeckActionType {
  return {
    type: ADD_DECK,
    deck,
  };
}

export function addCard(deckTitle: DeckTitle, card: Card): AddCardActionType {
  return {
    type: ADD_CARD,
    deckTitle,
    card,
  };
}

export function handleInitialData(): Function {
  return (dispatch: Function): Promise<void> => getDecks()
    .then((decks: Decks) => {
      dispatch(receiveDecks(decks));
    })
    .catch(error => console.error(error));
}

export function handleCreateDeck(deckTitle: DeckTitle) {
  return (dispatch: Function): Promise<void> => saveDeckTitle(deckTitle)
    .then((decks: Decks) => dispatch(addDeck(decks[deckTitle])))
    .catch(error => console.error(error));
}

export function handleAddCardToDeck(card: Card, deckTitle: DeckTitle) {
  return (dispatch: Function): Promise<void> => addCardToDeck(deckTitle, card)
    .then((success: boolean) => (success
      ? dispatch(addCard(deckTitle, card))
      : console.error(`Could not save card ${card.toString()} to ${deckTitle} deck.`)))
    .catch(error => console.error(error));
}

export function handleResetDecks() {
  return (dispatch: Function): Promise<void> => resetDecks()
    .then((success: boolean) => (success
      ? handleInitialData()(dispatch)
      : console.error('Could not reset decks.')))
    .catch(error => console.error(error));
}

export default { handleInitialData };

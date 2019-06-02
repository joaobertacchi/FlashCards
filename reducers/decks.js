// @flow

import {
  type DeckActionType,
  RECEIVE_DECKS,
  RECEIVE_DECK,
  ADD_DECK,
  ADD_CARD,
} from '../actions/decks';

import type { Decks } from '../types';

const decks = (state: Decks = {}, action: DeckActionType): Decks => {
  switch (action.type) {
    case RECEIVE_DECKS: {
      return {
        ...action.decks,
      };
    }
    case RECEIVE_DECK: {
      const { deck } = action;
      return {
        ...state,
        [deck.title]: { ...deck },
      };
    }
    case ADD_DECK: {
      const { deck } = action;
      return {
        ...state,
        [deck.title]: { ...deck },
      };
    }
    case ADD_CARD: {
      const { deckTitle, card } = action;
      return {
        ...state,
        [deckTitle]: {
          ...state[deckTitle],
          questions: [
            ...state[deckTitle].questions,
            card,
          ],
        },
      };
    }
    default:
      return state;
  }
};

export default decks;

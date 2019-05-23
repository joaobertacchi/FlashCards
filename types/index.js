// @flow

export type Card = {|
  question: string,
  answer: string,
|};

export type DeckTitle = string;

export type Deck = {|
  title: DeckTitle,
  questions: Array<Card>,
|};

export type Decks = {
  [DeckTitle]: Deck,
};

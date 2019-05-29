// @flow

export type Card = {|
  +question: string,
  +answer: string,
|};

export type Questions = $ReadOnlyArray<Card>;

export type DeckTitle = string;

export type Deck = {|
  +title: DeckTitle,
  questions: Questions,
|};

export type Decks = {
  +[DeckTitle]: Deck,
};

export type ScoreType = {
  +[number]: boolean,
};

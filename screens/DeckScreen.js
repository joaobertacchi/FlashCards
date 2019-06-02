// @flow

import React from 'react';
import { ScrollView, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import type { Deck } from '../types';

type StateProps = {
  deck: Deck,
};

type OwnProps = {
  navigation: Object,
};

type Props = StateProps & OwnProps;

const DeckScreen = ({ navigation, deck }: Props) => (
  <ScrollView>
    <Text>{deck.title}</Text>
    <Text>
      {deck.questions.length}
      {' cards'}
    </Text>
    <TouchableOpacity onPress={() => navigation.navigate('AddCard', { deckTitle: deck.title })}>
      <Text>Add card</Text>
    </TouchableOpacity>
    {!!deck.questions.length && (
      <TouchableOpacity onPress={() => navigation.navigate('Quiz', { deckTitle: deck.title })}>
        <Text>Start quiz</Text>
      </TouchableOpacity>
    )}
  </ScrollView>
);

DeckScreen.navigationOptions = {
  title: 'Deck',
};

const mapStateToProps = ({ decks }, { navigation }: OwnProps) => {
  const {
    state: {
      params: { deckTitle },
    },
  } = navigation;
  return {
    deck: decks[deckTitle],
  };
};

export default connect(mapStateToProps)(DeckScreen);

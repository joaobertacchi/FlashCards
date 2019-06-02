// @flow

import React, { Fragment } from 'react';
import { ScrollView, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import type { Deck } from '../types';

type StateProps = {
  deck: Deck,
  loading: boolean,
};

type OwnProps = {
  navigation: Object,
};

type Props = StateProps & OwnProps;

const DeckScreen = ({ navigation, deck, loading }: Props) => (
  <ScrollView>
    {loading ? (
      <Text>Loading...</Text>
    ) : (
      <Fragment>
        <Text>{deck.title}</Text>
        <Text>
          {deck.questions.length}
          {' cards'}
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('AddCard', { deckTitle: deck.title })}>
          <Text>Create New Question</Text>
        </TouchableOpacity>
        {!!deck.questions.length && (
          <TouchableOpacity onPress={() => navigation.navigate('Quiz', { deckTitle: deck.title })}>
            <Text>Start a Quiz</Text>
          </TouchableOpacity>
        )}
      </Fragment>
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
    loading: !decks[deckTitle],
  };
};

export default connect(mapStateToProps)(DeckScreen);

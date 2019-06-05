// @flow

import React, { Fragment } from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import type { Deck } from '../types';
import Button from '../components/Button';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 25,
  },
});

type StateProps = {
  deck: Deck,
  loading: boolean,
};

type OwnProps = {
  navigation: Object,
};

type Props = StateProps & OwnProps;

const DeckScreen = ({ navigation, deck, loading }: Props) => (
  <ScrollView style={styles.container}>
    {loading ? (
      <Text>Loading...</Text>
    ) : (
      <Fragment>
        <Text>{deck.title}</Text>
        <Text>
          {deck.questions.length}
          {' cards'}
        </Text>
        <Button
          onPress={() => navigation.navigate('AddCard', { deckTitle: deck.title })}
          text="Create New Question"
          type="primary"
        />
        {!!deck.questions.length && (
          <Button
            onPress={() => navigation.navigate('Quiz', { deckTitle: deck.title })}
            text="Start a Quiz"
            type="success"
          />
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

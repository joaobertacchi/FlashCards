// @flow

import React, { Fragment } from 'react';
import {
  ScrollView, Text, StyleSheet, View,
} from 'react-native';
import { connect } from 'react-redux';

import type { Deck } from '../types';
import Button from '../components/Button';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  decktitleText: {
    fontSize: 32,
  },
  deckcardText: {
    fontSize: 24,
    color: 'grey',
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  <ScrollView contentContainerStyle={styles.container}>
    {loading ? (
      <Text style={styles.decktitleText}>Loading...</Text>
    ) : (
      <Fragment>
        <View style={styles.titleContainer}>
          <Text style={styles.decktitleText}>{deck.title}</Text>
          <Text style={styles.deckcardText}>
            {`${deck.questions.length} card${deck.questions.length > 1 ? 's' : ''}`}
          </Text>
        </View>
        <View style={styles.buttonsContainer}>
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
        </View>
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

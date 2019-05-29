// @flow

import React from 'react';
import {
  FlatList, StyleSheet, Text, TouchableOpacity,
} from 'react-native';
import type { Deck, Card, Decks } from '../types';
import { getValues } from '../utils';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});

type State = {
  decks: Decks,
};

type Props = {
  +navigation: Object,
};

const initialDecks = {
  React: {
    title: 'React',
    questions: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces',
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event',
      },
    ],
  },
  JavaScript: {
    title: 'JavaScript',
    questions: [
      {
        question: 'What is a closure?',
        answer:
          'The combination of a function and the lexical environment within which that function was declared.',
      },
    ],
  },
};

class DecksScreen extends React.Component<Props, State> {
  static navigationOptions = {
    title: 'All decks',
  };

  state = {
    decks: initialDecks,
  };

  handleAddCard = (title: string) => (card: Card) => () => this.setState((prevState) => {
    const newState = {
      ...prevState,
      decks: {
        ...prevState.decks,
        [title]: {
          ...prevState.decks[title],
          questions: [...prevState.decks[title].questions, card],
        },
      },
    };
    return newState;
  });

  renderItem = ({ item: deck }: { +item: Deck }) => {
    const deckSize = deck.questions.length;
    const { navigation } = this.props;
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('Deck', { deck, onAddCard: this.handleAddCard(deck.title) })
        }
      >
        <Text>{`${deck.title} - ${deckSize} card${deckSize > 1 ? 's' : ''}`}</Text>
      </TouchableOpacity>
    );
  };

  getKey = (deck: Deck) => deck.title;

  render() {
    const { decks } = this.state;
    const arrayDecks = getValues<Decks>(decks);
    return (
      <FlatList
        style={styles.container}
        data={arrayDecks}
        renderItem={this.renderItem}
        keyExtractor={this.getKey}
      />
    );
  }
}

export default DecksScreen;

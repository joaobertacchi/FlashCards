// @flow

import React from 'react';
import { FlatList, StyleSheet, Text } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});

const decks = {
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

export default class DecksScreen extends React.Component<*, *> {
  static navigationOptions = {
    title: 'All decks',
  };

  renderItem = ({ item }) => {
    const deckSize = item.questions.length;
    return (
      <Text>{`${item.title} - ${deckSize} card${deckSize > 1 ? 's' : ''}`}</Text>
    );
  };

  getKey = item => item.title;

  render() {
    return (
      <FlatList
        style={styles.container}
        data={Object.values(decks)}
        renderItem={this.renderItem}
        keyExtractor={this.getKey}
      />
    );
  }
}

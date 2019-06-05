// @flow

import React from 'react';
import {
  FlatList, StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import { connect } from 'react-redux';
import type { Deck, Decks } from '../types';

// Workaround to fix flow problem
import { getValues } from '../utils';

import { handleInitialData } from '../actions/decks';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  separator: {
    height: 1,
    backgroundColor: '#CED0CE',
  },
});

type DispatchProps = {
  initialize: Function,
};

type StateProps = {
  decks: Decks,
  loading: boolean,
};

type Props = DispatchProps &
  StateProps & {
    +navigation: Object,
  };

class DecksScreen extends React.Component<Props> {
  static navigationOptions = {
    title: 'All decks',
  };

  componentDidMount() {
    const { initialize } = this.props;
    initialize();
  }

  renderItem = ({ item: deck }: { +item: Deck }) => {
    const deckSize = deck.questions.length;
    const { navigation } = this.props;
    return (
      <TouchableOpacity onPress={() => navigation.navigate('Deck', { deckTitle: deck.title })}>
        <Text>{`${deck.title} - ${deckSize} card${deckSize > 1 ? 's' : ''}`}</Text>
      </TouchableOpacity>
    );
  };

  renderSeparator = () => (<View style={styles.separator} />)

  getKey = (deck: Deck) => deck.title;

  render() {
    const { decks, loading } = this.props;
    const arrayDecks = getValues<Decks>(decks);
    return loading ? (
      <Text>Loading decks...</Text>
    ) : (
      <FlatList
        style={styles.container}
        data={arrayDecks}
        renderItem={this.renderItem}
        keyExtractor={this.getKey}
        ItemSeparatorComponent={this.renderSeparator}
      />
    );
  }
}

const mapStateToProps = ({ decks }) => ({
  decks,
  loading: !decks,
});

const mapDispatchToProps = dispatch => ({
  initialize: () => dispatch(handleInitialData()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DecksScreen);

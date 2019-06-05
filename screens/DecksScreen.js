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
  deckContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyDecksContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  emptyDecksMessage: {
    fontSize: 24,
    textAlign: 'center',
  },
  separator: {
    height: 1,
    backgroundColor: '#CED0CE',
  },
  itemComponent: {
    flex: 1,
    height: 80,
    justifyContent: 'center',
  },
  decktitleText: {
    fontSize: 24,
  },
  deckcardText: {
    fontSize: 18,
    color: 'grey',
  },
});

type DispatchProps = {
  initialize: Function,
};

type StateProps = {
  decks: Decks,
  loading: boolean,
  isEmpty: boolean,
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
      <View style={styles.itemComponent}>
        <TouchableOpacity
          style={styles.deckContainer}
          onPress={() => navigation.navigate('Deck', { deckTitle: deck.title })}
        >
          <Text style={styles.decktitleText}>{deck.title}</Text>
          <Text style={styles.deckcardText}>{`${deckSize} card${deckSize > 1 ? 's' : ''}`}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  renderEmptyDecks = () => (
    <View style={styles.emptyDecksContainer}>
      <Text style={styles.emptyDecksMessage}>You have no decks. Create one for starting...</Text>
    </View>
  );

  renderSeparator = () => <View style={styles.separator} />;

  getKey = (deck: Deck) => deck.title;

  render() {
    const { decks, loading, isEmpty } = this.props;
    const arrayDecks = getValues<Decks>(decks);

    if (loading) return <Text>Loading decks...</Text>;

    if (isEmpty) return this.renderEmptyDecks();

    return (
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
  isEmpty: Object.keys(decks).length === 0,
});

const mapDispatchToProps = dispatch => ({
  initialize: () => dispatch(handleInitialData()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DecksScreen);

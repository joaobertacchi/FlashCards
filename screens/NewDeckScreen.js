// @flow

import React from 'react';
import {
  ScrollView, StyleSheet, Text, TextInput, KeyboardAvoidingView,
} from 'react-native';
import { connect } from 'react-redux';

import type { DeckTitle } from '../types';
import { isValidString } from '../utils/helpers';
import { handleCreateDeck } from '../actions/decks';
import Button from '../components/Button';
import Colors from '../constants/Colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  questionText: {
    padding: 5,
    fontWeight: 'bold',
    fontSize: 32,
    textAlign: 'center',
  },
  titleInput: {
    minWidth: 220,
    borderBottomWidth: 1,
    borderBottomColor: Colors.tintColor,
    fontSize: 28,
    textAlign: 'center',
  },
});

type State = {
  deckTitle: DeckTitle,
};

type DispatchProps = {
  addDeck: Function,
};

type OwnProps = {
  navigation: Object,
};

type Props = DispatchProps & OwnProps;

class NewDeckScreen extends React.Component<Props, State> {
  static navigationOptions = {
    title: 'New deck',
  };

  state = {
    deckTitle: '',
  };

  handleChangeTitle = (deckTitle: DeckTitle) => {
    this.setState({ deckTitle });
  };

  handleAddDeck = () => {
    const { deckTitle } = this.state;
    const { addDeck, navigation } = this.props;
    addDeck(deckTitle);
    this.setState({ deckTitle: '' });
    navigation.navigate('Deck', { deckTitle });
  };

  render() {
    const { deckTitle } = this.state;
    const disabledButton = !isValidString(deckTitle);
    return (
      <KeyboardAvoidingView style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <Text style={styles.questionText}>What is the title of your new deck?</Text>
          <TextInput
            style={styles.titleInput}
            onChangeText={this.handleChangeTitle}
            value={deckTitle}
            placeholder="Deck Title"
          />
          <Button
            disabled={disabledButton}
            onPress={this.handleAddDeck}
            text="Create Deck"
            type={disabledButton ? 'grey' : 'primary'}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const mapDispatchToProps = (dispatch): DispatchProps => ({
  addDeck: (deckTitle: DeckTitle) => dispatch(handleCreateDeck(deckTitle)),
});

export default connect(
  null,
  mapDispatchToProps,
)(NewDeckScreen);

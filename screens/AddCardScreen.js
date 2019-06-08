// @flow

import React from 'react';
import { ScrollView, TextInput, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import { handleAddCardToDeck } from '../actions/decks';

import type { Card, DeckTitle } from '../types';

import { isValidString } from '../utils/helpers';

import Colors from '../constants/Colors';

import Button from '../components/Button';

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
  cartInput: {
    minWidth: 220,
    borderBottomWidth: 1,
    borderBottomColor: Colors.tintColor,
    fontSize: 28,
    textAlign: 'center',
  },
});

type State = {
  question: string,
  answer: string,
};

type DispatchProps = {
  addCard: Function,
};

type Props = DispatchProps & {
  navigation: Object,
};

class AddCardScreen extends React.PureComponent<Props, State> {
  static navigationOptions = {
    title: 'Create Question',
  };

  state = {
    question: '',
    answer: '',
  };

  handleChangeQuestion = (text: string) => {
    this.setState({
      question: text,
    });
  };

  handleChangeAnswer = (text: string) => {
    this.setState({
      answer: text,
    });
  };

  handleAddCard = () => {
    const { navigation, addCard } = this.props;
    const {
      state: {
        params: { deckTitle },
      },
    } = navigation;
    const { question, answer } = this.state;
    addCard({ question, answer }, deckTitle);
    this.setState({ question: '', answer: '' });
    navigation.goBack();
  };

  render() {
    const { question, answer } = this.state;
    const disabledButton = !isValidString(question) || !isValidString(answer);
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <TextInput
          style={styles.cartInput}
          onChangeText={this.handleChangeQuestion}
          value={question}
          multiline
          placeholder="Question"
        />
        <TextInput
          style={styles.cartInput}
          onChangeText={this.handleChangeAnswer}
          value={answer}
          placeholder="Answer"
        />
        <Button
          disabled={disabledButton}
          onPress={this.handleAddCard}
          text="Save Question"
          type={disabledButton ? 'grey' : 'primary'}
        />
      </ScrollView>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  addCard: (card: Card, title: DeckTitle) => dispatch(handleAddCardToDeck(card, title)),
});

export default connect(
  null,
  mapDispatchToProps,
)(AddCardScreen);

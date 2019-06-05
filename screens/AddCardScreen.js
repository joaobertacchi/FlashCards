// @flow

import React from 'react';
import {
  ScrollView, TextInput,
} from 'react-native';
import { connect } from 'react-redux';

import { handleAddCardToDeck } from '../actions/decks';

import type { Card, DeckTitle } from '../types';

import Button from '../components/Button';

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
    return (
      <ScrollView>
        <TextInput
          style={{
            borderWidth: 1,
          }}
          onChangeText={this.handleChangeQuestion}
          value={question}
          placeholder="Question"
        />
        <TextInput
          style={{
            borderWidth: 1,
          }}
          onChangeText={this.handleChangeAnswer}
          value={answer}
          placeholder="Answer"
        />
        <Button onPress={this.handleAddCard} text="Save Question" type="primary" />
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

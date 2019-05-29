// @flow

import React from 'react';
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';

type State = {
  question: string,
  answer: string,
};

type Props = {
  navigation: Object,
};

class AddCardScreen extends React.PureComponent<Props, State> {
  static navigationOptions = {
    title: 'Add Card',
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

  render() {
    const { question, answer } = this.state;
    const {
      navigation: {
        state: {
          params: { onAddCard },
        },
      },
    } = this.props;
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
        <TouchableOpacity onPress={onAddCard({ question, answer })}>
          <Text>Add</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

export default AddCardScreen;

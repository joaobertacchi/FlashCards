// @flow

import React, { Fragment } from 'react';
import { ScrollView, Text } from 'react-native';
import CardFront from '../components/CardFront';
import CardBack from '../components/CardBack';
import QuizNextButton from '../components/QuizNextButton';
import QuizResult from '../components/QuizResult';
import type { Questions, ScoreType } from '../types';

type CurrentCardType = {
  questionIndex: number,
  cardFront: boolean,
};

type State = {
  currentCard: CurrentCardType,
  score: ScoreType,
  questions: Questions,
  isFinished: boolean,
};

type Props = {
  navigation: Object,
};

class QuizScreen extends React.PureComponent<Props, State> {
  static navigationOptions = ({ navigation }: Props) => ({
    title: `${navigation.state.params.deck.title} Quiz`,
  });

  initialState: State;

  constructor(props: Props) {
    super(props);
    const { navigation } = this.props;
    const {
      state: {
        params: {
          deck: { questions },
        },
      },
    } = navigation;
    this.initialState = {
      currentCard: {
        questionIndex: 0,
        cardFront: true,
      },
      score: {},
      questions,
      isFinished: false,
    };
    this.state = {
      ...this.initialState,
    };
  }

  showFront = (option: boolean) => () => {
    this.setState((prevState: State) => ({
      ...prevState,
      currentCard: {
        ...prevState.currentCard,
        cardFront: option,
      },
    }));
  };

  showNext = () => {
    this.setState((prevState: State) => ({
      ...prevState,
      currentCard: {
        ...prevState.currentCard,
        questionIndex: prevState.currentCard.questionIndex + 1,
        cardFront: true,
      },
    }));
  };

  showResult = () => {
    this.setState({
      isFinished: true,
    });
  };

  setVote = (index: number) => (vote: boolean) => () => {
    this.setState((prevState: State) => ({
      ...prevState,
      score: {
        ...prevState.score,
        [index]: vote,
      },
    }));
  };

  restartQuiz = () => {
    this.setState({
      ...this.initialState,
    });
  };

  render() {
    const {
      currentCard: { questionIndex, cardFront },
      questions,
      score,
      isFinished,
    } = this.state;
    const { answer, question } = questions[questionIndex];
    return (
      <ScrollView>
        {isFinished ? (
          <QuizResult questions={questions} score={score} onRestart={this.restartQuiz} />
        ) : (
          <Fragment>
            <Text>{`Question #${questionIndex + 1} of ${questions.length}`}</Text>
            {cardFront ? (
              <CardFront question={question} onShowBack={this.showFront(false)} />
            ) : (
              <CardBack
                answer={answer}
                isCorrect={score[questionIndex]}
                onShowFront={this.showFront(true)}
                onVote={this.setVote(questionIndex)}
              />
            )}
            <QuizNextButton
              index={questionIndex}
              total={questions.length}
              onShowNextQuestion={this.showNext}
              onShowQuizResult={this.showResult}
            />
          </Fragment>
        )}
      </ScrollView>
    );
  }
}

export default QuizScreen;

// @flow

import React, { Fragment } from 'react';
import { ScrollView, Text } from 'react-native';
import { connect } from 'react-redux';

import CardFront from '../components/CardFront';
import CardBack from '../components/CardBack';
import QuizNextButton from '../components/QuizNextButton';
import QuizResult from '../components/QuizResult';
import type { Questions, ScoreType } from '../types';
import { clearLocalNotification, setLocalNotification } from '../utils/helpers';

type CurrentCardType = {
  questionIndex: number,
  cardFront: boolean,
};

type State = {
  currentCard: CurrentCardType,
  score: ScoreType,
  fixedQuestions: Questions,
  isFinished: boolean,
};

type StateProps = {
  questions: Questions,
};

type OwnProps = {
  navigation: Object,
};

type Props = StateProps & OwnProps;

class QuizScreen extends React.PureComponent<Props, State> {
  static navigationOptions = ({ navigation }: Props) => ({
    title: `${navigation.state.params.deckTitle} Quiz`,
  });

  initialState: State;

  constructor(props: Props) {
    super(props);
    const { questions } = this.props;
    this.initialState = {
      currentCard: {
        questionIndex: 0,
        cardFront: true,
      },
      score: {},
      fixedQuestions: questions,
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
    clearLocalNotification().then(() => setLocalNotification());
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

  backToDeck = () => {
    const { navigation } = this.props;
    navigation.goBack();
  };

  render() {
    const {
      currentCard: { questionIndex, cardFront },
      fixedQuestions,
      score,
      isFinished,
    } = this.state;
    const { answer, question } = fixedQuestions[questionIndex];
    const questionsLeft = fixedQuestions.length - questionIndex - 1;
    return (
      <ScrollView>
        {isFinished ? (
          <QuizResult
            questions={fixedQuestions}
            score={score}
            onRestart={this.restartQuiz}
            onBackToDeck={this.backToDeck}
          />
        ) : (
          <Fragment>
            <Text>{`Question #${questionIndex + 1} of ${fixedQuestions.length}`}</Text>
            <Text>{`${questionsLeft} question(s) left...`}</Text>
            {cardFront ? (
              <CardFront question={question} onShowBack={this.showFront(false)} />
            ) : (
              <CardBack
                answer={answer}
                isCorrect={score[questionIndex]}
                onShowFront={this.showFront(true)}
                onVote={this.setVote(questionIndex)}
                cardNumber={questionIndex}
                cardCount={fixedQuestions.length}
                onShowNextQuestion={this.showNext}
                onShowQuizResult={this.showResult}
              />
            )}
          </Fragment>
        )}
      </ScrollView>
    );
  }
}

const mapsStateToProps = (state, { navigation }: OwnProps) => {
  const {
    state: {
      params: { deckTitle },
    },
  } = navigation;
  return {
    questions: state.decks[deckTitle].questions,
  };
};

export default connect(mapsStateToProps)(QuizScreen);

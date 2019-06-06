// @flow
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Button from './Button';
import QuizNextButton from './QuizNextButton';

type Props = {
  answer: string,
  isCorrect: ?boolean,
  onShowFront: () => void,
  onVote: (correct: boolean) => () => void,
  onShowNextQuestion: () => void,
  onShowQuizResult: () => void,
  cardNumber: number,
  cardCount: number,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
  },
  headerContainer: {
    flex: 2,
    justifyContent: 'center',
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  answer: {
    fontSize: 24,
    textAlign: 'center',
  },
});

const CardBack = ({
  answer,
  isCorrect,
  onShowFront,
  onVote,
  onShowNextQuestion,
  onShowQuizResult,
  cardNumber,
  cardCount,
}: Props) => (
  <View style={styles.container}>
    <View style={styles.headerContainer}>
      <Text style={styles.answer}>{answer}</Text>
      <Button onPress={onShowFront} text="Show question" type="primaryLight" />
    </View>

    <View style={styles.buttonContainer}>
      <Button
        minWidth={80}
        onPress={onVote(true)}
        text="Correct"
        type={isCorrect ? 'successLight' : 'success'}
      />
      <Button
        minWidth={80}
        onPress={onVote(false)}
        text="Incorrect"
        type={isCorrect === false ? 'dangerLight' : 'danger'}
      />
    </View>

    <QuizNextButton
      index={cardNumber}
      total={cardCount}
      onShowNextQuestion={onShowNextQuestion}
      onShowQuizResult={onShowQuizResult}
      disabled={isCorrect === undefined}
    />
  </View>
);

export default CardBack;

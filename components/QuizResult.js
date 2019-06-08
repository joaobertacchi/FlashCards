// @flow
import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import type { Questions, ScoreType } from '../types';

import Button from './Button';

type Props = {
  questions: Questions,
  score: ScoreType,
  onRestart: () => void,
  onBackToDeck: () => void,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
  },
  score: {
    textAlign: 'center',
    fontSize: 32,
  },
});

const QuizResult = ({
  questions, score, onRestart, onBackToDeck,
}: Props) => {
  const total = questions.length;
  const correct = Object.values(score).reduce(
    (acc, isCorrect) => (isCorrect === true ? acc + 1 : acc),
    0,
  );
  return (
    <View style={styles.container}>
      <Text style={styles.score}>{`You scored ${Math.round((100 * correct) / total)}%`}</Text>
      <Button onPress={onRestart} text="Restart Quiz" type="success" />
      <Button onPress={onBackToDeck} text="Back to Deck" type="primaryLight" />
    </View>
  );
};

export default QuizResult;

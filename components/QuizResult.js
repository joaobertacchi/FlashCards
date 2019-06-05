// @flow
import React from 'react';
import { Text, View } from 'react-native';
import type { Questions, ScoreType } from '../types';

import Button from './Button';

type Props = {
  questions: Questions,
  score: ScoreType,
  onRestart: () => void,
  onBackToDeck: () => void,
};

const QuizResult = ({
  questions, score, onRestart, onBackToDeck,
}: Props) => {
  const total = questions.length;
  const correct = Object.values(score).reduce((acc, isCorrect) => (isCorrect ? acc + 1 : acc), 0);
  return (
    <View>
      <Text>{`Your score is ${correct} out of ${total}`}</Text>
      <Button onPress={onRestart} text="Restart Quiz" type="success" />
      <Button onPress={onBackToDeck} text="Back to Deck" type="primary" />
    </View>
  );
};

export default QuizResult;
